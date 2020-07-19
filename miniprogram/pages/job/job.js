// miniprogram/pages/rent/rent.js
import WxValidate from '../utils/WxValidate.js'
const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    step: 1,
    files: [],    // 临时图片文件
    fileUrl: [],       // 存放上传成功的图片的fileID
    ne: app.globalData.ne,
    blank: false,
  },

  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.updateData()
  },

  updateData: function () {
    let that = this
    db.collection('hejob').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值 
        that.setData({
          ne: res.data
        })
        if (that.data.ne.length === 0) {
          that.setData({ blank: true })
        }
      },
      fail: res => {
        console.log("小程序获取服务数据失败", res)
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