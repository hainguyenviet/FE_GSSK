import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
@Component({
  selector: 'app-genogram',
  templateUrl: './genogram.component.html',
  styleUrls: ['./genogram.component.scss'],
})
export class GenogramComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    function init() {
      const $ = go.GraphObject.make;
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
    }
    class GenogramLayout extends go.LayeredDigraphLayout {
      spouseSpacing: number;
      constructor() {
        super();
        this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
        this.spouseSpacing = 30; // minimum space between spouses
      }
    }
  }
}
