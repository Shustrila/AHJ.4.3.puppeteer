import System from './System';
import icon from '../../images/visa.png';

class Visa extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'Visa';
    this.prefixes = [4];
  }
}

export default new Visa();
