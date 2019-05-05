import System from './System';
import icon from '../../images/discover.png';

class Discover extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'Discover';
    this.prefixes = [6011];
  }
}

export default new Discover();
