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
          // 拿user
          wx.cloud.database().collection("users").where({
            _openid:res.result.openid
          }).get({
            success:function(res){
              console.log("获取用户成功",res)
              if(res.data.length!=0){
                that.globalData.user = res.data[0]
                console.log("user 是！！", that.globalData.user)
              }else{
                // 弹对话框提示完善信息
                wx.showModal({
                  title:"提示",
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
              }
            },
            fail:function(res){
              console.log("获取用户失败",res)
            }
          })
        },
        fail(res){
          console.log("获取openid失败", res)
        }
      })
    
    }
  },

  globalData:{
    _openid:"",
    appid:"wx9e2d10f6dc0c617f",
    ne:null,
    userInfo:null,
    user:null,
    article_url:"",
    articles:[],
    isCached:false    // 提高获取公众号文章的性能
  }
})
