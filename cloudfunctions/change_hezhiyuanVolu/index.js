// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command
  let hezhiyuanId = event.hezhiyuan_id
  let new_volunteers = event.newVolunteers
  let curr = event.currentVoluNum
  return cloud.database().collection("hezhiyuan").doc(hezhiyuanId).update({
    data:{
      volunteers:new_volunteers,
      currentVoluNum:curr
    },
    success:function(res){
      return res
    },
    fail:function(res){
      return res
    }
  })
}