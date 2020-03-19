// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  let url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${event.accessToken}`
  var options = {
    method: 'POST',
    json: true,
    uri: url,
    body: {
      "type": "news",
      "offset": event.offset,
      "count": event.count
    }
  }
  const result = await rp(options)
  let rbody = (typeof result === 'object') ? result : JSON.parse(result);
  return rbody;
}