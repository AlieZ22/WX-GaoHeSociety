// pages/shenhe_zhiyuan/shenhe_zhiyuan.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hezhiyuan_id:"",
    navState:0,
    btnState: true,
    done_volulist:[],       // 已审核的志愿者
    notDone_volulist:[]     // 未审核的志愿者
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
  //选择按钮
  btnSwitch: function () {
    console.log(this.data.btnState)
    let index = this.data.btnState;
    if(index){
      this.setData({
        btnState: false,
      })
    }else{
      this.setData({
        btnState:true,
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      hezhiyuan_id:options._id
    })
    // 根据hezhiyuan_id查数据库
    db.collection("hezhiyuan").doc(that.data.hezhiyuan_id).get({
      success:function(res){
        let volunteers = res.data.volunteers
        let len = volunteers.length
        for(let i=0;i<len;i++){
          db.collection("hezhiyuan_volunteer").doc(volunteers[i]).get({
            success:function(res){
              let volunteer = res.data
              if(volunteer.state==0){       // 待审核
                that.setData({
                  notDone_volulist:that.data.notDone_volulist.concat(volunteer)
                })
              }else if(volunteer.state==1){    // 已审核
                that.setData({
                  done_volulist:that.data.done_volulist.concat(volunteer)
                })
              }else{}             // state==-1 已完成，暂不处理
            }
          })
        }
      }
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