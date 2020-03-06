// pages/index1/index1.js
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
    wx.navigateTo({
      url: "../services/services"
    })
  },

  logNext3: function () {
    wx.navigateTo({
      url: "../hezhiyuan/hezhiyuan"
    })
  },
  logNext4: function () {
    wx.navigateTo({
      url: "../share/share"
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