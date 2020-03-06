// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const DB = cloud.database();
  const _ = DB.command
  // 取出传过来的volunteer_id
  let volunteerId = event.volunteer_id
  let hefuwu_id = event.hefuwuId
  // 根据hefuwu_id插入对应的合服务中的volunteers
  return DB.collection("hefuwu").doc(hefuwu_id).update({
    data: {
      volunteers: _.push(volunteerId)
    },
    success: function (res) { return res },
    fail: function (res) { return res }
  })

}