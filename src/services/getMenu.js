const {MenuListScene} = require('../scenes/menuListScene')

const {RiceAmounts, RiceTypes} = require('../constants/menuConstants')
const {createPage} = require('../utils/createPage')

const getMenu = async (month, date) => {
  const year = (month >= (new Date()).getMonth() + 1) ? (new Date()).getFullYear() : (new Date()).getFullYear() + 1

  // todo: Redisキャッシュを利用する

  const page = await createPage()

  const riceAmounts = RiceAmounts.less

  const scene = new MenuListScene(page)

  const menuList = await scene.getMenuList(riceAmounts)

  // todo ごはんの種類対応
  const target = menuList
    .filter((menu) => (year === menu.year && month === menu.month && date === menu.date))
    .filter((menu) => (menu.riceType === RiceTypes.cereals))[0]

  return target
}

module.exports = { getMenu }
