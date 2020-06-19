const DB = wx.cloud.database()
const _ = DB.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/banner/banner2.jpg',
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/banner/banner3.jpg',
      'cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/banner/banner.jpg',
    ],

  },

  logNext1: function () {
    console.log(app.globalData._openid)
   

    wx.navigateTo({
      url: "../services/services"
    })
  },
  logNext2: function () {
    wx.navigateTo({
      url: "../hedangjian/hedangjian"
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
  logNext5: function () {
    wx.navigateTo({
      url: "../Info_collect/Info_collect"
    })
  },
  logNext6: function () {
    wx.navigateTo({
      url: "../menu/menu"
    })
  },
  logNext7: function () {
    wx.navigateTo({
      url: "../health/health"
    })
  },
  logNext8: function () {
    wx.navigateTo({
      url: "../job/job"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getip",
      success: function (res) {
        console.log("云函数ip:", res)
      }
    })
   
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