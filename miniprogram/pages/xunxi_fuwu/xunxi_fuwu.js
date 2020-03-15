// pages/xunxi_fuwu/xunxi_fuwu.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navState: 0,   //导航状态,
    zhiyuan: [],
    super_fuwulist:[],
    qiuzhu:[],    //求助报名情况
    user: '',
    user_id: '',
    detail:{},
  },

  //打开规则提示
  showRule: function (e) {
    console.log(e)
    this.setData({
      isRuleTrue: true,
      detail: e.currentTarget.dataset.name
    })
  },
  //关闭规则提示
  hideRule: function (e) {
    console.log(e)
    this.setData({
      isRuleTrue: false
    })
  },

  publish: function (e) {
    let that = this
    console.log(e)
    wx.cloud.callFunction({
      name: "change_hefuwustate",
      data: {
        dataId: e.currentTarget.id,
        name: "hefuwu",
        state: '2'  // -1表示审核不通过（2表示审核通过）
      },
      success: function (res) {
        console.log("hefuwu表状态修改完毕", res)
        that.getFuwuData()
      },
      fail: function (res) {
        console.log("失败", res)
      }
    })
  },
  delete: function (e) {
    let that = this
    console.log(e)
    wx.cloud.callFunction({
      name: "change_hefuwustate",
      data: {
        dataId: e.currentTarget.id,
        name: "hefuwu",
        state: '-1'  // -1表示审核不通过（2表示审核通过）
      },
      success: function (res) {
        console.log("hefuwu表状态修改完毕", res)
        that.getFuwuData()
      },
      fail: function (res) {
        console.log("失败", res)
      }
    })
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
    that.setData({ user: app.globalData.user })
    console.log(that.data.user)
    that.setData({ user_id: app.globalData._openid })
    console.log(that.data.user_id)
    if (!that.data.user.isManager) {                // 如果是居民
      db.collection('users').doc(that.data.user._id).get({
        success: function (res) {
          let len = res.data.services.length
          for (let i = 0; i < len; i++) {
            console.log("i==",res.data.services[i])
            if (res.data.services[i].way == 1) {  ////如果是志愿者
              let vol_act_id = res.data.services[i].info
              console.log("vol_act_id", vol_act_id)
              db.collection("hefuwu").doc(vol_act_id).get({
                success: function (res) {
                  console.log("志愿 res.data", res.data)
                  that.setData({
                    zhiyuan: that.data.zhiyuan.concat(res.data)
                  })
                }
              })
            }else{
              let vol_act_id = res.data.services[i].info
              db.collection("hefuwu").doc(vol_act_id).get({
                success: function (res) {
                  console.log("求助 res.data", res.data)
                  that.setData({
                    qiuzhu: that.data.qiuzhu.concat(res.data)
                  })
                }
              })
            }
            
          }
        },
        fail: function (res) {
          console.log("获取用户失败", res)
        }
      })
    } else {                                    // 如果是管理者
      wx.cloud.callFunction({
        name: "get_fuwudata",
        success: function (res) {
          that.setData({
            super_fuwulist: res.result.data
          })
        }
      })

    }

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
    this.getFuwuData()
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