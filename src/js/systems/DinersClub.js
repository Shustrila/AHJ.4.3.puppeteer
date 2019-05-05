import System from './System';
import icon from '../../images/diners_club.png';

class DinersClub extends System {
  constructor() {
    super();
    this.img = icon;
    this.name = 'DinersClub';
    this.prefixes = [300, 301, 302, 303, 304, 305, 36, 38, 39];
  }
}

export default new DinersClub();
