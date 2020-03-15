// pages/xunxi_zhiyuan/xunxi_zhiyuan.js
const app = getApp()
const db = wx.cloud.database()
import WxValidate from '../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hezhiyuanlist: [],   // 作为居民的合志愿列表   
    super_zhiyuanlist:[],  // 作为管理者的合志愿列表
    my_info:null,
    navState:0,
  },

  //监听滑块
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },
  //点击导航
  navSwitch: function (e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },

  // 审核
  shenheBtn:function(e){
    console.log(e)
    let zhiyuan_id = e.currentTarget.dataset.index
    wx.navigateTo({
      url:'../shenhe_zhiyuan/shenhe_zhiyuan?_id='+zhiyuan_id
    })
  },

  // 撤销
  chexiaoBtn:function(e){
    let that = this
    let zhiyuan_id = e.currentTarget.dataset.index
    db.collection("hezhiyuan").doc(zhiyuan_id).get({
      success:function(res){
        let len = res.data.volunteers.length
        if(len==0){
          wx.showModal({
            title:"提示",
            content:"确定撤销这个服务吗？",
            success:function(res){
              if(res.confirm){
                // 删除
                db.collection("hezhiyuan").doc(zhiyuan_id).remove({
                  success:function(res){
                    wx.showToast({
                      title:"删除成功",
                      icon:"success",
                      duration:1500
                    })
                    that.updateData()
                  }
                })
              }
            }
          })
        }else{
          console.log(res)
          wx.showModal({
            title:"提示",
            content:"确定撤销这个服务吗？当前报名的志愿者会被取消",
            success:function(res){
              if(res.confirm){
                // 删除参加这个hezhiyuan的志愿者
                for(let i=0;i<len;i++){
                  db.collection("hezhiyuan_volunteer").doc(res.data.volunteers[i]).remove({})
                }
                db.collection("hezhiyuan").doc(zhiyuan_id).remove({
                  success:function(res){
                    wx.showToast({
                      title:"删除成功",
                      icon:"success",
                      duration:1500
                    })
                    that.updateData()
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  //生成随机数
  createNonceStr: function () {
    var str = "cloud://zzmine-3cgx9.7a7a-zzmine-3cgx9-1301387315/ui/pic",
      // 随机产生
      range = Math.round(Math.random() * (50)) + 1;
    str = str + range + ".png";
    return str;
  },
  // 发布
  formSubmit:function(e){
    this.initValidate()//验证规则函数
    let that = this
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    var imgPath = this.createNonceStr();
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    let formdata = e.detail.value
    db.collection("hezhiyuan").add({
      data:{
        serviceContent:formdata.serviceContent,
        serviceTime:formdata.serviceTime,
        maxVoluNum:formdata.maxVoluNum,
        contact:formdata.contact,
        statement:formdata.statement,
        currentVoluNum:0,
        volunteers:[],
        imagePath: imgPath
      },
      success:function(res){
        wx.showToast({
          title:"发布成功",
          icon:"success",
          duration:1500
        })
        that.setData({
          navState:0
        })
        this.updateData()
      }
    })
  },

  updateData:function(){
    let that = this
    if(!that.data.my_info.isManager){                // 如果是居民
      db.collection('users').doc(that.data.my_info._id).get({
        success: function (res) {
          let len = res.data.volunteers.length
          for (let i = 0; i < len; i++) {
            let vol_act_id = res.data.volunteers[i]
            db.collection("hezhiyuan").doc(vol_act_id).get({
              success: function (res) {
                that.setData({
                  hezhiyuanlist: that.data.hezhiyuanlist.concat(res.data)
                })
                
              }
            })
          }
         
        },
        fail: function (res) {
          console.log("获取用户失败", res)
        }
      })
    }else{                                    // 如果是管理者
      wx.cloud.callFunction({
        name:"get_zhiyuandata",
        success:function(res){    
          that.setData({
            super_zhiyuanlist: res.result.data
          })
        }
      })

    }
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
      serviceContent: {
        required: true,
        minlength: 2,
        maxlength:12
      },
      serviceTime: {
        required: true,
      },
      maxVoluNum:{
        required:true,
        min:1
      },
      contact: {
        required: true,
        tel: true
      },
      statement: {
        required: true,
        minlength:2
      }

    }
    const messages = {
      serviceContent: {
        required: '请填写服务主题',
        minlength: '长度至少为2',
        maxlength:'不得超过12个字符'
      },
      serviceTime: {
        required: "请填写服务时间",
      },
      maxVoluNum:{
        required:"请填写人数上限",
        min:"人数上限>=1"
      },
      contact: {
        required: '请填写手机号',
        tel: '请填写正确的手机号（11位）'
      },
      statement: {
        required: "请填写详细说明",
        minlength:"详细说明至少要有2个字符"
      }

    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      my_info:app.globalData.user
    })
    console.log(that.data.my_info)
   
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
    this.updateData()
    
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
    this.updateData()
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