// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command
  let hefuwuId = event.hefuwu_id
  let new_volunteers = event.newVolunteers
  return cloud.database().collection("hefuwu").doc(hefuwuId).update({
    data: {
      volunteers: new_volunteers
    },
    success: function (res) {
      return res
    },
    fail: function (res) {
      return res
    }
  })
}