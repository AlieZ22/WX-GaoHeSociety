// 云函数入口文件
const cloud = require('wx-server-sdk')
const ipify = require('ipify');
cloud.init({
  env: 'zzmine-3cgx9'
})
exports.main = async (event, context) => {
  return await ipify({ useIPv6: false })
}