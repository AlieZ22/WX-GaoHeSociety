// pages/shenhe_fuwu/shenhe_fuwu.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hefuwu_id:"",
    navState:0,
    done_volulist: [],            // 审核的合服务志愿者
    notDone_volulist: []         // 未审核的合服务志愿者
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

  // 志愿者控制的两个按钮事件
  // 审核通过
  passBtn: function (e) {
    let that = this
    console.log(e.currentTarget.dataset.id)
    let volunteerId = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: "change_volunteerState",
      data: {
        collection: "hefuwu_volunteer",
        volunteer_id: volunteerId,
        state: 1
      },
      success: function (res) {
        console.log(res)
        that.setData({
          done_volulist: [],
          notDone_volulist: []
        })
        that.updateVoluList()
      }
    })
  },
  // 审核不通过
  cancelBtn: function (e) {
    let that = this
    let volunteerId = e.currentTarget.dataset.id
    wx.showModal({
      title: "提示",
      content: "确定要撤销该志愿者的申请吗？",
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "change_volunteerState",
            data: {
              collection: "hefuwu_volunteer",
              volunteer_id: volunteerId,
              state: -1         // 志愿者状态改为不通过
            },
            success: function (res) {
              that.setData({
                done_volulist: [],
                notDone_volulist: []
              })
              // 修改合志愿的volunteers数组，把这个_id对应的志愿者删掉，curr减1
              db.collection("hefuwu").doc(that.data.hefuwu_id).get({
                success: function (res) {
                  let volunteers = res.data.volunteers
                  for (let i = 0; i < volunteers.length; i++) {
                    if (volunteers[i] == volunteerId) {
                      volunteers.splice(i, 1)
                    }
                  }
                  console.log(volunteers)
                  wx.cloud.callFunction({
                    name: "change_hefuwuVolu",
                    data: {
                      hefuwu_id: that.data.hefuwu_id,
                      newVolunteers: volunteers
                    },
                    success: function (res) {
                      console.log("修改合志愿表成功")
                      that.updateVoluList()
                    },
                    fail: function (res) {
                      console.log("修改合志愿表失败", res)
                    }
                  })
                }
              })
            }
          })
        } else { }
      }
    })
  },

  updateVoluList: function () {
    let that = this
    // 根据hefuwu_id查数据库
    db.collection("hefuwu").doc(that.data.hefuwu_id).get({
      success: function (res) {
        let volunteers = res.data.volunteers
        let len = volunteers.length
        for (let i = 0; i < len; i++) {
          db.collection("hefuwu_volunteer").doc(volunteers[i]).get({
            success: function (res) {
              let volunteer = res.data
              if (volunteer.state == 0) {       // 待审核
                that.setData({
                  notDone_volulist: that.data.notDone_volulist.concat(volunteer)
                })
              } else if (volunteer.state == 1) {    // 已审核
                that.setData({
                  done_volulist: that.data.done_volulist.concat(volunteer)
                })
              } else { }             // state==-1 已完成，暂不处理
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({
      hefuwu_id:options._id,
      done_volulist: [],
      notDone_volulist: []
    })
    that.updateVoluList()
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