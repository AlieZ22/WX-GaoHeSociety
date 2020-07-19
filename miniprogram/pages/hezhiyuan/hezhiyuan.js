// pages/hezhiyuan/hezhiyuan.js
import WxValidate from '../utils/WxValidate.js'
const app = getApp()
const db = wx.cloud.database()

Page({

  data: {
    disable: false,      // 防止表单重复提交
    currentAct_id: "",   // 当前选择报名的合志愿活动的id
    step: 1,
    counterId: '',
    queryResult: '',
    ne: app.globalData.ne,
    blank: false,
  },


  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.updateData()
    that.initValidate()//验证规则函数
  },
  updateData: function () {
    let that = this
    db.collection('hezhiyuan').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        that.setData({
          ne: res.data
        })
        if (that.data.ne.length === 0) {
          that.setData({ blank: true })
        }
      },
      fail: res => {
        console.log("小程序获取服务数据失败", res)
      }
    })
  },

  serviceContent1: function (e) {
    this.setData({
      serviceContent: e.detail.value
    })
  },
  serviceTime1: function (e) {
    this.setData({
      serviceTime: e.detail.value
    })
  },
  statement1: function (e) {
    this.setData({
      statement: e.detail.value
    })
  },
  name1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  sex1: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  contact1: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },
  location1: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  formSubmit: function (e) {
    this.setData({
      disable: true
    })
    console.log(e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let that = this
    const db = wx.cloud.database()
    // 可能会出现curr>=max导致添加失败
    db.collection("hezhiyuan").doc(that.data.currentAct_id).get({
      success: function (res) {
        let currentNum = res.data.currentVoluNum
        let maxNum = res.data.maxVoluNum
        if (currentNum < maxNum) {
          db.collection('hezhiyuan_volunteer').add({
            data: {
              state: 0,
              name: that.data.name,
              sex: that.data.sex,   // 性别用单选框
              location: that.data.location,
              contact: that.data.contact,
              act_id: that.data.currentAct_id
            },
            success: res => {
              wx.showLoading({
                title: "提交中..."
              })
              // 在返回结果中会包含新创建的记录的 _id
              that.setData({
                counterId: res._id,         // 合志愿 志愿者的_id
                name: that.data.name,
                sex: that.data.sex,
                contact: that.data.contact,
                location: that.data.location,
              })
              // 在hezhiyuan表中对应合志愿的volunteers加入表项
              wx.cloud.callFunction({
                name: "add_zhiyuanvolunteer",   // 对应合志愿中添加volunteers列表
                data: {
                  volunteer_id: that.data.counterId,
                  hezhiyuanId: that.data.currentAct_id
                },
                success: function (res) {
                  // 在users表中的volunteers加入表项
                  wx.hideLoading()
                  wx.showToast({
                    title: '报名成功',
                  })
                  wx.cloud.callFunction({
                    name: "add_userVolunteers",
                    data: {
                      _openid: app.globalData._openid,
                      info: that.data.currentAct_id    // 某个合志愿的_id
                    },
                    success: function (res) {
                      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                      let prevPage = pages[pages.length - 2];
                      // 返回页面，清除缓存
                      that.setData({
                        step: 1,
                        name: "",
                        sex: "",
                        contact: "",
                        location: ""
                      })
                      that.updateData()
                      console.log("云函数添加志愿者成功", res)
                      console.log("users表项添加完毕", res)
                    }
                  })
                },
                fail: function (res) {
                  console.log("合志愿添加志愿者失败，可能是人数达到上限", res)
                }
              })
              console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '报名失败'
              })
              console.error('[数据库] [新增记录] 失败：', err)
            }
          })
        } else {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 1];
          prevPage.setData({
          })
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            icon: 'none',
            title: '人数已满，感谢您的参与'
          })
          console.log("人数达到上限，报名失败！")
        }
      },
      fail: function (res) {
        console.log("查询合志愿表失败")
      }
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
      sex: {
        required: true,
        minlength: 1
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
      sex: {
        required: '请填写性别',
        minlength: '请输入性别'
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.updateData()
  },

  nextStep: function (event) {
    console.log(event)
    this.setData({
      step: 2,
      currentAct_id: event.currentTarget.dataset.index
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
  }

})