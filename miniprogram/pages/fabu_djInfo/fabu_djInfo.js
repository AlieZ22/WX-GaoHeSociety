import WxValidate from "../utils/WxValidate"

// pages/fabu_djInfo/fabu_djInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disable:false,          // 防止表单重复提交
  },

  formSubmit:function(e){
    let that = this
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    let formData = e.detail.value
    that.setData({
      disable:true
    })
    // 提交至数据库
    wx.cloud.database().collection("djInfo").add({
      data:{
        title:formData.title,
        name:formData.name,
        url:formData.url,
        content:formData.content
      },
      success:function(res){
        that.setData({
          disable:false
        })
        wx.navigateTo({
          url:"../msg_success/msg_success"
        })
      }
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