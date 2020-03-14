// pages/fillInfo/fillInfo.js
import WxValidate from '../utils/WxValidate.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    age:"",
    sex:"男",
    contact:"",
    location:"",
    isManager:false,
    code:""
  },

  // 提交按钮
  formSubmit:function(e){
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    console.log(this.data.sex)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let that = this
    //验证是否填写了管理者字段
    if(that.data.isManager&&that.data.code!=app.globalData.appid){
      wx.showToast({
        title:"代码错误，无法提交！",
        icon:'none',
        duration:2000
      })
    }else{
      wx.cloud.database().collection("users").add({
        data:{
          name:that.data.name,
          age:that.data.age,
          sex:that.data.sex,
          contact:that.data.contact,
          location:that.data.location,
          isManager:that.data.isManager,
          services:[],
          volunteers:[],
          submissions:[]
        },
        success:function(res){
          console.log("提交成功",res)
          wx.showToast({
            title:"提交成功！",
            icon:'success',
            duration:1000
          })
          //向数据库中添加user,并保存到全局，返回页面
          wx.cloud.database().collection("users").doc(res._id).get({
            success:function(res){
              app.globalData.user = res.data
              wx.navigateBack({
                delta:1
              })
            }
          })
        },
        fail:function(res){

        }
      })
    }
  },


  // 添加字段
  addName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  addAge:function(e){
    this.setData({
      age:e.detail.value
    })
  },
  addContact:function(e){
    this.setData({
      contact:e.detail.value
    })
  },
  addLocation:function(e){
    this.setData({
      location:e.detail.value
    })
  },
  addCode:function(e){
    this.setData({
      code:e.detail.value
    })
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
      age: {
        required: true,
        min: 0
      },
      contact: {
        required: true,
        tel: true
      },
      location: {
        required: true,
        location: true
      }

    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的姓名'
      },
      age: {
        required: '请填写年龄',
        min: '数字需要>=1'
      },
      contact: {
        required: '请填写手机号',
        tel: '请填写正确的手机号（11位）'
      },
      location: {
        required: '请填写楼号',
        location: '楼号填写格式不正确'
      }

    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  // 单选按钮监听事件
  sex_radioChange:function(event){
    let result = event.detail.value
    this.setData({
      sex:result
    })
  },


  manager_radioChange:function(event){
    let result = event.detail.value
    if(result=="true"){
      this.setData({
        isManager:true
      })
    }else{
      this.setData({
        isManager:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()//验证规则函数
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