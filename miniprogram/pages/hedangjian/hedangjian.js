// miniprogram/pages/hedangjian/hedangjian.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowPage:1,
    page2cached:false, 
    accessToken:"",
    wechatPostList:[],    // 同步公众号的列表
    djInfoList:[],       // 2页面，链接信息列表
    count:0,
    offset:app.globalData.offset    // 用于获取之后的文章列表
  },

  changePage:function(e){
    console.log(e)
    let pageId = e.currentTarget.dataset.id
    this.setData({
      nowPage:pageId
    })
    // 对2界面加载
    if(pageId==2&&!this.data.page2cached){
      let that = this
      // 获取数据
      wx.cloud.callFunction({
        name:"get_djInfodata",
        success:function(res){
          // 标志已缓存
          console.log("获取党建发布信息成功",res)
          that.setData({
            djInfoList:res.result.data,
            page2cached:true
          })
        },
        fail:function(res){
          console.log("获取党建发布信息失败",res)
        }
      })
    }
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
          wechatPostList: that.data.wechatPostList.concat(data[i].content.news_item[j]),
          count:that.data.count+1
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
          console.log("access_token:",res)
          wx.cloud.callFunction({
            // 云函数名称
            name: 'getWechatPosts',
            data: {
              accessToken: that.data.accessToken,
              offset:that.data.offset,
              count:2
            },
            success: function (res) {
              console.log("getWechatPosts result")
              console.log(res.result)
              that.updateArticles(res.result.item)    // 更新公众号文章
              wx.hideLoading()
              app.globalData.articles = that.data.wechatPostList
              app.globalData.isCached = true
              //更新offset
              that.setData({
                offset:that.data.offset+2
              })
              app.globalData.offset = that.data.offset
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }else{                         // 已缓存
      that.setData({
        wechatPostList:app.globalData.articles,
        offset:app.globalData.offset
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
    let that = this
    if(this.data.nowPage==1){
      // 重新获取公众号文章
      // 先清空wechatlist
      that.setData({
        wechatPostList:[],
        count:0,
        offset:0
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
              accessToken: that.data.accessToken,
              offset:that.data.offset,
              count:2
            },
            success: function (res) {
              console.log("getWechatPosts result")
              console.log(res.result)
              that.updateArticles(res.result.item)    // 更新公众号文章
              wx.hideLoading()
              app.globalData.articles = that.data.wechatPostList
              app.globalData.isCached = true
              //更新offset
              that.setData({
                offset: that.data.offset + 2
              })
              app.globalData.offset = that.data.offset
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }else{
      // 获取数据
      wx.cloud.callFunction({
        name: "get_djInfodata",
        success: function (res) {
          // 标志已缓存
          console.log("获取党建发布信息成功", res)
          that.setData({
            djInfoList: res.result.data,
            page2cached: true
          })
        },
        fail: function (res) {
          console.log("获取党建发布信息失败", res)
        }
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.nowPage==1){
      let that = this
      console.log("触底：", that.data.offset)
      // 加载后面的文章
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
              accessToken: that.data.accessToken,
              offset: that.data.offset,
              count:1        // 下拉更新一次三天
            },
            success: function (res) {
              console.log("getWechatPosts result")
              console.log(res.result)
              that.updateArticles(res.result.item)    // 更新公众号文章
              wx.hideLoading()
              app.globalData.articles = that.data.wechatPostList
              app.globalData.isCached = true
              //更新offset
              that.setData({
                offset: that.data.offset + 1
              })
              app.globalData.offset = that.data.offset
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})