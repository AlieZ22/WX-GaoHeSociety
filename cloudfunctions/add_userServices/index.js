// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const DB = cloud.database();
  const _ = DB.command
  // 取出传过来的info,way
  // 根据event._openid找到对应用户，给该用户的services下添加志愿者信息
  return DB.collection("users").where({
    _openid:event._openid
  }).update({
    data:{
      services:_.push({
        info: event.info,
        way: event.way   // 1表示为合服务志愿者（0表示合服务受助者）
      })
    },
    success:function(res){return res},
    fail:function(res){return res}
  })
}