import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-genogram',
  templateUrl: './genogram.component.html',
  styleUrls: ['./genogram.component.scss'],
})
export class GenogramComponent implements OnInit {
  constructor() {}
  diagram: any;

  ngOnInit(): void {
    this.diagram = $(go.Diagram, 'myDiagramDiv', {
      layout: $(go.TreeLayout, {
        isOngoing: true,
        treeStyle: go.TreeLayout.StyleLastParents,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        // properties for most of the tree:
        angle: 90,
        layerSpacing: 35,
        // properties for the "last parents":
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeLayout.AlignmentBus,
        alternateNodeSpacing: 20,
      }),
      'undoManager.isEnabled': true,
    });

    // define the Node template
    this.diagram.nodeTemplate = $(
      go.Node,
      'Auto',
      // for sorting, have the Node.text be the data.name
      new go.Binding('text', 'name'),
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected
      new go.Binding('layerName', 'isSelected', function (sel) {
        return sel ? 'Foreground' : '';
      }).ofObject(),
      // define the node's outer shape
      $(
        go.Shape,
        'Rectangle',
        {
          name: 'SHAPE',
          fill: 'lightblue',
          stroke: null,
          // set the port properties:
          portId: '',
          fromLinkable: true,
          toLinkable: true,
          cursor: 'pointer',
        },
        new go.Binding('fill', '', function (node) {
          // modify the fill based on the tree depth level
          const levelColors = [
            '#AC193D',
            '#2672EC',
            '#8C0095',
            '#5133AB',
            '#008299',
            '#D24726',
            '#008A00',
            '#094AB2',
          ];
          let color = node.findObject('SHAPE').fill;
          const dia: go.Diagram = node.diagram;
          if (dia && dia.layout.network) {
            dia.layout.network.vertexes.each(function (v) {
              if (v.node && v.node.key === node.data.key) {
                const level: number = v.edgesCount % levelColors.length;
                color = levelColors[level];
              }
            });
          }
          return color;
        }).ofObject()
      ),
      $(
        go.Panel,
        'Horizontal',
        $(
          go.Picture,
          {
            name: 'Picture',
            desiredSize: new go.Size(39, 50),
            margin: new go.Margin(6, 8, 6, 10),
          },
          new go.Binding('source', 'key', function (key) {
            if (key < 0 || key > 16) return ''; // There are only 16 images on the server
            return 'assets/HS' + key + '.png';
          })
        ),
        // define the panel where the text will appear
        $(
          go.Panel,
          'Table',
          {
            maxSize: new go.Size(150, 999),
            margin: new go.Margin(6, 10, 0, 3),
            defaultAlignment: go.Spot.Left,
          },
          $(go.RowColumnDefinition, { column: 2, width: 4 }),
          $(
            go.TextBlock,
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' }, // the name
            {
              row: 0,
              column: 0,
              columnSpan: 5,
              font: '12pt Segoe UI,sans-serif',
              editable: true,
              isMultiline: false,
              minSize: new go.Size(10, 16),
            },
            new go.Binding('text', 'name').makeTwoWay()
          ),
          $(
            go.TextBlock,
            'Title: ',
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
            { row: 1, column: 0 }
          ),
          $(
            go.TextBlock,
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
            {
              row: 1,
              column: 1,
              columnSpan: 4,
              editable: true,
              isMultiline: false,
              minSize: new go.Size(10, 14),
              margin: new go.Margin(0, 0, 0, 3),
            },
            new go.Binding('text', 'title').makeTwoWay()
          ),
          $(
            go.TextBlock,
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
            { row: 2, column: 0 },
            new go.Binding('text', 'key', function (v) {
              return 'ID: ' + v;
            })
          ),
          $(
            go.TextBlock,
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },
            { name: 'boss', row: 2, column: 3 }, // we include a name so we can access this TextBlock when deleting Nodes/Links
            new go.Binding('text', 'parent', function (v) {
              return 'Boss: ' + v;
            })
          ),
          $(
            go.TextBlock,
            { font: '9pt  Segoe UI,sans-serif', stroke: 'white' }, // the comments
            {
              row: 3,
              column: 0,
              columnSpan: 5,
              font: 'italic 9pt sans-serif',
              wrap: go.TextBlock.WrapFit,
              editable: true, // by default newlines are allowed
              minSize: new go.Size(10, 14),
            },
            new go.Binding('text', 'comments').makeTwoWay()
          )
        ) // end Table Panel
      ) // end Horizontal Panel
    ); // end Node
    this.diagram.model = this.model;
  }
  model: go.TreeModel = new go.TreeModel([
    { key: 1, name: 'Stella Payne Diaz', title: 'CEO' },
    { key: 2, name: 'Luke Warm', title: 'VP Marketing/Sales', parent: 1 },
    { key: 3, name: 'Meg Meehan Hoffa', title: 'Sales', parent: 2 },
    { key: 4, name: 'Peggy Flaming', title: 'VP Engineering', parent: 1 },
    { key: 5, name: 'Saul Wellingood', title: 'Manufacturing', parent: 4 },
    { key: 6, name: 'Al Ligori', title: 'Marketing', parent: 2 },
    { key: 7, name: 'Dot Stubadd', title: 'Sales Rep', parent: 3 },
    { key: 8, name: 'Les Ismore', title: 'Project Mgr', parent: 5 },
    { key: 9, name: 'April Lynn Parris', title: 'Events Mgr', parent: 6 },
    { key: 10, name: 'Xavier Breath', title: 'Engineering', parent: 4 },
    { key: 11, name: 'Anita Hammer', title: 'Process', parent: 5 },
    { key: 12, name: 'Billy Aiken', title: 'Software', parent: 10 },
    { key: 13, name: 'Stan Wellback', title: 'Testing', parent: 10 },
    { key: 14, name: 'Marge Innovera', title: 'Hardware', parent: 10 },
    { key: 15, name: 'Evan Elpus', title: 'Quality', parent: 5 },
    { key: 16, name: 'Lotta B. Essen', title: 'Sales Rep', parent: 3 },
  ]);
  selectedNode = null;
  public setSelectedNode(node: any) {
    this.selectedNode = node;
  }
}
