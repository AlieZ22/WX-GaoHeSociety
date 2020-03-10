//app.js

App({
  onLaunch: function () {
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

    this.globalData = {
      _openid:"",
      ne:{}
    }
  }
})
