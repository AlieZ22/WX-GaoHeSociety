// pages/xunxi_fuwu/xunxi_fuwu.js
const app = getApp()

//1、引用数据库


Page({
  data: {
    my_info: {},
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    currentAct_id: "",
    hezhiyuanlist: [],
    user_id: '',
    ne: app.globalData.ne
  },


  onLoad: function (options) {
    var that = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'zzmine-3cgx9'
    })

    if (app.globalData._openid) {
      that.setData({
        openid: app.globalData._openid,
        user_id: app.globalData._id
      })
      // 根据_openid填充my_info
      db.collection("users").where({
        _openid: that.data.openid
      }).get({
        success: function (res) {
          console.log("获取用户", res)
          that.setData({ my_info: res.data[0] })
        },
        fail: function (res) {
          console.log("获取用户失败", res)
        }
      })
    }

    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('hezhiyuan').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        that.setData({
          ne: res.data
        })
      }
    })



    if (app.globalData._openid) {
      //console.log("app.globalData.user._id:", app.globalData.user._id)
      that.setData({
        act_id: that.data.currentAct_id,
        //user_id: that.data._id
      })
      //let that = this
      // 根据_openid填充my_info
      db.collection('users').doc(app.globalData.user._id).get({
        success: function (res) {
          let len = res.data.volunteers.length
          //console.log("currentAct_id:", res.data.volunteers.length)

          for (let i = 0; i < len; i++) {
            //console.log("act_id:", vol_act_id)
            let vol_act_id = res.data.volunteers[i]

            db.collection("hezhiyuan").doc(vol_act_id).get({
              success: function (res) {
                console.log("获this is取用户", res.data)
                that.setData({
                  hezhiyuanlist: that.data.hezhiyuanlist.concat(res.data)
                })
                console.log("test", hezhiyuanlist)
              }
            })
          }
        },
        fail: function (res) {
          console.log("获取用户失败", res)
        }
      })
    }

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
  maxVoluNum1: function (e) {
    this.setData({
      maxVoluNum: e.detail.value
    })
  },


  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('hezhiyuan').add({
      data: {
        count: 1,
        serviceContent: this.data.serviceContent,
        serviceTime: this.data.serviceTime,
        statement: this.data.statement,
        maxVoluNum: this.data.maxVoluNum,
        imagePath: this.data.imagePath
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          serviceContente: this.data.serviceContent,
          serviceTime: this.data.serviceTime,
          statement: this.data.statement,
          maxVoluNum: this.data.maxVoluNum,
          imagePath: this.data.imagePath
        })
        wx.showToast({
          title: '发布成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '发布失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  openSuccess: function () {
    wx.navigateTo({
      url: "../msg_success/msg_success"
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

  uploadImage: function () {
    let that = this
    console.log("文件上传")
    // 图片选择
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        let timestamp = (new Date()).valueOf() // 时间戳
        wx.cloud.uploadFile({
          cloudPath: timestamp + '.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          //tmp: cloudPath,
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            console.log("文件上传成功")
            that.setData({ imageFileId: res.fileID })
            that.setData({ imagePath: res.fileID })
            // 上传成功后会获得文件唯一标识符，即文件 ID，后续操作(如回显)都基于文件 ID 而不是 URL
          },
          fail: console.error
        })
      }
    })
  },
  imagePath: function (e) {
    wx.cloud.uploadFile({
      imagePath: e.detail.cloudPath
    })
  },
})
