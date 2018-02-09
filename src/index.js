const setting = require('../config.json')
const Botkit = require('botkit')

const {test} = require('./services/test')
const {getMenu} = require('./services/getMenu')
const {order} = require('./services/order')


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
  if (/[A-Za-z]+ \d+\/\d+/.test(str)) {
    month = parseInt(str.match(/[A-Za-z]+ (\d+)\/\d+/)[1])
    date = parseInt(str.match(/[A-Za-z]+ \d+\/(\d+)/)[1])
  } else if (str.match(/[A-Za-z]+/)) {
    const today = new Date()
    const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

    month = tommorow.getMonth() + 1
    date = tommorow.getDate()
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
    const reply = menu.messageDescription()
    bot.reply(message, reply)
  } catch (e) {
    console.log(e)
    bot.reply(message, 'その日のメニューはみつからなかったよ…')
  }
})

controller.hears('order', ['direct_message', 'mention', 'direct_mention'], async (bot, message) => {
  if (!validUser(message.user)) {
    bot.reply(message, 'あなたは有効なユーザーではありません')
    return
  }

  const { month, date } = parseDate(message.text)

  try {
    const reply = await order(month, date)
    bot.reply(message, reply)
  } catch (e) {
    console.log(e)
    bot.reply(message, 'その日のメニューはみつからなかったよ…')
  }
})

