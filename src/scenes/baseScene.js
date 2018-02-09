const setting = require('../../config.json')

class BaseScene {
  constructor (page) {
    this.page = page
  }

  async isLoggedIn () {
    const isGuest = await this.page.evaluate(() => {
      try {
        const storeName = document.querySelectorAll('.mod-header_storeInfo > p > b')[0].innerText
        return /見学/.test(storeName)
      } catch (e) {
        return true
      }
    })

    return !isGuest
  }

  async logIn () {
    await this.page.goto('https://www.omni7.jp/account/login/')

    await this.page.$eval('input[name="login"]', (el, mail) => { el.value = mail }, setting.omniSevenEmail)
    await this.page.$eval('input[name="password"]', (el, password) => { el.value = password }, setting.omniSevenPassword)
    await this.page.click('#loginBtn')
    await this.page.waitForNavigation()

    await this.page.goto('https://7-11net.omni7.jp/top')
  }
}

module.exports = { BaseScene }
