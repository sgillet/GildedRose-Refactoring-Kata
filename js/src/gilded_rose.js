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
    if (brie.sellIn < 0) {
      if (brie.quality < 50) {
        brie.quality += 1;
      }
    }
  }
  updateBackstageQuality(backstage) {
    if (backstage.quality < 50) {
      backstage.quality += 1;
      if (backstage.sellIn < 11) {
        if (backstage.quality < 50) {
          backstage.quality += 1;
        }
      }
      if (backstage.sellIn < 6) {
        if (backstage.quality < 50) {
          backstage.quality += 1;
        }
      }
    }
    backstage.sellIn = backstage.sellIn - 1;
    if (backstage.sellIn < 0) {
      backstage.quality = backstage.quality - backstage.quality;
    }
  }
  updateSulfurasQuality(sulfuras) {
  }
  updateDefaultItemQuality(item) {
    item.sellIn = item.sellIn - 1;
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    if (item.sellIn < 0) {
      if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      switch (this.items[i].name) {
        case 'Aged Brie':
          this.updateAgedBrieQuality(this.items[i]);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstageQuality(this.items[i]);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          this.updateSulfurasQuality(this.items[i]);
          break;
        default:
          this.updateDefaultItemQuality(this.items[i]);
          break;
      }
    }

    return this.items;
  }
}

const GildedRose = {Item, Shop};
module.exports = GildedRose;
