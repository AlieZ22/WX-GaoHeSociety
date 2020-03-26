// miniprogram/pages/hexinxi/hexinxi.js
const DB = wx.cloud.database()
const _ = DB.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/main/u2.jpg',
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/main/u5.jpg',
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/main/u7.jpg'
    ],
  },
  logNext1: function () {
    console.log(app.globalData._openid)


    wx.navigateTo({
      url: "../rent/rent"
    })
  },
  logNext2: function () {
    wx.navigateTo({
      url: "../buy_house/buy_house"
    })
  },
  logNext3: function () {
    wx.navigateTo({
      url: "../Info_collect/Info_collect"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})