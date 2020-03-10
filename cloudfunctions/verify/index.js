// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("users找到啦", event._openid)
  return cloud.database().collection("users").where({
    _openid: event._openid
    
  }).get({
    success: function (res) {
      console.log("users找到啦", res.data)

    },

    fail: function (res) {
      console.log("将将将将，新users", err)

    }
  })
    
  
}