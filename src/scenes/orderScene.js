const {BaseScene} = require('./baseScene')

class OrderScene extends BaseScene {
  async doOrder (itemUrl) {
    try {
      await this.logIn()
      await this.page.goto(itemUrl)
      await this.page.$eval('input[title="カートに入れる"]', el => el.click())
      await this.page.waitForNavigation()
      await this.page.$eval('button[type="submit"]', el => el.click())
      await this.page.waitForNavigation()
      await this.page.$eval('a[class="linkBtn js-pressTwice"]', el => el.click())
      await this.page.waitForNavigation()
      await this.page.$eval('input[type="submit"]', el => el.click())
      await this.page.waitForNavigation()
    } catch (e) {
      await this.page.screenshot({path: 'error.png'})
      console.log(e)
      throw e
    }
  }
}

module.exports = { OrderScene }
