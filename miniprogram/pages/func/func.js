// pages/func/func.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFileId:"",
    videoFileId:""
  },
  // 文件上传功能
  uploadImage:function(){
    let that = this
    console.log("文件上传")
    // 图片选择
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        let timestamp = (new Date()).valueOf() // 时间戳
        wx.cloud.uploadFile({
          cloudPath: timestamp+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            console.log("文件上传成功")
            that.setData({imageFileId:res.fileID})
            // 上传成功后会获得文件唯一标识符，即文件 ID，后续操作(如回显)都基于文件 ID 而不是 URL
          },
          fail: console.error
        })
      }
    })
  },

  // 视频上传功能
  uploadVideo:function(){
    let that = this
    // 选择视频
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,   //最长时长 单位 s 
      camera: 'back',
      success(res) {
        console.log("选择视频成功",res.tempFilePath)
        wx.cloud.uploadFile({
          cloudPath:  'video.mp4', // 上传至云端的路径
          filePath: res.tempFilePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            console.log("文件视频成功")
            that.setData({imageFileId:res.fileID})
            // 上传成功后会获得文件唯一标识符，即文件 ID，后续操作(如回显)都基于文件 ID 而不是 URL
          },
          fail: console.error
        })
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