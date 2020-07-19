// pages/share/share.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meihaoList: [],
    user: app.globalData.user,
    user_id: app.globalData._openid,
    istrue: false,
    picList: [],
    blank: false,
  },
  openGallery: function (event) {
    console.log(event.currentTarget.dataset.item.fileUrl);
    this.setData({
      picList: event.currentTarget.dataset.item.fileUrl,
      istrue: true
    })
  },
  closeGallery: function () {
    this.setData({
      istrue: false,
      picList: []
    })
  },

  // 获取云端数据(合美好)
  getMeihaoData: function () {
    let that = this   // 防止异步处理造成this指向改变
    wx.cloud.callFunction({
      name: "get_meihaodata",
      success: function (res) {
        console.log("小程序获取数据", res)
        that.setData({ meihaoList: res.result.data })
        console.log(that.data.meihaoList)
        if (that.data.meihaoList.length === 0) {
          that.setData({ blank: true })
        }
      },
      fail: function (res) {
        console.log("小程序获取美好数据失败", res)
      }
    })
  },
  btnClick: function () {
    if (app.globalData.user == null) {
      wx.showModal({
        content: "您当前未注册，快去完善信息吧！",
        success: function (res) {
          if (res.confirm) {
            // 跳转到表单页面，进行填写
            wx.navigateTo({
              url: '../fillInfo/fillInfo'
            })
          } else if (res.cancel) {
            console.log("用户取消注册!")
          }
        }
      })
      return false
    }
    wx.navigateTo({
      url: '../m_logs/m_logs',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    this.getMeihaoData()
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
    this.getMeihaoData()
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