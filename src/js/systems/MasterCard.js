import System from './System';
import icon from '../../images/mastercard.png';

class MasterCard extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'MasterCard';
    this.prefixes = [51, 52, 53, 54, 55];
  }
}

export default new MasterCard();
