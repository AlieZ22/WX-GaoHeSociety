// miniprogram/pages/hedangjian/hedangjian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accessToken:"",
    wechatPostList:[]    // 同步公众号的列表
  },

  seeDetail:function(res){
    // 将http换成https
    let tempUrl = res.currentTarget.dataset.index
    tempUrl = tempUrl.slice(0,4)+"s"+tempUrl.slice(4)
    console.log(tempUrl)
    app.globalData.article_url = tempUrl
    wx.navigateTo({
      url: '../article/article'
    })
  },

  updateArticles:function(data){
    let that = this
    let len = data.length
    for(let i=0;i<len;i++){
      let len2 = data[i].content.news_item.length
      for(let j=0;j<len2;j++){
        that.setData({
          wechatPostList: that.data.wechatPostList.concat(data[i].content.news_item[j])
        })
      }
      // 存入云数据库
      /*wx.cloud.database().collection("hedangjian").where({
        media_id: data[i].media_id
      }).get({
        success:function(res){
          if(res.data.length==0){        // 没有存入这一天的公众号投稿
            wx.cloud.database().collection("hedangjian").add({
              data: {
                media_id: data[i].media_id,
                update_time: data[i].content.update_time,
                news_item: data[i].content.news_item
              },
              success: function (res) {
                console.log("合党建添加成功", res)
              }
            })
          }else{                // 更新
            wx.cloud.database().collection("hedangjian").doc(res.data[0]._id).set({
              data:{
                media_id: data[i].media_id,
                update_time: data[i].content.update_time,
                news_item: data[i].content.news_item
              },
              success:function(res){
                //console.log("更新合党建成功",res)
              }
            })
          }
        } 
      })*/
    }
    console.log(that.data.wechatPostList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取access token
    let that = this;
    if(!app.globalData.isCached){       // 未缓存
      wx.showLoading({
        title: '加载中',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getAccessToken',
        success: function (res) {
          that.setData({
            accessToken: res.result
          })
          wx.cloud.callFunction({
            // 云函数名称
            name: 'getWechatPosts',
            data: {
              accessToken: that.data.accessToken
            },
            success: function (res) {
              console.log("getWechatPosts result")
              console.log(res.result)
              that.updateArticles(res.result.item)    // 更新公众号文章
              wx.hideLoading()
              app.globalData.articles = that.data.wechatPostList
              app.globalData.isCached = true
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }else{                         // 已缓存
      that.setData({
        wechatPostList:app.globalData.articles
      })
    }
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
    // 重新获取公众号文章
    // 先清空wechatlist
    let that = this
    that.setData({
      wechatPostList:[]
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAccessToken',
      success: function (res) {
        that.setData({
          accessToken: res.result
        })
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getWechatPosts',
          data: {
            accessToken: that.data.accessToken
          },
          success: function (res) {
            console.log("getWechatPosts result")
            console.log(res.result)
            that.updateArticles(res.result.item)    // 更新公众号文章
            wx.hideLoading()
            app.globalData.articles = that.data.wechatPostList
            app.globalData.isCached = true
          },
          fail: console.error
        })
      },
      fail: console.error
    })
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