import { Component, OnInit } from '@angular/core';
import { GenogramLayout } from './layout';
import * as go from 'gojs';
import { PersonService } from '../server_service/Person/person.service';

const $ = go.GraphObject.make;
@Component({
  selector: 'app-genogram',
  templateUrl: './genogram.component.html',
  styleUrls: ['./genogram.component.scss'],
})
export class GenogramComponent implements OnInit {
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getGenogram(sessionStorage.getItem('idUser')!).subscribe(
      (data: any[]) => {
        const myDiagram = $(go.Diagram, 'myDiagramDiv', {
          initialAutoScale: go.Diagram.Uniform,
          'undoManager.isEnabled': true,
          // when a node is selected, draw a big yellow circle behind it
          nodeSelectionAdornmentTemplate: $(
            go.Adornment,
            'Auto',
            { layerName: 'Grid' }, // the predefined layer that is behind everything else
            $(go.Shape, 'Circle', { fill: '#c1cee3', stroke: null }),
            $(go.Placeholder, { margin: 2 })
          ),
          // use a custom layout, defined below
          layout: $(GenogramLayout, {
            direction: 90,
            layerSpacing: 30,
            columnSpacing: 10,
          }),
        });


        myDiagram.nodeTemplateMap.add("M",  // male
          $(go.Node, "Vertical",
            { locationSpot: go.Spot.Center, locationObjectName: "ICON", selectionObjectName: "ICON" },
            $(go.Panel,
              { name: "ICON" },
              $(go.Shape, "Square",
                { width: 40, height: 40, strokeWidth: 2, fill: "white", stroke: "#919191", portId: "" }),
              $(go.Panel,
                { // for each attribute show a Shape at a particular place in the overall square
                  itemTemplate:
                    $(go.Panel,
                      $(go.Shape,
                        { stroke: null, strokeWidth: 0 },
                        new go.Binding("fill", "", this.attrFill),
                        new go.Binding("geometry", "", this.maleGeometry))
                    ),
                  margin: 1
                },
                new go.Binding("itemArray", "a")
              )
            ),
            $(go.TextBlock,
              { textAlign: "center", maxSize: new go.Size(80, NaN) },
              new go.Binding("text", "n"))
          ));


        myDiagram.nodeTemplateMap.add("F",  // female
          $(go.Node, "Vertical",
            { locationSpot: go.Spot.Center, locationObjectName: "ICON", selectionObjectName: "ICON" },
            $(go.Panel,
              { name: "ICON" },
              $(go.Shape, "Circle",
                { width: 40, height: 40, strokeWidth: 2, fill: "white", stroke: "#a1a1a1", portId: "" }),
              $(go.Panel,
                { // for each attribute show a Shape at a particular place in the overall circle
                  itemTemplate:
                    $(go.Panel,
                      $(go.Shape,
                        { stroke: null, strokeWidth: 0 },
                        new go.Binding("fill", "", this.attrFill),
                        new go.Binding("geometry", "", this.femaleGeometry))
                    ),
                  margin: 1
                },
                new go.Binding("itemArray", "a")
              )
            ),
            $(go.TextBlock,
              { textAlign: "center", maxSize: new go.Size(80, NaN) },
              new go.Binding("text", "n"))
          ));

        myDiagram.nodeTemplateMap.add("LinkLabel",
          $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }));

        myDiagram.linkTemplate =  // for parent-child relationships
          $(go.Link,
            {
              routing: go.Link.Orthogonal, corner: 5,
              layerName: "Background", selectable: false,
              fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
            },
            $(go.Shape, { stroke: "#424242", strokeWidth: 2 })
          );



