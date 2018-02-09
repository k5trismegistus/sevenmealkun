class Menu {
  constructor (menuName, pageUrl, imageUrl, year, month, date) {
    this.menuName = menuName
    this.pageUrl = pageUrl
    this.imageUrl = imageUrl
    this.year = year
    this.month = month
    this.date = date
  }

  toSlack () {
    const str = `
    ${this.month}/${this.date}のメニューは${this.menuName}です
    ${this.imageUrl}
    `
    return str
  }
}

module.exports = { Menu }
