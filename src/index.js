const setting = require('../config.json')
const Botkit = require('botkit')

const {test} = require('./services/test')


const controller = Botkit.slackbot({
  debug: false
})

controller.spawn({
  token: setting.slackToken
}).startRTM((err, bot, payload) => {
  if (err) {
    console.log('Error: Cannot to Slack')
    process.exit(1)
  }
})

const validUser = (userId) => {
  return (userId === setting.userId)
}

controller.hears('ping', ['direct_message', 'mention', 'direct_mention'], async (bot, message) => {
  if (!validUser(message.user)) {
    bot.reply(message, 'あなたは有効なユーザーではありません')
    return
  }

  await test()

  bot.reply(message, message)
})

// controller.hears('menu', ['direct_message', 'mention', 'direct_mention'], async (bot, message) => {
//   bot.reply(message, 'Please be patient...')
//   const r = await getMenuToShow()
//   bot.reply(message, r.menuName)
//   bot.reply(message, r.menuImage)
//   bot.reply(message, r.menuLink)
// })

// controller.hears('order', ['direct_message', 'direct_mention', 'mention'], async (bot, message) => {
//   if (!validUser(message.user)) {
//     bot.reply(message, 'あなたは有効なユーザーではありません')
//     return
//   }

//   bot.reply(message, 'Please be patient...')
//   await order()
//   bot.reply(message, '注文しました')
// })

// controller.hears('mode', ['direct_message', 'mention'], (bot, message) => {
//   bot.reply(message, '雑穀米 ごはん少なめ')
// })

// const getMenuToShow = async () => {
//   const browser = await puppeteer.launch({
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox'
//     ]
//   })
//   const page = await browser.newPage()

//   const rawMenus = await getRawMenus(page)
//   const tommorowMenu = tomorrowMenu(rawMenus)

//   browser.close()
//   return tommorowMenu[0]
// }

// const getRawMenus = async (page) => {
//   await page.goto('https://7-11net.omni7.jp/basic/0501001003003000')

//   await page.waitForSelector('.mod-shoppingContents_item')

//   const rawMenus = await page.evaluate(() => {
//     const containers = Array.from(document.querySelectorAll('.mod-shoppingContents_item'))
//     return containers.map(c => {
//       const menuName = Array.from(c.querySelectorAll('.u-hoverLink'))[0]
//         .innerText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
//       const menuLink = Array.from(c.querySelectorAll('.u-hoverLink'))[0].href
//       const menuImage = Array.from(c.querySelectorAll('.u-img'))[0].src
//       return { menuName, menuLink, menuImage }
//     })
//   })
//   return rawMenus
// }

// const tomorrowMenu = (rawMenus) => {
//   let d = new Date()
//   d.setDate(d.getDate() + 2)
//   const tommorowMonth = d.getMonth() + 1
//   const tommorowDate = d.getDate()

//   const dateReg = new RegExp(`${tommorowMonth}月${tommorowDate}日`)
//   const riceReg = new RegExp('雑穀米')
//   const menu = rawMenus
//     .filter((rawMenu) => (dateReg.test(rawMenu.menuName)))
//     .filter((tomorrowMenu) => (riceReg.test(tomorrowMenu.menuName)))

//   return menu
// }

// const order = async () => {
//   const page = await createPage()

//   await logIn(page)

//   const menu = await getMenuToShow()
//   page.goto(menu.menuLink)
//   try {
//     await page.waitForNavigation()
//     await page.$eval('input[title="カートに入れる"]', el => el.click())
//     await page.waitForNavigation()
//     await page.$eval('button[type="submit"]', el => el.click())
//     await page.waitForNavigation()
//     await page.$eval('a[class="linkBtn js-pressTwice"]', el => el.click())
//     await page.waitForNavigation()
//     await page.$eval('input[type="submit"]', el => el.click())
//     await page.waitForNavigation()
//   } catch (e) {
//     await page.screenshot({path: 'error.png'})
//   }
// }
