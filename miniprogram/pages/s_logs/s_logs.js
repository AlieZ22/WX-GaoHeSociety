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
    fuwu: {
      contact: '',
      name: '',
      helpContent: '',
      statement:'',
      time: '',
      state: '2',
      location: '',
      maxVolNum: ''

    },
    initData: {},
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
    // 先将志愿者传到volunteers表中
    DB.collection("hefuwu").add({
      data: {
        contact: this.data.fuwu.contact,
        author: this.data.fuwu.name,
        location: this.data.fuwu.location,
        hefuwu_id: this.data.initData._id,
        state: 0,
        helpContent: this.data.fuwu.helpContent,
        statement: this.data.fuwu.statement,
        time: this.data.fuwu.time,
        maxVolNum: this.data.fuwu.maxVolNum,
        volunteers:[],
        imagePath:''
      },
      success: function (res) {
        console.log("添加服务信息成功", res)
        // 添加服务信息成功，得到volunteers表中该条记录的_id
        // 获取服务信息（这里从数据库中调，为了获取其_id和_openid）
        // 然后调用云函数, 分别修改users表以及hefuwu表中的services, volunteers
        wx.cloud.callFunction({
          name: "add_userServices",
          data: {
            _openid: app.globalData._openid,
            info: res._id,
            way: 0  // 1表示为合服务志愿者（0表示合服务受助者）
          },
          success: function (res) {
            console.log("users表项添加完毕", res)
          }
        })
      },
      fail: function (res) {
        console.log("添加服务信息失败", res)
      }
    })

    wx.navigateTo({
      url: "../msg_success/msg_success?page=services"
    })



  },
  // 获得输入
  addName: function (event) {
    let v_name = "fuwu.name"
    this.setData({ [v_name]: event.detail.value })
  },
  addContact: function (event) {
    let v_contact = "fuwu.contact"
    this.setData({ [v_contact]: event.detail.value })
  },
  addLocation: function (event) {
    let v_loc = "fuwu.location"
    this.setData({ [v_loc]: event.detail.value })
  },
  addHelpContent: function (event) {
    let v_helpContent = "fuwu.helpContent"
    this.setData({ [v_helpContent]: event.detail.value })
  },
  addStatement: function (event) {
    let v_statement = "fuwu.statement"
    this.setData({ [v_statement]: event.detail.value })
  },
  addTime: function (event) {
    let v_time = "fuwu.time"
    this.setData({ [v_time]: event.detail.value })
  },
  addMaxVolNum: function (event) {
    let v_max = "fuwu.maxVolNum"
    this.setData({ [v_max]: event.detail.value })
  },
  addImagePath: function (event) {
    let v_imagePath = "fuwu.imagePath"
    this.setData({ [v_imagePath]: event.detail.value })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      initData: options
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
      },
      helpContent: {
        required: true,
        minlength: 2
      },
      maxVolNum: {
        required: true,
        min: 0
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
      location: {
        required: '请填写楼号',
        minlength: '请输入正确的楼号'
      },
      helpContent: {
        required: '请填写求助内容',
        minlength: '起码输入两字符'
      },
      maxVolNum: {
        required: '请填写需要志愿者的人数',
        min: '数字需要>=1',
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