import listSystems from '../src/js/systems/listSystems';
import CardValidator from '../src/js/CardValidator';

const cardValidator = new CardValidator();

test('TESTS: test form dom', () => {
   document.body.innerHTML = `
      <form class="card-validator" data-widgets="credit-card-validator" action="/">
           <div class="card-validator__group-input js-group">
               <label class="card-validator__label">
                   <input class="card-validator__input" type="text" name="number" value="">
               </label>
               <input class="card-validator__submit" type="submit" value="Click to Validate">
           </div>
       </form>
   `;

   cardValidator.init();

   const wiget = document.querySelector(cardValidator.wiget);
   const input = wiget.elements['number'];
   const submit = document.querySelector('.card-validator__submit');

   input.value = '4111111111111111';
   submit.click();

   const message = document.querySelector('[data-error=card-validator]');
   const received = message.innerHTML;
   const expected = 'Карта валидна';

   expect(received).toBe(expected)
});

describe('TESTS: luhn algorithm', () => {
   test('validate true', () => {
      const received = cardValidator.checkValidation('4111111111111111');
      const expected = true;

       expect(received).toBe(expected)
   });

   test('validate false', () => {
      const received = cardValidator.checkValidation('9234765464357484');
      const expected = false;

      expect(received).toBe(expected)
   });

   test('validate false empty field', () => {
      const received = cardValidator.checkValidation('');
      const expected = false;

      expect(received).toBe(expected)
   });
});

describe('TESTS: check prefixes', () => {
   test('name system visa one number', () => {
      const checkPrefixes = cardValidator.checkPrefixes(listSystems, '4');
      const expected = 'Visa';

      checkPrefixes.then(received => expect(received).toBe(expected));
   });

   test('name system visa', () => {
      const checkPrefixes = cardValidator.checkPrefixes(listSystems, '4111111111111111');
      const expected = 'Visa';

      checkPrefixes.then(received => expect(received).toBe(expected));
   });


   test('name system visa resolve empty', () => {
      const checkPrefixes = cardValidator.checkPrefixes([], '4');
      const expected = undefined;

      checkPrefixes.then(received => expect(received).toBe(expected));
   });
});
