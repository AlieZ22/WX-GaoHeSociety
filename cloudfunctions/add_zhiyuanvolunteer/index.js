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
  let zhiyuan_id = event.hezhiyuanId
  // 看看当前人数与人数上限
  // 根据hefuwu_id插入对应的合服务中的volunteers
  return DB.collection("hezhiyuan").doc(zhiyuan_id).update({
    data: {
      volunteers: _.push(volunteerId),
      currentVoluNum:_.inc(1)
    },
    success: function (res) { return res },
    fail: function (res) { return res }
  })
  
}