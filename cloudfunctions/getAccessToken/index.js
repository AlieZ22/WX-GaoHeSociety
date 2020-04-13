// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   //let postResponse = await got('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2ca11bc4ee6e5bff&secret=86a3e64674df7a835e2fcf920b1af00e')
//   let appid = 'wx2ca11bc4ee6e5bff';
//   let secret = '86a3e64674df7a835e2fcf920b1af00e';
//   const result = await rp({
//     url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appId=${APPID}&secret=${APPSCREAT}`,
//     method: 'GET'
//   });

//   //TODO:需要验证IP白名单失效问题（ip改变导致无法获取到token）
//   console.info(result)
//   let rbody = (typeof result === 'object') ? result : JSON.parse(result);
//   return rbody;

//   //return postResponse.body;
// }

// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
const access_token = require('AccessToken');

cloud.init({
  env:'zzmine-3cgx9'
})

let appid = 'wx6aa65243f829ea5f';//微信公众号开发者id
let secret = 'a988b1860677efcd7d5e16c6d846c959';//微信公众号开发者secret_key

// 云函数入口函数
exports.main = async (event, context) => {
  let at = new access_token({
    appid,
    secret
  });
  return at.getCachedWechatAccessToken();
}