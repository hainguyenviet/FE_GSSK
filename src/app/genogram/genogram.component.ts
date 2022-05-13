import { Component, OnInit } from '@angular/core';
import { GenogramLayout } from './layout';
import * as go from 'gojs';

const $ = go.GraphObject.make;
@Component({
  selector: 'app-genogram',
  templateUrl: './genogram.component.html',
  styleUrls: ['./genogram.component.scss'],
})
export class GenogramComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
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
    myDiagram.nodeTemplate = $(
      go.Node,
      'Vertical',
      {
        locationSpot: go.Spot.Center,
        locationObjectName: 'ICON',
        selectionObjectName: 'ICON',
      },
      $(
        go.Panel,
        { name: 'ICON' },
        // define the node's outer shape
        $(
          go.Shape,
          'Square',
          {
            name: 'SHAPE',
            width: 40,
            height: 40,
            strokeWidth: 2,
            fill: 'white',
            stroke: '#919191',
            portId: '',
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
              { font: '9pt  Open Sans UI,sans-serif', stroke: 'white' }, // the name
              {
                row: 0,
                column: 0,
                columnSpan: 5,
                font: '12pt Open Sans UI,sans-serif',
                editable: true,
                isMultiline: false,
                minSize: new go.Size(10, 16),
              },
              new go.Binding('text', 'name').makeTwoWay()
            )
          ) // end Table Panel
        ) // end Horizontal Panel
      )
    ); // end Node
    myDiagram.model = this.model;
  }
  model: go.TreeModel = new go.TreeModel([
    { key: 1, name: 'Hoàng', title: 'CEO' },
    { key: 2, name: 'Hưng', title: 'VP Marketing/Sales', parent: 1 },
    { key: 3, name: 'Nga', title: 'Sales', parent: 2 },
    { key: 4, name: 'Bình', title: 'VP Engineering', parent: 1 },
    { key: 5, name: 'Yến', title: 'Manufacturing', parent: 4 },
    { key: 6, name: 'Trang', title: 'Marketing', parent: 2 },
    { key: 7, name: 'Tường', title: 'Sales Rep', parent: 3 },
    { key: 8, name: 'Thịnh', title: 'Project Mgr', parent: 5 },
    { key: 9, name: 'Quý', title: 'Events Mgr', parent: 6 },
    { key: 10, name: 'Thanh Vương', title: 'Engineering', parent: 4 },
    { key: 11, name: 'Quang Bình', title: 'Process', parent: 5 },
    { key: 12, name: 'Phú', title: 'Software', parent: 10 },
    { key: 13, name: 'Toàn', title: 'Testing', parent: 10 },
    { key: 14, name: 'Dũng', title: 'Hardware', parent: 10 },
    { key: 15, name: 'Trân', title: 'Quality', parent: 5 },
    { key: 16, name: 'Vy', title: 'Sales Rep', parent: 3 },
  ]);
  selectedNode = null;
  public setSelectedNode(node: any) {
    this.selectedNode = node;
  }
}
