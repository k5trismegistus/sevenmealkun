const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  const page = await browser.newPage()
  await page.goto('https://7-11net.omni7.jp/basic/0501001003003000')

  await page.waitForSelector('.mod-shoppingContents_item')

  const rawMenus = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('.mod-shoppingContents_item'))
    return containers.map(c => {
      const menuName = Array.from(c.querySelectorAll('.u-hoverLink'))[0]
        .innerText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
      const menuLink = Array.from(c.querySelectorAll('.u-hoverLink'))[0].href
      const menuImage = Array.from(c.querySelectorAll('.u-img'))[0].src
      return { menuName, menuLink, menuImage }
    })
  })

  console.log(rawMenus)

  browser.close()
})()
