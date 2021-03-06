// pages/xunxi_fuwu/xunxi_fuwu.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meihaoList: [],
    user:'',
    user_id: '',
    istrue: false,
    picList: [],
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
  publish:function(e){
    let that = this
    console.log(e)
    wx.cloud.callFunction({
      name: "change_hemeihaostate", 
      data: {
        dataId: e.currentTarget.id,
        name: "hemeihao",
        state: '2'  // -1表示审核不通过（2表示审核通过）
      },
      success: function (res) {
        console.log("hemeihao表状态修改完毕", res)
        that.getMeihaoData()
      },
      fail:function(res){
        console.log("失败", res)
      }
    })
  },
  delete:function(e){
    let that = this
    console.log(e)
    wx.cloud.callFunction({
      name: "change_hemeihaostate",
      data: {
        dataId: e.currentTarget.id,
        name: "hemeihao",
        state: '-1'  // -1表示审核不通过（2表示审核通过）
      },
      success: function (res) {
        console.log("hemeihao表状态修改完毕", res)
        that.getMeihaoData()
      },
      fail: function (res) {
        console.log("失败", res)
      }
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
        that.setData({ user: app.globalData.user })
        console.log(that.data.user)
        that.setData({user_id: app.globalData._openid })
        console.log(that.data.user_id)
      },
      fail: function (res) {
        console.log("小程序获取美好数据失败", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMeihaoData()
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