// pages//logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fuwu: {
      author: '',
      contact: '',
      location: ''
    },
    files: [],
    idx: '',
    applyList: [
      { Item_id: "01", Item_Name: "是" },
        { Item_id: "02", Item_Name: "否" }]
  },
  selectApply: function (e) {
    let id = e.target.dataset.id
    this.setData({
      idx: id,
    })
  },
  // 获得输入
  addName: function (event) {
    let v_author = "fuwu.author"
    this.setData({ [v_author]: event.detail.value })
  },
  addContact: function (event) {
    let v_contact = "fuwu.contact"
    this.setData({ [v_contact]: event.detail.value })
  },
  addLocation: function (event) {
    let v_loc = "fuwu.location"
    this.setData({ [v_loc]: event.detail.value })
  },
  openSuccess: function () {
    wx.navigateTo({
      url: "../msg_success/msg_success"
    })
  },
  //选择图片
  chooseImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认最多1张图片
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePath
        })
      }
    })
  },
  //预览图片
  PreviewImg: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    //console.log(that.data.tempFilePaths[index]);
    //console.log(that.data.tempFilePaths);
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
    })
  },
  //长按删除图片
  DeleteImg: function (e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          //console.log('点击确定了');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          //console.log('点击取消了');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    
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