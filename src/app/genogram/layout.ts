import * as go from 'gojs';
export class GenogramLayout extends go.LayeredDigraphLayout {
  spouseSpacing: number;
  constructor() {
    super();
    this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    this.spouseSpacing = 50; // minimum space between spouses
    
  }

  makeNetwork(coll: go.Diagram | go.Group | go.Iterable<go.Part>): go.LayoutNetwork {
    const net = this.createNetwork();
    if (coll instanceof go.Diagram)
    {
      this.add(net, coll.nodes, true);
      this.add(net, coll.links, true);
    }
    else if (coll instanceof go.Group)
    {
      this.add(net, coll.memberParts, false);
    }
    else if (coll.iterator)
    {
      this.add(net, coll.iterator, false);
    }
    return net;
  }

  add(net: go.LayeredDigraphNetwork, coll: go.Iterable<go.Part>, nonmemberonly: boolean) {
    const multipleSousePeople = new go.Set<go.Node>();
    const it = coll.iterator;
    while (it.next()) {
      const node = it.value;
      if (!(node instanceof go.Node))
      {continue;}
      if (!node.isLayoutPositioned || !node.isVisible)
      {continue;}
      if (nonmemberonly && node.containingGroup !== null)
      {continue;}
      if (node.isLinkLabel)
      {
        const link = node.labeledLink;
        const spouseA = link?.fromNode;
        const spouseB = link?.toNode;

        const vertex = net.addNode(node);

        vertex.width = spouseA?.actualBounds.width! + this.spouseSpacing + spouseB?.actualBounds.width!;
        vertex.height = Math.max(spouseA?.actualBounds.height!, spouseB?.actualBounds.height!);
        vertex.focus = new go.Point(spouseA?.actualBounds.width! + this.spouseSpacing / 2, vertex.height / 2);
      }
      else 
      {
        let marriages = 0;
        node.linksConnected.each(l => {
          if (l.isLabeledLink)
          {
            marriages += 1;
          }
        });
        if (marriages == 0)
        {
          net.addNode(node);
        }
        else if (marriages > 1)
        {
          multipleSousePeople.add(node);
        }
      }
    }
    it.reset();
    while (it.next()) {
      const link = it.value;
      if (!(link instanceof go.Link))
      {continue;}
      if (!link.isLayoutPositioned || !link.isVisible())
      {continue;}
      if (nonmemberonly && link.containingGroup !== null)
      {continue;}

      if (!link.isLabeledLink)
      {
        const parent = net.findVertex(link.fromNode!);
        const child = net.findVertex(link.toNode!);
        if (child !== null)
        {
          net.linkVertexes(parent!, child, link);
        }
        else
        {
          link.toNode?.linksConnected.each(l => {
            if (!l.isLabeledLink)
            {return;}
            const mlab = l.labelNodes.first();
            const mlabvert = net.findVertex(mlab!);
            if (mlabvert !== null)
            {
              net.linkVertexes(parent!, mlabvert, link);
            }

          });
        }
      }
    }
    while (multipleSousePeople.count > 0) {
      const node = multipleSousePeople.first();
      const cohort = new go.Set<go.Node>();
      this.extendCohort(cohort, node!);
      const dummyVert = net.createVertex();
      const marriages = new go.Set<go.Link>();
      cohort.each(n => {
        n.linksConnected.each(l => {
          marriages.add(l);
        });
      })
      marriages.each(link => {
        const mlab = link.labelNodes.first();
        const v = net.findVertex(mlab!);
        if (v !== null)
        {
          net.linkVertexes(dummyVert, v, null);
        }
      });
      multipleSousePeople.removeAll(cohort);
    }
  }

  extendCohort(coll: go.Set<go.Node>, node: go.Node) {
    if (coll.has(node))
    {return;}
    coll.add(node);
    node.linksConnected.each(l => {
      if (l.isLabeledLink)
      {
        this.extendCohort(coll, l.fromNode!);
        this.extendCohort(coll, l.toNode!);
      }
    });
  }
protected assignLayers(): void {
  super.assignLayers();
  const horiz = this.direction == 0.0 || this.direction == 180.0;
  const maxsizes: number[] = [];
  this.network?.vertexes.each(v => {
    const lay = v.layer;
    let max = maxsizes[lay];
    if (max === undefined)
    {max = 0; }
    const sz = (horiz ? v.width : v.height);
    if (sz > max)
    {maxsizes[lay] = sz;}
  });

  this.network?.vertexes.each(v=> {
    const lay = v.layer;
    const max = maxsizes[lay];
    if (horiz)
    {
      v.focus = new go.Point(0, v.height / 2);
      v.width = max;
    }
    else
    {
      v.focus = new go.Point(v.width/ 2, 0);
      v.height = max;
    }
  });
}
 
  protected commitNodes(): void {
    super.commitNodes();
    this.network?.vertexes.each(v => {
      if (v.node !== null && !v.node.isLinkLabel)
      {
        v.node.position = new go.Point(v.x, v.y);
      }
    });

    this.network?.vertexes.each(v => {
      if (v.node === null)
      {return;}

      if (!v.node.isLinkLabel)
      {return;}

      const labnode = v.node;
      const lablink = labnode.labeledLink;

      lablink?.invalidateRoute();
      let spouseA = lablink?.fromNode!;
      let spouseB = lablink?.toNode!;

      if (spouseA?.data.s === "F")
      {
        const temp = spouseA;
        spouseA = spouseB;
        spouseB = temp;
      }

      const aParentsNode = this.findParentsMarriageLabelNode(spouseA!);
      const bParentsNode = this.findParentsMarriageLabelNode(spouseB!);

      if (aParentsNode !== null && bParentsNode !== null && aParentsNode.position.x > bParentsNode.position.x)
      {
        const temp = spouseA;
        spouseA = spouseB;
        spouseB = spouseA;
      }

      spouseA.position = new go.Point(v.x, v.y);
      spouseB.position = new go.Point(v.x + spouseA?.actualBounds.width! + this.spouseSpacing, v.y);
      if (spouseA?.opacity === 0)
      {
        const pos = new go.Point(v.centerX - spouseA?.actualBounds.width! / 2, v.y);
        spouseA.position = pos;
        spouseB.position = pos;
      }
      else if (spouseB?.opacity === 0)
      {
        const pos = new go.Point(v.centerX - spouseB?.actualBounds.width! / 2, v.y);
        spouseA.position = pos;
        spouseB.position = pos;
      }

    });

    this.network?.vertexes.each(v => {
      if (v.node === null || v.node.linksConnected.count > 1)
      {return;}
      const mnode = this.findParentsMarriageLabelNode(v.node);
      if (mnode !== null && mnode.linksConnected.count === 1)
      {
        const mvert = this.network?.findVertex(mnode);
        const newbnds = v.node.actualBounds.copy();
        newbnds.x = mvert?.centerX! - v.node.actualBounds.width / 2;

        const overlaps = this.diagram?.findObjectsIn(newbnds, x => x.part, p => p !== v.node, true);
        if (overlaps?.count === 0)
        {
          v.node.move(newbnds.position)
        }
      }
    });
  }

  findParentsMarriageLabelNode(node: go.Node) {
    const it = node.findNodesInto();
    while (it.next()) {
      const n = it.value;
      if (n.isLinkLabel)
      {
        return n;
      }
    }
    return null;
  }
}