        myDiagram.linkTemplateMap.add("Marriage",  // for marriage relationships
          $(go.Link,
            { selectable: false },
            $(go.Shape, { strokeWidth: 2.5, stroke: "#5d8cc1" /* blue */ })
          ));
        this.setupDiagram(myDiagram, data, 3)
      }
    )
  }


  setupDiagram(diagram: go.Diagram, array: any[], focusId: number) {
    diagram.model = new go.GraphLinksModel({
      linkLabelKeysProperty: "labelKeys",
      nodeCategoryProperty: "s",
      copiesArrays: true,
      nodeDataArray: array
    })

    this.setupMarriages(diagram);
    this.setupParents(diagram);
  }

  attrFill(a: string) {
    switch (a) {
      case "DEAD": return "#d4071c"; // red
      case "1DISEASE": return "#000000"; // black
      case "NDISEASE": return "#000000";
      case "FDISEASE": return "#808080"; //gray
      case "ME": return "#000000"
      default: return "transparent";
    }
  }

  maleGeometry(a: string) {
    const arrow = go.Geometry.parse("F M71 59 L 59 47 54 50 44 30 67 39 63 43 75 55")
    const halfRightSquare = "F M20 1 l19 0 0 19 -19 0z F M20 20 l19 0 0 19 -19 0z";
    const halfLeftSquare = "F M5 0 L6 0 6 1 1 6 0 6 0 5 F M15 0 L16 0 16 1 1 16 0 16 0 15 F M20 5 L21 5 21 6 1 25 0 25 0 24 F M20 15 L21 15 21 16 1 35 0 35 0 34 F M20 25 L21 25 21 26 5 40 4 40 4 39 F M20 34 L21 34 21 35 14 40 13 40 13 39";
    const fullSquare = go.Geometry.parse("F M1 1 L 1 40 L 40 40 L 40 1 z");
    const halfSquare = go.Geometry.parse(halfLeftSquare + halfRightSquare)
    const slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38");
    switch (a) {
      case "DEAD": return slash;
      case "1DISEASE": return fullSquare;
      case "NDISEASE": return halfSquare;
      case "ME": return arrow;
      default: return fullSquare;
    }
  }

  femaleGeometry(a: string) {
    const arrow = go.Geometry.parse("F M71 59 L 59 47 54 50 44 30 67 39 63 43 75 55")
    const fullCircle = "F M20 20 B 180 90 20 20 19 19 z " + "F M20 20 B 270 90 20 20 19 19 z " + "F M20 20 B 0 90 20 20 19 19 z " + "F M20 20 B 90 90 20 20 19 19 z ";
    const thirdFourthCircle = "F M20 20 B 90 90 20 20 19 19 z ";
    const fisrtFourthCircle = "F M20 5 L 20 6 7 6 7 5 " + "F M20 10 L 20 11 3 11 3 10 " + "F M20 15 L 20 16 1 16 1 15";
    const lastFourthCircle = "F M25 20 L 26 20 26 40 25 40 " + "F M30 20 L 31 20 31 37 30 36 " + "F M35 20 L 36 20 36 33 35 32 ";
    const secondFourthCircle = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z")
    const slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
    const fullBlackCircle = go.Geometry.parse(fullCircle);
    const pieceCircle = go.Geometry.parse(fisrtFourthCircle + thirdFourthCircle + lastFourthCircle);
    switch (a) {
      case "DEAD": return slash;
      case "1DISEASE": return fullBlackCircle;
      case "NDISEASE": return pieceCircle;
      case "FDISEASE": return secondFourthCircle;
      case "ME": return arrow;
      default: return fullBlackCircle;
    }
  }

  findMarriage(diagram: go.Diagram, a: number, b: number) {
    const nodeA = diagram.findNodeForKey(a);
    const nodeB = diagram.findNodeForKey(b);
    if (nodeA !== null && nodeB !== null) {
      const it = nodeA.findLinksBetween(nodeB);

      while (it.next()) {
        const link = it.value;
        if (link.data !== null && link.data.category === "Marriage") {
          return link;
        }
      }
    }
    return null;
  }

  setupMarriages(diagram: go.Diagram) {
    const model = diagram.model;
    const nodeDataArray = model.nodeDataArray;
    //const nodeDataArray = this.dataFamily
    //console.log("nodeData: ", nodeDataArray)
    for (let i = 0; i < nodeDataArray.length; i++) {
      const data = nodeDataArray[i];

      const key = data.key;
      let uxs = data.ux;
      if (uxs !== undefined) {
        if (typeof uxs === "number") {
          uxs = [uxs];
        }
        for (let j = 0; j < uxs.length; j++) {
          const wife = uxs[j];
          const wdata = model.findNodeDataForKey(wife);
          if (key === wife || !wdata || wdata.s !== "F") {
            console.log("cannot create Marriage relationship with self or unknown person " + wife);
            continue;
          }
          const link = this.findMarriage(diagram, key, wife);

          if (link === null) {
            const mlab = { s: "LinkLabel" };
            model.addNodeData(mlab);
            let mlabKeyWife = nodeDataArray[nodeDataArray.length - 1]
            //console.log("mlabkeyWife: ", nodeDataArray[nodeDataArray.length - 1])
            const mdata = { from: key, to: wife, labelKeys: [mlabKeyWife.key], category: "Marriage" };
            model.addLinkData(mdata);
          }

        }
      }
      let virs = data.vir;
      if (virs !== undefined) {
        if (typeof virs === "number") {
          virs = [virs];
        }
        for (let j = 0; j < virs.length; j++) {
          const husband = virs[j];
          const hdata = model.findNodeDataForKey(husband);
          if (key === husband || !hdata || hdata.s !== "M") {
            console.log("cannot create Marriage relationship with self or unknown person " + husband);
            continue;
          }
          const link = this.findMarriage(diagram, key, husband);
          if (link === null) {
            const mlab = { s: "LinkLabel" };
            model.addNodeData(mlab);
            let mlabKeyHusband = nodeDataArray[nodeDataArray.length - 1]
            const mdata = { from: key, to: husband, labelKeys: [mlabKeyHusband.key], category: "Marriage" };
            model.addLinkData(mdata);
            //console.log("mdatafdfdf: ", mdata)

          }
        }
      }
      //console.log("nodeData: ", nodeDataArray)
    }


  }

  setupParents(diagram: go.Diagram) {
    const model = diagram.model;
    const nodeDataArray = model.nodeDataArray;
    for (let i = 0; i < nodeDataArray.length; i++) {
      const data = nodeDataArray[i];
      const key = data.key;
      const mother = data.m;
      const father = data.f;
      if (mother !== undefined && father !== undefined) {
        const link = this.findMarriage(diagram, mother, father);
        if (link === null) {
          console.log("unknown marriage: " + mother + " & " + father);
          continue;
        }
        const mdata = link.data;
        //console.log("mdata: ", mdata)
        if (mdata.labelKeys === undefined || mdata.labelKeys[0] === undefined) { continue; }
        const mlabelkey = mdata.labelKeys[0];
        const cdata = { from: mlabelkey, to: key }
        diagram.model.addLinkData(cdata)
      }
    }
  }
}
