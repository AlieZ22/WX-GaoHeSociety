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
      url: "../services/services"
    })
  },

  logNext3: function () {
    wx.navigateTo({
      url: "../hezhiyuan/hezhiyuan"
    })
  },
  logNext4: function () {
    wx.showLoading({               // 加载动画
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "verify",
      data: {
        _openid: app.globalData._openid
      },
      success: function (res) {
        console.log("hello",res)
        wx.hideLoading()
        if(res.result.data.length==0){
          console.log("null")
          wx.showModal({
            title: '提示',
            content: '您的信息尚未录入，是否创建',
            confirmText: "是",
            cancelText: "我再逛逛",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.navigateTo({
                  url: "../self/self"
                })
              } else {
                wx.navigateTo({
                  url: "../share/share"
                })
              }
            }
          });
        }else{
          wx.navigateTo({
            url: "../share/share"
          })
        }

      },
      fail: function (res) {
        console.log("获取服务信息失败", res)
        
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