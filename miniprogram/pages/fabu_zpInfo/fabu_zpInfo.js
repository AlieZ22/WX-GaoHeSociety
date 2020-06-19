// miniprogram/pages/buy_house/buy_house.js
import WxValidate from '../utils/WxValidate.js'
const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    step: 1,
    files: [],    // 临时图片文件
    fileUrl: [],       // 存放上传成功的图片的fileID
    ne: app.globalData.ne
  },

  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.initValidate()//验证规则函数
  },


  name1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  contact1: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  people1: function (e) {
    this.setData({
      people: e.detail.value
    })
  },
  type1: function (e) {
    this.setData({
      type: e.detail.value
    })
  },
  infor1: function (e) {
    this.setData({
      infor: e.detail.value
    })
  },

  formSubmit: function (e) {
    this.setData({
      disable: true
    })
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
    for (let i = 0; i < n; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: "maifang/" + app.globalData._openid + "/" + timestamp + "_" + i + ".png",
          filePath: that.data.files[i],
          success: res => {
            // 返回文件ID
            reslove()   // 该图片上传结束,释放锁资源
            that.setData({
              fileUrl: that.data.fileUrl.concat(res.fileID)
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
      db.collection("hejob").add({
        data: {
          name: that.data.name,
          people:that.data.people,
          contact: that.data.contact,
          type:that.data.type,
          treatment: that.data.infor,
          url: that.data.fileUrl
        },
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '发布成功',
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          // 返回页面，清除缓存
          that.setData({
            step: 1,
            name: "",
            people: "",
            contact: "",
            type: "",
            treatment: "",
            url: ""
          })
          that.updateData()
        },
        fail: function (res) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 1];
          console.log("发布失败", res)
          // 上传失败的页面
          wx.showToast({
            title: '发布失败，请重试！',
          })
        }
      })
    })
  },

  chooseImage: function () {
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
  cancelJoin: function () {
    this.setData({
      step: 1
    })
  },
  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
    this.setData({
      disable: false
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
      infor: {
        required: true,
        minlength: 1
      }

    }
    const messages = {
      name: {
        required: '请填写企业姓名',
        minlength: '请输入正确的企业姓名'
      },
      contact: {
        required: '请填写手机号',
        tel: '请填写正确的手机号（11位）'
      },
      infor: {
        required: '请填写企业待遇',
        infor: '请详细描述企业待遇'
      }

    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.updateData()
  },

  nextStep: function (event) {
    console.log(event)
    this.setData({
      step: 2
    })
  },

  goHome: function () {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
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