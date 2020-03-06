// pages//logs/logs.js
const DB = wx.cloud.database()
const _ = DB.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    volunteer:{
      contact:'',
      name:'',
      location:''
    },
    initData:{},
    idx: '',
    applyList: [
      { Item_id: "01", Item_Name: "是" },
        { Item_id: "02", Item_Name: "否" }]
  },
  selectApply: function (e) {
    let id = e.target.dataset.id
    this.setData({
      idx: id
    })
  },
  openSuccess: function () {
    let that = this      // 处理异步请求
    console.log(this.data.initData._id)
    console.log(this.data.volunteer)
    // 先将志愿者传到volunteers表中
    DB.collection("hefuwu_volunteer").add({
      data:{
        contact:this.data.volunteer.contact,
        name:this.data.volunteer.name,
        location:this.data.volunteer.location,
        hefuwu_id:this.data.initData._id,
        state:0
      },
      success:function(res){
        console.log("添加志愿者成功",res)
        // 添加志愿者成功，得到volunteers表中该条记录的_id
        // 获取该志愿者（这里从数据库中调，为了获取其_id和_openid）
        DB.collection("hefuwu_volunteer").doc(res._id).get({
          success:function(res){
            // 然后调用云函数, 分别修改users表以及hefuwu表中的services, volunteers
            wx.cloud.callFunction({
              name:"add_userServices",
              data:{
                _openid: app.globalData._openid,
                info:that.data.initData._id,
                way:1  // 1表示为合服务志愿者（0表示合服务受助者）
              },
              success:function(res){
                console.log("users表项添加完毕",res)
              }
            })

            wx.cloud.callFunction({
              name:"add_fuwuvolunteer",   // 对应合服务中添加volunteers列表
              data:{
                volunteer_id:res.data._id,
                hefuwuId:that.data.initData._id
              },
              success:function(res){
                console.log("云函数添加志愿者成功",res)
              },
              fail:function(res){
                console.log("云函数添加志愿者失败",res)
              }
            })
          },
          fail:function(res){
            console.log("获取志愿者失败",res)
          }
        })
      },
      fail:function(res){
        console.log("添加志愿者失败",res)
      }
    })

    // wx.navigateTo({
    //   url: "../msg_success/msg_success"
    // })
  },
  // 获得输入
  addName: function (event) {
    let v_name = "volunteer.name"
    this.setData({ [v_name]: event.detail.value })
  },
  addContact: function (event) {
    let v_contact = "volunteer.contact"
    this.setData({ [v_contact]: event.detail.value })
  },
  addLocation: function (event) {
    let v_loc = "volunteer.location"
    this.setData({ [v_loc]: event.detail.value })
  },
  chooseImage: function(){
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log("进入",options)
    this.setData({
      initData:options
    })
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