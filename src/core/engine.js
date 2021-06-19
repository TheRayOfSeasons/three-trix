import { RenderManager } from './render-managment';


export class ThreeView {
  constructor(...args) {
    this.renderManager = new RenderManager(...args);
  }
}
