const {BaseScene} = require('./baseScene')

const {Menu} = require('../models/menu')

class MenuListScene extends BaseScene {
  async getMenuList () {
    // todo ごはんの量対応
    await this.page.goto('https://7-11net.omni7.jp/basic/0501001003003000')

    await this.page.waitForSelector('.mod-shoppingContents_item')
    const rawMenuList = await this.page.evaluate(() => {
      const containers = Array.from(document.querySelectorAll('.mod-shoppingContents_item'))
      return containers.map(c => {
        // "【２月１０日（土）】雑穀米１７０ｇおまかせ御膳（八宝菜）" のような形式
        const rawMenuString = Array.from(c.querySelectorAll('.u-hoverLink'))[0].innerText
          .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))

        const menuName = rawMenuString.match(/（.+）.+（(.+)）/)[1]
        const menuLink = Array.from(c.querySelectorAll('.u-hoverLink'))[0].href
        const menuImage = Array.from(c.querySelectorAll('.u-img'))[0].src

        const month = parseInt(rawMenuString.match(/(\d+)月/)[1])
        const date = parseInt(rawMenuString.match(/(\d+)日/)[1])
        const year = (month >= (new Date()).getMonth() + 1) ? (new Date()).getFullYear() : (new Date()).getFullYear() + 1

        const menu = { menuName, menuLink, menuImage, year, month, date }
        return menu
      })
    })
    const menuList = rawMenuList.map((rawMenu) => new Menu(rawMenu.menuName, rawMenu.menuLink, rawMenu.menuImage, rawMenu.year, rawMenu.month, rawMenu.date))

    return menuList
  }
}

module.exports = { MenuListScene }
