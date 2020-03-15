// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  let collection = event.collection
  let volunteer_id = event.volunteer_id
  let new_state = event.state
  return cloud.database().collection(collection).doc(volunteer_id).update({
    data: {
      state: new_state
    },
    success: function (res) {
      return res
    },
    fail:function(res){
      return res
    }
  })
}