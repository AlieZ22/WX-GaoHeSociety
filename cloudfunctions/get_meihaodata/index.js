// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("hemeihao").get({
    success:function(res){
      return res
    },
    fail:function(err){
      return err
    }
  })
}