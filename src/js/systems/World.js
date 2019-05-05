import System from './System';
import icon from '../../images/world.png';

class World extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'World';
    this.prefixes = [22];
  }
}

export default new World();
