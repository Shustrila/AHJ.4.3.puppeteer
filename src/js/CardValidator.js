import listSystems from './systems/listSystems';

class CardValidator {
  constructor() {
    this.wiget = '[data-widgets=credit-card-validator]';
    this.systems = listSystems;

    this.listMessage = [];

    this.listSystemClass = 'card-validator__systems';
    this.itemSystemClass = 'card-validator__systems-item js-payment-system';
    this.imgSystemClass = 'card-validator__systems-img';
    this.imgActiveSystemClass = 'card-validator__systems-item--active';
    this.errorClass = 'card-validator__message card-validator__error';
    this.validClass = 'card-validator__message card-validator__valid';

    this.dataSystemName = 'data-system-name';
  }

  init() {
    const wiget = document.querySelector(this.wiget);
    const { number } = wiget.elements;

    this.createlistSystems(this.systems);
    wiget.addEventListener('submit', e => this.onSubmitForm(e, this.checkValidation));
    number.addEventListener('input', e => this.onInputForm(e, this.systems));
  }

  createlistSystems(systems) {
    const wiget = document.querySelector(this.wiget);
    const ul = document.createElement('ul');

    ul.className = this.listSystemClass;

    systems.forEach((item) => {
      const li = document.createElement('li');
      const imgae = document.createElement('img');

      li.className = this.itemSystemClass;
      li.setAttribute(this.dataSystemName, item.name);
      imgae.className = this.imgSystemClass;
      imgae.src = item.img;
      imgae.alt = item.name;

      if (item.active) {
        li.classList.add(this.imgActiveSystemClass);
      }

      li.appendChild(imgae);
      ul.appendChild(li);
    });
    wiget.insertBefore(ul, wiget.children[0]);
  }

  checkPrefixes(systems, val) {
    return new Promise((resolve) => {
      for (const system of systems) {
        system.active = false;

        for (const prefix of system.prefixes) {
          const regexp = new RegExp(`^(${prefix})(\\d|)+`, 'i');

          if (regexp.test(val)) resolve(system.name);
        }
      }

      resolve(undefined);
    });
  }

  onInputForm(e, systems) {
    const wiget = document.querySelector(this.wiget);
    const dataSystems = wiget.querySelectorAll(`[${this.dataSystemName}]`);

    dataSystems.forEach((item) => {
      item.classList.remove(this.imgActiveSystemClass);
    });

    if (this.listMessage.length !== 0) {
      this.listMessage.forEach(item => item.remove());
      this.listMessage = [];
    }

    e.target.value = e.target.value.replace(/\D/i, '');

    if (e.target.value !== '') {
      this.checkPrefixes(systems, e.target.value)
        .then((data) => {
          if (data !== undefined) {
            const dataSystem = wiget.querySelector(`[${this.dataSystemName}=${data}]`);

            dataSystem.classList.add(this.imgActiveSystemClass);
          }
        });
    }
  }

  checkValidation(val) {
    if (val !== '') {
      return val
        .toString()
        .split('').reverse()
        .map(x => parseInt(x))
        .map((x, idx) => (idx % 2 ? x * 2 : x))
        .map(x => (x > 9 ? (x % 10) + 1 : x))
        .reduce((accum, x) => accum + x) % 10 === 0;
    }
    return false;
  }

  onSubmitForm(e, checkValidation) {
    e.preventDefault();

    const { number } = e.target.elements;
    const validation = checkValidation(number.value);

    if (this.listMessage.length !== 0) {
      this.listMessage.forEach(item => item.remove());
      this.listMessage = [];
    }

    if (!validation) {
      this.message('Карта не валидна', this.errorClass);
    } else {
      this.message('Карта валидна', this.validClass);
    }
  }

  message(message, className) {
    const wiget = document.querySelector(this.wiget);
    const error = document.createElement('p');

    error.className = className;
    error.dataset.error = 'card-validator';
    error.innerHTML = message;

    wiget.appendChild(error);
    this.listMessage.push(error);
  }
}

export default CardValidator;
