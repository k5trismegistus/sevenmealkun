const {BaseScene} = require('../scenes/baseScene')

const {createPage} = require('../utils/createPage')

const test = async () => {
  const page = await createPage()
  const scene = new BaseScene(page)

  console.log(await scene.isLoggedIn())
  await scene.logIn()
  console.log(await scene.isLoggedIn())
}

module.exports = { test }
