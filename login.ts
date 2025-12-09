import { expect } from 'chai';

describe('Login Test', () => {
  it('should log in successfully and send mock-server request', async () => {
    await browser.url('https://the-internet.herokuapp.com/login');

    await $('#username').setValue('tomsmith');
    await $('#password').setValue('SuperSecretPassword!');

    await $('button[type="submit"]').click();

    const successMessage = await $('.flash.success');
    await successMessage.waitForExist();
    expect(await successMessage.getText()).to.include('You logged into a secure area!');

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'tomsmith', timestamp: new Date().toISOString() })
    });

    expect(response.ok).to.be.true;
    const data = await response.json();
    console.log('Mock server response:', data);
  });
});