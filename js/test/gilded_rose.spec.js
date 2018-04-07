const GildedRose = require('../src/gilded_rose.js');
const  assert = require('chai').assert;

describe("Gilded Rose", () => {
  let items;
  beforeEach(() => {
    items = [];
  })
  describe("Foo", () => {
    beforeEach(() => {
      items = [];
    })

    it("should decrease its quality by 1", () => {
      items.push(new GildedRose.Item("Foo", 2, 3));
      items.push(new GildedRose.Item("Foo", 10, 10));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Foo');
      assert.equal(itemsUptated[0].sellIn, 1);
      assert.equal(itemsUptated[0].quality, 2);

      assert.equal(itemsUptated[1].name, 'Foo');
      assert.equal(itemsUptated[1].sellIn, 9);
      assert.equal(itemsUptated[1].quality, 9);
    });

    it("quality is never negative", () => {
      items.push(new GildedRose.Item("Foo", 1, 0));
      items.push(new GildedRose.Item("Foo", 2, 0));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Foo');
      assert.equal(itemsUptated[0].sellIn, 0);
      assert.equal(itemsUptated[0].quality, 0);

      assert.equal(itemsUptated[1].name, 'Foo');
      assert.equal(itemsUptated[1].sellIn, 1);
      assert.equal(itemsUptated[1].quality, 0);
    });


    it("quality should degrade twice as fast once the sell by date has passed", () => {
      items.push(new GildedRose.Item("Foo", 0, 2));
      items.push(new GildedRose.Item("Foo", -1, 10));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Foo');
      assert.equal(itemsUptated[0].sellIn, -1);
      assert.equal(itemsUptated[0].quality, 0);

      assert.equal(itemsUptated[1].name, 'Foo');
      assert.equal(itemsUptated[1].sellIn, -2);
      assert.equal(itemsUptated[1].quality, 8);
    });
  });

  describe("Aged Brie", () => {
    beforeEach(() => {
      items = [];
    })

    it.only("should increase its quality by 1", () => {
      items.push(new GildedRose.Item("Aged Brie", 1, 0));
      items.push(new GildedRose.Item("Aged Brie", 10, 1));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Aged Brie');
      assert.equal(itemsUptated[0].sellIn, 0);
      assert.equal(itemsUptated[0].quality, 1);

      assert.equal(itemsUptated[1].name, 'Aged Brie');
      assert.equal(itemsUptated[1].sellIn, 9);
      assert.equal(itemsUptated[1].quality, 2);
    });

    it("should stop increasing its quality after 50", () => {
      items.push(new GildedRose.Item("Aged Brie", 1, 50));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Aged Brie');
      assert.equal(itemsUptated[0].sellIn, 0);
      assert.equal(itemsUptated[0].quality, 50);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    beforeEach(() => {
      items = [];
    })

    it("quality should increase by 1 when sellIn between 11 and 49", () => {
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 11, 10));
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 49, 10));
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 51, 10));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[0].sellIn, 10);
      assert.equal(itemsUptated[0].quality, 11);

      assert.equal(itemsUptated[1].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[1].sellIn, 48);
      assert.equal(itemsUptated[1].quality, 11);

      assert.equal(itemsUptated[2].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[2].sellIn, 50);
      assert.equal(itemsUptated[2].quality, 11);
    });

    it("should increase its quality by 2 when sellIn between 6 and 10", () => {
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 10, 10));
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 6, 0));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[0].sellIn, 9);
      assert.equal(itemsUptated[0].quality, 12);

      assert.equal(itemsUptated[1].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[1].sellIn, 5);
      assert.equal(itemsUptated[1].quality, 2);
    });

    it("should increase its quality by 3 when sellIn between 1 and 5", () => {
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 1, 10));
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 5, 0));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[0].sellIn, 0);
      assert.equal(itemsUptated[0].quality, 13);

      assert.equal(itemsUptated[1].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[1].sellIn, 4);
      assert.equal(itemsUptated[1].quality, 3);
    });

    it("quality should drop to 0 after concert", () => {
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", 0, 10));
      items.push(new GildedRose.Item("Backstage passes to a TAFKAL80ETC concert", -1, 5));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[0].sellIn, -1);
      assert.equal(itemsUptated[0].quality, 0);

      assert.equal(itemsUptated[1].name, 'Backstage passes to a TAFKAL80ETC concert');
      assert.equal(itemsUptated[1].sellIn, -2);
      assert.equal(itemsUptated[1].quality, 0);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    beforeEach(() => {
      items = [];
    })

    it("quality should never decrease", () => {
      items.push(new GildedRose.Item("Sulfuras, Hand of Ragnaros", 1, 1));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].sellIn, 1);
    });

    it("sellIn date should never decrease", () => {
      items.push(new GildedRose.Item("Sulfuras, Hand of Ragnaros", 1, 1));

      const itemsUptated = new GildedRose.Shop(items).updateQuality();

      assert.equal(itemsUptated[0].quality, 1);
    });
  });
});
