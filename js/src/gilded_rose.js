class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateAgedBrieQuality(brie) {
    brie.sellIn = brie.sellIn - 1;
    if(brie.quality < 50) {
      brie.quality += 1;
    }
    if (brie.sellIn < 0 && brie.quality < 50) {
      brie.quality += 1;
    }
  }
  updateBackstageQuality(backstage) {
    if (backstage.quality < 50) {
      backstage.quality += 1;
      if (backstage.sellIn < 11 && backstage.quality < 50) {
        backstage.quality += 1;
      }
      if (backstage.sellIn < 6 && backstage.quality < 50) {
        backstage.quality += 1;
      }
    }
    if (backstage.sellIn < 1) {
      backstage.quality = 0;
    }
    backstage.sellIn = backstage.sellIn - 1;
  }
  updateDefaultItemQuality(item) {
    item.sellIn = item.sellIn - 1;
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
  updateQuality() {
    this.items.map((item) => {
      switch (item.name) {
        case 'Aged Brie':
          this.updateAgedBrieQuality(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstageQuality(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        default:
          this.updateDefaultItemQuality(item);
          break;
      }
    });
    return this.items;
  }
}

const GildedRose = {Item, Shop};
module.exports = GildedRose;
