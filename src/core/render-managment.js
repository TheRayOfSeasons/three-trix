import { WebGLRenderer } from 'three';


export class RenderManager {
  registeredScenes = [];

  constructor({canvas, height, width, options, rendererClass=WebGLRenderer, defaultSceneIndex=0}) {
    if(typeof(options) === 'object') {
      if(options.canvas) {
        canvas = options.canvas;
      }
    }
    this.renderer = new rendererClass(options || {
      antialias: true,
      alpha: true,
      canvas
    });
    this.canvas = canvas;
    this.renderer.setSize(width || window.innerWidth, height || window.innerHeight);
    this.loadScene(defaultSceneIndex);
    const animate = time => {
      this.scene.update(time);
      if(!this.scene.overrideRender) {
        this.renderer.render(this.scene.scene, this.scene.currentCamera);
      }
      this.scene.onAfterRender();
    }
    this.renderer.setAnimationLoop(animate);
  }

  getSceneByIndex(sceneIndex) {
    return this.registeredScenes[sceneIndex];
  }

  loadScene(sceneIndex) {
    const sceneClass = this.getSceneByIndex(sceneIndex);
    this.scene = new sceneClass(this, this.canvas, this.renderer);
    this.scene.start();
  }
}
