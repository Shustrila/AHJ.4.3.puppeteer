import System from './System';
import icon from '../../images/jcb.png';

class Jcb extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'Jcb';
    this.prefixes = [35];
  }
}

export default new Jcb();
