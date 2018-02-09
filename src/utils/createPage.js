const puppeteer = require('puppeteer')

const createPage = async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage()

  await page.goto('https://www.omni7.jp')
  return page
}

module.exports = { createPage }
