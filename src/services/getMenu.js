const {MenuListScene} = require('../scenes/menuListScene')

const {createPage} = require('../utils/createPage')

const getMenu = async (month, date) => {
  const year = (month >= (new Date()).getMonth() + 1) ? (new Date()).getFullYear() : (new Date()).getFullYear() + 1

  // todo: Redisキャッシュを利用する

  const page = await createPage()

  const scene = new MenuListScene(page)

  const menuList = await scene.getMenuList()

  // todo ごはんの種類対応
  return menuList.filter((menu) => (year === menu.year && month === menu.month && date === menu.date))[0]
}

module.exports = { getMenu }
