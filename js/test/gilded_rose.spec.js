const GildedRose = require('../src/gilded_rose.js');
const  assert = require('chai').assert;

describe("Gilded Rose", function() {
  const item = new GildedRose.Item("foo", 0, 0);
  const shop = new GildedRose.Shop([item]);
  const items = shop.updateQuality();

  it("should get the first item name", function() {
    assert.equal (items[0].name, 'foo');
  });
});
