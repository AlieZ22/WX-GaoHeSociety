// pages/news/news.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tg_pic:"cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/1582946876858.png",
    tg_name:"XXX",
    tg_p: "XXX",
    tg_n: "XXX",
    tg_info:"XXX",
    fuwuList:[]
  },
  // 获取云端数据(合美好)
  getmokuaiData: function () {
    let that = this   // 防止异步处理造成this指向改变
    wx.cloud.callFunction({
      name: "get_fuwudata",
      success: function (res) {
        //console.log("小程序获取数据", res)
        that.setData({ fuwuList: res.result.data })
        console.log(that.data.fuwuList)
      },
      fail: function (res) {
        console.log("小程序获取服务数据失败", res)
      }
    })
  },
  btnClick_shouzhu: function(){
    console.log(app.globalData.user)
    if (app.globalData.user == null) {
      wx.showModal({
        content:"您当前未注册，快去完善信息吧！",
        success:function(res){
          if(res.confirm){
            // 跳转到表单页面，进行填写
            wx.navigateTo({
              url:'../fillInfo/fillInfo'
            })
          }else if(res.cancel){
            console.log("用户取消注册!")
          }
        }
      })
      return false
    }
      wx.navigateTo({
        url: '../s_logs/s_logs',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
  },
  btnClick_helper: function (event) {
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
    //console.log("帮助", event.target.dataset.content)
    let content = event.target.dataset.content
    wx.navigateTo({
      url: '../s_help/s_help?helpContent=' + content.helpContent + "&author=" + content.author + "&_id=" + content._id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmokuaiData()
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
    this.getmokuaiData()
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