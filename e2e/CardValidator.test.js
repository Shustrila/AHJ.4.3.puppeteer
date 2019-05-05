import puppetteer from 'puppeteer';

jest.setTimeout(200000);

describe('TESTS: form', () => {
   let browser = null;
   let page = null;
   const baseUrl = 'http://localhost:8080';
   beforeAll(async () => {
      browser = await puppetteer.launch({
         headless: false,
         slowMo: 100,
         devtools: true,
      });
      page = await browser.newPage();
   });
   afterAll(async () => {
      await browser.close();
   });

   test('name system visa one number', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[data-widgets=credit-card-validator]');
      const input = await form.$('[class=card-validator__input]');
      await input.type('4111111111111111');
      const submit = await form.$('[class=card-validator__submit]');
      submit.click();
      await page.waitForSelector('[data-error=card-validator]');
   });

   test('name system visa',  async () => {
      await page.goto(baseUrl);
      const form = await page.$('[data-widgets=credit-card-validator]');
      const input = await form.$('[class=card-validator__input]');
      await input.type('4');
      const submit = await form.$('[class=card-validator__submit]');
      submit.click();
      await page.waitForSelector('[data-error=card-validator]');
   });
});
