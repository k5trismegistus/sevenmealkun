class Menu {
  constructor (menuName, pageUrl, imageUrl, year, month, date, riceAmount, riceType) {
    this.menuName = menuName
    this.pageUrl = pageUrl
    this.imageUrl = imageUrl
    this.year = year
    this.month = month
    this.date = date
    this.riceAmount = riceAmount
    this.riceType = riceType
  }

  messageDescription () {
    const str = `
    ${this.month}/${this.date}のメニューは${this.menuName}です
    ${this.imageUrl}
    `
    return str
  }

  messageOrdered () {
    const str = `
    ${this.month}/${this.date}の${this.menuName}を注文しました
    ${this.imageUrl}
    `
    return str
  }
}

module.exports = { Menu }
