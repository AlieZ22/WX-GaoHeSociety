const app = getApp()
const db = wx.cloud.database()
import WxValidate from '../utils/WxValidate.js'
// pages//logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],    // 临时图片文件
    fileUrl : [],       // 存放上传成功的图片的fileID
    author:"",
    title:"",
    originality:"",
    desc:""
  },
  // 获得输入内容
  getAuthor:function(res){
    this.setData({
      author:res.detail.value
    })
  },
  getTitle:function(res){
    this.setData({
      title:res.detail.value
    })
  },
  getOriginality:function(res){
    this.setData({
      originality:res.detail.value
    })
  },
  getDesc:function(res){
    this.setData({
      desc:res.detail.value
    })
  },


  formSubmit: function (e){
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let that = this
    // 上传多张图片
    let promiseArr = []    // 同步锁序列
    let n = that.data.files.length
    let timestamp = (new Date()).valueOf()
    for(let i=0;i<n;i++){
      promiseArr.push(new Promise((reslove,reject)=>{
        wx.cloud.uploadFile({
          cloudPath: "hemeihao/" + app.globalData._openid + "/" + timestamp + "_" + i + ".png",
          filePath: that.data.files[i],
          success: res => {
            // 返回文件ID
            reslove()   // 该图片上传结束,释放锁资源
            that.setData({
              fileUrl:that.data.fileUrl.concat(res.fileID)
            })
          }
        })
      }));
    }
    // 同步操作，等待所有的fileID传输完
    Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
      console.log("图片上传完成后再执行")
      //获取当前时间
      console.log(new Date())    // 这个日期需要格式化！！
      let currentTime = new Date()
      // 向数据库中添加合美好记录
      db.collection("hemeihao").add({
        data:{
          author:that.data.author,
          createTime: currentTime,
          title:that.data.title,
          originality:that.data.originality,
          desc:that.data.desc,
          state:'0',
          fileUrl:that.data.fileUrl
        },
        success:function(res){
          console.log("合美好添加成功",res)
          // 上传成功的页面
          // 向users表中插入合美好_id
          let meihao_id = res._id
          wx.cloud.callFunction({
            name:"add_userSubmissions",
            data:{
              _openid: app.globalData._openid,
              hemeihaoId:meihao_id
            },
            success:function(res){
              console.log("用户合美好字段添加成功")
            },
            fail:function(res){
              console.log("用户合美好字段添加失败")
            }
          })
        },
        fail:function(res){
          console.log("合美好添加失败",res)
          // 上传失败的页面
        }
      })
      // 下面这个跳转再添加了上传失败的页面后可以删掉
      wx.navigateTo({
        url: "../msg_success/msg_success?page=share"
      })
    })
    
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
      author: {
        required: true,
        minlength: 2
      },
      title: {
        required: true,
        minlength: 2
      },
      originality: {
        required: true,
        minlength: 2
      },
      desc: {
        required: true,
        minlength: 2
      }

    }
    const messages = {
      author: {
        required: '请填写姓名',
        minlength: '请输入正确的姓名'
      },
      title: {
        required: '请填写作品名称',
        minlength: '作品名称至少为两个字符'
      },
      originality: {
        required: '请填写创意来源',
        minlength: '创意来源至少为两个字符'
      },
      desc: {
        required: '请填写作品简介',
        minlength: '作品简介至少为两个字符'
      }

    }
    this.WxValidate = new WxValidate(rules, messages)
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