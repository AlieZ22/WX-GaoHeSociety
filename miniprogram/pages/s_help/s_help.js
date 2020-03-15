// pages//logs/logs.js
import WxValidate from '../utils/WxValidate.js'
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

  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let that = this      // 处理异步请求
    // 要看是否超过报名该合服务的人数
    DB.collection("hefuwu").doc(that.data.initData._id).get({
      success:function(res){
        let currentNum = res.data.volunteers.length
        let maxNum = res.data.maxVoluNum
        if(currentNum<maxNum){
          console.log("可以添加志愿者")
          // 先将志愿者传到volunteers表中
          DB.collection("hefuwu_volunteer").add({
            data:{
              contact:that.data.volunteer.contact,
              name:that.data.volunteer.name,
              location:that.data.volunteer.location,
              hefuwu_id:that.data.initData._id,
              state:'0'
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

                  wx.showModal({
                    title:"提示",
                    content:"报名成功！",
                    success:function(res){
                      wx.navigateTo({
                        url: "../services/services"
                      })
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
        }else{
          wx.showModal({
            title:"提示",
            content:"报名人数达到上限，报名失败！",
            success:function(res){
              wx.navigateTo({
                url: "../services/services"
              })
            }
          })
        }
      }
    })
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
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log("进入",options)
    this.setData({
      initData:options
    })
    this.initValidate()//验证规则函数
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },

      contact: {
        required: true,
        tel: true
      },
      location: {
        required: true,
        minlength: 2
      }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的姓名'
      },
      contact: {
        required: '请填写手机号',
        tel: '请填写正确的手机号（11位）'
      },
      locaiton: {
        required: '请填写地址',
        minlength: '请输入正确的地址'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
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