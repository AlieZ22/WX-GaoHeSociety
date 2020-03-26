// miniprogram/pages/Xinxishouji/Xinxishouji.js
import WxValidate from '../utils/WxValidate.js'
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.initValidate()//验证规则函数
  },

  house1: function (e) {
    this.setData({
      house: e.detail.value
    })
  },

  pro_name1: function (e) {
    this.setData({
      pro_name: e.detail.value
    })
  },

  edu1: function (e) {
    this.setData({
      edu: e.detail.value
    })
  },

  edu_11: function (e) {
    this.setData({
      edu_1: e.detail.value
    })
  },

  edu_21: function (e) {
    this.setData({
      edu_2: e.detail.value
    })
  },

  edu_31: function (e) {
    this.setData({
      edu_3: e.detail.value
    })
  },
  political1: function (e) {
    this.setData({
      political: e.detail.value
    })
  },
  political_11: function (e) {
    this.setData({
      political_1: e.detail.value
    })
  },
  political_21: function (e) {
    this.setData({
      political_2: e.detail.value
    })
  },
  political_31: function (e) {
    this.setData({
      political_3: e.detail.value
    })
  },
  contact1: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  buy_time1: function (e) {
    this.setData({
      buy_time: e.detail.value
    })
  },

  housenum1: function (e) {
    this.setData({
      housenum: e.detail.value
    })
  },

  l_num1: function (e) {
    this.setData({
      l_num: e.detail.value
    })
  },

  owner_name1: function (e) {
    this.setData({
      owner_name: e.detail.value
    })
  },

  sex1: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },

  nation1: function (e) {
    this.setData({
      nation: e.detail.value
    })
  },

  id_num1: function (e) {
    this.setData({
      id_num: e.detail.value
    })
  },

  phone_num1: function (e) {
    this.setData({
      phone_num: e.detail.value
    })
  },

  ephone_num1: function (e) {
    this.setData({
      ephone_num: e.detail.value
    })
  },

  m_date1: function (e) {
    this.setData({
      m_date: e.detail.value
    })
  }, 

  area1: function (e) {
    this.setData({
      area: e.detail.value
    })
  }, 

  job1: function (e) {
    this.setData({
      job: e.detail.value
    })
  }, 

  name_11: function (e) {
    this.setData({
      name_1: e.detail.value
    })
  }, 

  sex_11: function (e) {
    this.setData({
      sex_1: e.detail.value
    })
  }, 

  nation_11: function (e) {
    this.setData({
      nation_1: e.detail.value
    })
  }, 

  id_num_11: function (e) {
    this.setData({
      id_num_1: e.detail.value
    })
  }, 

  area_11: function (e) {
    this.setData({
      area_1: e.detail.value
    })
  }, 

  job_11: function (e) {
    this.setData({
      job_1: e.detail.value
    })
  }, 

  name_21: function (e) {
    this.setData({
      name_2: e.detail.value
    })
  }, 
  sex_21: function (e) {
    this.setData({
      sex_2: e.detail.value
    })
  },
   nation_21: function (e) {
    this.setData({
      nation_2: e.detail.value
    })
  }, 
  id_num_21: function (e) {
    this.setData({
      id_num_2: e.detail.value
    })
  }, 
  area_21: function (e) {
    this.setData({
      area_2: e.detail.value
    })
  }, 
  job_21: function (e) {
    this.setData({
      job_2: e.detail.value
    })
  }, 
  name_31: function (e) {
    this.setData({
      name_3: e.detail.value
    })
  }, 
  sex_31: function (e) {
    this.setData({
      sex_3: e.detail.value
    })
  }, 
  nation_31: function (e) {
    this.setData({
      nation_3: e.detail.value
    })
  }, 
  id_num_31: function (e) {
    this.setData({
      id_num_3: e.detail.value
    })
  }, 
  area_31: function (e) {
    this.setData({
      area_3: e.detail.value
    })
  }, 
  job_31: function (e) {
    this.setData({
      job_3: e.detail.value
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
    db.collection("hexinxi_info").add({
        data: {
          house: that.data.house,
          pro_name:that.data.pro_name,
          contact: that.data.contact,
          buy_time: that.data.buy_time,
          housenum:that.data.housenum,
          l_num:that.data.l_num,
          owner_name:that.data.owner_name,
          sex:that.data.sex,
          nation:that.data.nation,
          id_num:that.data.id_num,
          phone_num:that.data.phone_num,
          ephone_num:that.data.ephone_num,
          edu:that.data.edu,
          political:that.data.political,
          m_date:that.data.m_date,
          area:that.data.area,
          job:that.data.job,
          name_1:that.data.name_1,
          sex_1:that.data.sex_1,
          nation_1:that.data.nation_1,
          id_num_1:that.data.id_num_1,
          edu_1:that.data.edu_1,
          political_1:that.data.political_1,
          area_1:that.data.area_1,
          job_1:that.data.job_1,
          name_2: that.data.name_2,
          sex_2: that.data.sex_2,
          nation_2: that.data.nation_2,
          id_num_2: that.data.id_num_2,
          edu_2: that.data.edu_2,
          political_2: that.data.political_2,
          area_2: that.data.area_2,
          job_2: that.data.job_2,
          name_3: that.data.name_3,
          sex_3: that.data.sex_3,
          nation_3: that.data.nation_3,
          id_num_3: that.data.id_num_3,
          edu_3: that.data.edu_3,
          political_3: that.data.political_3,
          area_3: that.data.area_3,
          job_3: that.data.job_3
        },
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '上报成功',
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          // 返回页面，清除缓存
          that.setData({
            step: 1
          })
        },
        fail: function (res) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 1];
          console.log("发布失败", res)
          // 上传失败的页面
          wx.showToast({
            title: '上报失败，请重试！',
          })
        }
      })
    
  },
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
      house: {
        required: true,
        minlength: 2
      },
      housenum: {
        required: true,
        minlength:1
      },
      owner_name: {
        required: true,
        minlength: 2
      },
      sex: {
        required: true,
        minlength: 1
      },
      nation: {
        required: true,
        minlength: 2
      },
      id_num: {
        required: true,
        idcard: true
      },
      phone_num:{
        required: true,
        minlength: 11
      },
      edu:{
        required: true,
        minlength: 2
      },
      political:{
        required: true,
        minlength: 2
      },
     area:{
        required: true,
        minlength: 10
      },
      job:{
        required: true,
        minlength: 1
      }
    }
    const messages = {
      house: {
        required: '请填写住房性质',
        minlength: '请按提示输入正确的房产性质'
      },
      edu: {
        required: '请填写户主文化程度',
        minlength:'小学/初中/高中/本科/硕士/博士'
      },
      housenum: {
       required: '请填写门牌号'
      },
      owner_name: {
        required: '请填写户主姓名',
        minlength: '请正确填写户主姓名（至少两个字）'
      },
      sex: {
        required: '请填写户主性别',
      },
      nation: {
        required: '请填写户主民族'
      },
      id_num: {
        required: '请填写户主身份证号',
        idcard: '请输入18位的有效身份证。'
      },
      phone_num: {
        required: '请填写户主手机号',
        tel: '请输入11位的手机号码。'
      },
      political: {
        required: '请填写户主政治面貌',
        minlength: '群众/中共党员'
      },
      area: {
        required: '请填写户主户籍所在地',
        minlength: '省/市/区/家庭详细住址'
      },
      job: {
        required: '请填写户主职业',
        minlength:'工作单位/学校/个体经营/退休/无'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  cancelJoin: function () {
    this.setData({
      step: 1
    })
  },
  onPullDownRefresh: function () {
    this.updateData()
  }
})