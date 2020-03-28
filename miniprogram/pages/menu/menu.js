const dataList = require("dataList.js");
var that = '';
var query;

Page({
  data: {
    dataList: [],
    idx: 0,
    scrollTop: 0,
    toView: 'position0'
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '87180730',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad: function (options) {
    that = this;
    this.setData({ dataList: dataList.dataList })
    query = wx.createSelectorQuery();
    wx.createSelectorQuery().selectAll('.position').boundingClientRect(function (rects) {
      that.setData({ positions: rects })
    }).exec();
  },

  switchClassfun(e) {
    var e = e.currentTarget.dataset.index;
    this.setData({ idx: e, toView: 'position' + e})
  },

  bindscrollfunc(e) {
    var arr = [];
    for (var item of this.data.positions) {
      if (item.top <= (e.detail.scrollTop + 2)) {
        arr.push(item)
      }
    }
    // 处理属性为空的异常
    try{
      let data = arr[arr.length - 1]
      if("dataset" in data){
        this.setData({ idx: data.dataset.index + 1 })
      }
    }catch(err){}
  },

  topevent:function(e){
    this.setData({ idx: 0})
  }
})