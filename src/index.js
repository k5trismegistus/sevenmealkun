const setting = require('../config.json')
const Botkit = require('botkit')

const {test} = require('./services/test')
const {getMenu} = require('./services/getMenu')


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

const parseDate = (str) => {
  let month
  let date
  if (str === 'menu') {
    const today = new Date()
    const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    month = tommorow.getMonth() + 1
    date = tommorow.getDate()
  } else if (/menu \d+\/\d+/.test(str)) {
    month = parseInt(str.match(/menu (\d+)\/\d+/)[1])
    date = parseInt(str.match(/menu \d+\/(\d+)/)[1])
  }

  return { month, date }
}

controller.hears('ping', ['direct_message', 'mention', 'direct_mention'], async (bot, message) => {
  if (!validUser(message.user)) {
    bot.reply(message, 'あなたは有効なユーザーではありません')
    return
  }

  await test()

  bot.reply(message, message)
})

controller.hears('menu', ['direct_message', 'mention', 'direct_mention'], async (bot, message) => {
  if (!validUser(message.user)) {
    bot.reply(message, 'あなたは有効なユーザーではありません')
    return
  }

  const { month, date } = parseDate(message.text)

  try {
    const menu = await getMenu(month, date)
    bot.reply(message, menu.toSlack())
  } catch (e) {
    console.log(e)
    bot.reply(message, 'その日のメニューはみつからなかったよ…')
  }
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
