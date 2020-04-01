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
  canjun1: function (e) {
    this.setData({
      canjun: e.detail.value
    })
  },
  canjun_11: function (e) {
    this.setData({
      canjun_1: e.detail.value
    })
  },
  canjun_21: function (e) {
    this.setData({
      canjun_2: e.detail.value
    })
  },
  canjun_31: function (e) {
    this.setData({
      canjun_3: e.detail.value
    })
  },
  b_canjun_31: function (e) {
    this.setData({
      b_canjun_3: e.detail.value
    })
  },
  b_canjun_21: function (e) {
    this.setData({
      b_canjun_2: e.detail.value
    })
  },
  b_canjun_11: function (e) {
    this.setData({
      b_canjun_1: e.detail.value
    })
  },
  b_canjun1: function (e) {
    this.setData({
      b_canjun_3: e.detail.value
    })
  },
  r_time1: function (e) {
    this.setData({
      r_time: e.detail.value
    })
  },
  r_time_11: function (e) {
    this.setData({
      r_time_1: e.detail.value
    })
  },
  r_time_21: function (e) {
    this.setData({
      r_time_2: e.detail.value
    })
  },
  r_time_31: function (e) {
    this.setData({
      r_time_3: e.detail.value
    })
  },
  t_time_31: function (e) {
    this.setData({
      t_time_3: e.detail.value
    })
  },
  t_time1: function (e) {
    this.setData({
      t_time: e.detail.value
    })
  },
  t_time_11: function (e) {
    this.setData({
      t_time_1: e.detail.value
    })
  },
  t_time_21: function (e) {
    this.setData({
      t_time_2: e.detail.value
    })
  },
  f_time_31: function (e) {
    this.setData({
      f_time_3: e.detail.value
    })
  },
  f_time1: function (e) {
    this.setData({
      f_time: e.detail.value
    })
  },
  f_time_11: function (e) {
    this.setData({
      f_time_1: e.detail.value
    })
  },
  f_time_21: function (e) {
    this.setData({
      f_time_2: e.detail.value
    })
  },
  jiuye_31: function (e) {
    this.setData({
      jiuye_3: e.detail.value
    })
  },
  jiuye1: function (e) {
    this.setData({
      jiuye: e.detail.value
    })
  },
  jiuye_11: function (e) {
    this.setData({
      jiuye_1: e.detail.value
    })
  },
  jiuye_21: function (e) {
    this.setData({
      jiuye_2: e.detail.value
    })
  },
  shangcan_31: function (e) {
    this.setData({
      shangcan_3: e.detail.value
    })
  },
  shangcan1: function (e) {
    this.setData({
      shangcan: e.detail.value
    })
  },
  shangcan_11: function (e) {
    this.setData({
      shangcan_1: e.detail.value
    })
  },
  shangcan_21: function (e) {
    this.setData({
      shangcan_2: e.detail.value
    })
  },
  youzheng_31: function (e) {
    this.setData({
      youzheng_3: e.detail.value
    })
  },
  youzheng1: function (e) {
    this.setData({
      youzheng: e.detail.value
    })
  },
  youzheng_11: function (e) {
    this.setData({
      youzheng_1: e.detail.value
    })
  },
  youzheng_21: function (e) {
    this.setData({
      youzheng_2: e.detail.value
    })
  },
  dengji_31: function (e) {
    this.setData({
      dengji_3: e.detail.value
    })
  },
  dengji1: function (e) {
    this.setData({
      dengji: e.detail.value
    })
  },
  dengji_11: function (e) {
    this.setData({
      dengji_1: e.detail.value
    })
  },
  dengji_21: function (e) {
    this.setData({
      dengji_2: e.detail.value
    })
  },
  b_political_31: function (e) {
    this.setData({
      b_political_3: e.detail.value
    })
  },
  b_political_11: function (e) {
    this.setData({
      b_political_1: e.detail.value
    })
  },
  b_political_21: function (e) {
    this.setData({
      b_political_2: e.detail.value
    })
  },
  time_31: function (e) {
    this.setData({
      time_3: e.detail.value
    })
  },
  time_11: function (e) {
    this.setData({
      time_1: e.detail.value
    })
  },
  time_21: function (e) {
    this.setData({
      time_2: e.detail.value
    })
  },
  guoji_31: function (e) {
    this.setData({
      guoji_3: e.detail.value
    })
  },
  guoji_11: function (e) {
    this.setData({
      guoji_1: e.detail.value
    })
  },
  guoji_21: function (e) {
    this.setData({
      guoji_2: e.detail.value
    })
  },
  guojia_31: function (e) {
    this.setData({
      guoji_3: e.detail.value
    })
  },
  guojia_11: function (e) {
    this.setData({
      guoji_1: e.detail.value
    })
  },
  guojia_21: function (e) {
    this.setData({
      guojia_2: e.detail.value
    })
  },
  reason_31: function (e) {
    this.setData({
      guoji_3: e.detail.value
    })
  },
  reason_11: function (e) {
    this.setData({
      guoji_1: e.detail.value
    })
  },
  reason_21: function (e) {
    this.setData({
      reason_2: e.detail.value
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
        pro_name: that.data.pro_name,
        contact: that.data.contact,
        buy_time: that.data.buy_time,
        housenum: that.data.housenum,
        l_num: that.data.l_num,
        owner_name: that.data.owner_name,
        sex: that.data.sex,
        nation: that.data.nation,
        id_num: that.data.id_num,
        phone_num: that.data.phone_num,
        ephone_num: that.data.ephone_num,
        edu: that.data.edu,
        political: that.data.political,
        m_date: that.data.m_date,
        area: that.data.area,
        job: that.data.job,
        name_1: that.data.name_1,
        sex_1: that.data.sex_1,
        nation_1: that.data.nation_1,
        id_num_1: that.data.id_num_1,
        edu_1: that.data.edu_1,
        political_1: that.data.political_1,
        area_1: that.data.area_1,
        job_1: that.data.job_1,
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
        zongjiao_3: that.data.zongjiao_3,
        zongjiao_2: that.data.zongjiao_2,
        zongjiao_1: that.data.zongjiao_1,
        zongjiao: that.data.zongjiao,
        canjun_3: that.data.canjun_3,
        canjun_2: that.data.canjun_2,
        canjun_1: that.data.canjun_1,
        canjun: that.data.canjun,
        b_canjun_3: that.data.b_canjun_3,
        b_canjun_2: that.data.b_canjun_2,
        b_canjun_1: that.data.b_canjun_1,
        b_canjun: that.data.b_canjun,
        r_time_3: that.data.r_time_3,
        r_time_2: that.data.r_time_2,
        r_time_1: that.data.r_time_1,
        r_time: that.data.r_time,
        t_time_3: that.data.t_time_3,
        t_time_2: that.data.t_time_2,
        t_time_1: that.data.t_time_1,
        t_time: that.data.t_time,
        f_time_3: that.data.f_time_3,
        f_time_2: that.data.f_time_2,
        f_time_1: that.data.f_time_1,
        f_time: that.data.f_time,
        jiuye_3: that.data.jiuye_3,
        jiuye_2: that.data.jiuye_2,
        jiuye_1: that.data.jiuye_1,
        jiuye: that.data.jiuye,
        shangcan_3: that.data.shangcan_3,
        shangcan_2: that.data.shangcan_2,
        shangcan_1: that.data.shangcan_1,
        shangcan: that.data.shangcan,
        youzheng_3: that.data.youzheng_3,
        youzheng_2: that.data.youzheng_2,
        youzheng_1: that.data.youzheng_1,
        youzheng: that.data.youzheng,
        dengji_3: that.data.dengji_3,
        dengji_2: that.data.dengji_2,
        dengji_1: that.data.dengji_1,
        dengji: that.data.dengji,
        guoji_3: that.data.guoji_3,
        guoji_2: that.data.guoji_2,
        guoji_1: that.data.guoji_1,
        b_political_3: that.data.b_political_3,
        b_political_2: that.data.b_political_2,
        b_political_1: that.data.b_political_1,
        guojia_3: that.data.guojia_3,
        guojia_2: that.data.guojia_2,
        guojia_1: that.data.guojia_1,
        time_3: that.data.time_3,
        time_2: that.data.time_2,
        time_1: that.data.time_1,
        reason_3: that.data.reason_3,
        reason_2: that.data.reason_2,
        reason_1: that.data.reason_1,
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
        minlength: 1
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
      phone_num: {
        required: true,
        minlength: 11
      },
      edu: {
        required: true,
        minlength: 2
      },
      political: {
        required: true,
        minlength: 2
      },
      area: {
        required: true,
        minlength: 10
      },
      job: {
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
        minlength: '小学/初中/高中/本科/硕士/博士'
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
        minlength: '工作单位/学校/个体经营/退休/无'
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