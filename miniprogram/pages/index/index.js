// miniprogram/pages/index/index.js
// 引入数据库
// 在合志愿表中操作！！！
const DB = wx.cloud.database().collection("hezhiyuan")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    age: "",
    delname:"",
    upd_id:"",
    upd_age:""
  },
  
  //云函数 获取用户openid
  getOpenid:function(){
    wx.cloud.callFunction({
      name:"get_openid",
      success(res){
        console.log("获取openid成功",res)
        console.log(res.result.openid)
      },
      fail(res){
        console.log("获取openid失败", res)
      }
    })
  },


  // 获得输入
  addName:function(event){
    console.log(event.detail.value)
    this.setData({name:event.detail.value})
  },
  addAge:function(event){
    console.log(event.detail.value)
    this.setData({age:event.detail.value})
  },
  getDelName:function(event){
    console.log(event.detail.value)
    this.setData({delname:event.detail.value})
  },
  getUpdateId:function(event){
    console.log(event.detail.value)
    this.setData({upd_id:event.detail.value})
  },
  getUpdateAge:function(event){
    console.log(event.detail.value)
    this.setData({upd_age:event.detail.value})
  },
  

  // 上传数据
  addData:function(){
    DB.add({
      data:{
        name:this.data.name,
        age:this.data.age
      },
      success(res){
        console.log("添加成功",res)
      },
      fail(res){
        console.log("添加失败",res)
      }
    })
  },

  // 查询数据 
  getData:function(){
    DB.get({
      success(res){
        console.log("查询成功",res)  // 打印所有表中数据
        // 弹窗只取拿到的第一条数据
        wx.showModal({
          title: '提示',
          content: 'name:'+res.data[0].name+"\r\nage:"+res.data[0].age,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail(res){
        console.log("查询失败",res)
      }
    })
  },

  // 删除数据
  delData:function(){
    //根据姓名获得id
    DB.where({
      name:this.data.delname
    })
    .get({
      success(res){
        console.log("查询id",res);
        var delid = res.data[0]._id
        console.log(delid)
        DB.doc(delid).remove({
          success(res){
            console.log("删除成功",res)
          },
          fail(res){
            console.log("删除失败",res)
          }
        })
      },
      fail(res){
        console.log("删除失败",res)
      }
    })
  },

  // 更新数据
  updateInfo:function(){
    DB.doc(this.data.upd_id).update({
      data:{
        age:this.data.upd_age
      },
      success:function(res){
        console.log("更新成功",res)
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