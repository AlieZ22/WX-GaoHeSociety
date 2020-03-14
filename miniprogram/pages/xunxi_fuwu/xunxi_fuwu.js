// pages/xunxi_fuwu/xunxi_fuwu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navState: 0,   //导航状态,
    FuwuList: [],
    user: '',
    user_id: '',
  },
  //监听滑块
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },
  //点击导航
  navSwitch: function (e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },
  // 获取云端数据(合服务)
  getFuwuData: function () {
    let that = this   // 防止异步处理造成this指向改变
    wx.cloud.callFunction({
      name: "get_fuwudata",
      success: function (res) {
        console.log("小程序获取数据", res)
        that.setData({ fuwuList: res.result.data })
        console.log(that.data.fuwuList)
        that.setData({ user: app.globalData.user })
        console.log(that.data.user)
        that.setData({ user_id: app.globalData._openid })
        console.log(that.data.user_id)
      },
      fail: function (res) {
        console.log("小程序获取服务数据失败", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFuwuData()
    var that = this;

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