import * as go from 'gojs';
export class GenogramLayout extends go.LayeredDigraphLayout {
  spouseSpacing: number;
  constructor() {
    super();
    this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    this.spouseSpacing = 30; // minimum space between spouses
  }
}
