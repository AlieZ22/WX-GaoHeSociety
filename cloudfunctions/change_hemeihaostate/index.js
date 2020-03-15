// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zzmine-3cgx9'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const DB = cloud.database();
  const _ = DB.command
  // 取出传过来的_id
  let name = event.database
  let changestate = event.state
  let data_id = event.dataId
  // 根据meihaoID插入对应的数据库中的state状态
  return DB.collection("hemeihao").doc(data_id).update({
    data: {
      state: event.state
    },
    success: function (res) { return res },
    fail: function (res) { return res }
  })

}