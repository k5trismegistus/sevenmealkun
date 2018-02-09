const {getMenu} = require('./getMenu')

const {OrderScene} = require('../scenes/orderScene')

const {createPage} = require('../utils/createPage')

const order = async (month, date) => {
  const menuToOrder = await getMenu(month, date)
  if (!menuToOrder) {
    console.log(menuToOrder)
    return
  }

  const page = await createPage()
  const scene = new OrderScene(page)

  try {
    await scene.doOrder(menuToOrder.pageUrl)
    return menuToOrder.messageOrdered()
  } catch (e) {
    console.log(e)
    return '注文に失敗しました'
  }
}

module.exports = { order }
