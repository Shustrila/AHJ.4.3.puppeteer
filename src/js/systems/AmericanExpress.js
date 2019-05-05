import System from './System';
import icon from '../../images/american_express.png';

class AmericanExpress extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'AmericanExpress';
    this.prefixes = [34, 37];
  }
}

export default new AmericanExpress();
