//app.js

App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


    let that = this
    // 云开发初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'zzmine-3cgx9',
        traceUser: true,
      })
      // 获取用户_openid, 要是不存在就需要新建一个用户
      wx.cloud.callFunction({
        name:"get_openid",
        success(res){
          console.log("获取openid成功",res)
          that.globalData._openid = res.result.openid
          console.log(that.globalData._openid)
        },
        fail(res){
          console.log("获取openid失败", res)
        }
      })
    
    }
  },

  globalData:{
    _openid:"",
      ne:null,
      userInfo:null
  }
})
