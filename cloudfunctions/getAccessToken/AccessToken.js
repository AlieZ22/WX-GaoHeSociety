const cloud = require('wx-server-sdk')
const request = require('request')
class AccessToken {
  constructor({
    appid,
    secret
  }) {
    this.appid = appid
    this.secret = secret
  }
  // 获取公众号access_token
  async getWechatAccessToken() {
    let token_url ="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+this.appid+"&secret="+this.secret;
    const rp = options =>
      new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        });
      });
    const result = await rp({
      url: token_url,
      method: 'GET'
    });
    return (typeof result.body === 'object') ? result.body : JSON.parse(result.body);
  }

  // 获取保存在数据库的公众号access_token
  async getCachedWechatAccessToken() {
    /*let collection = 'wx-access-token'; //数据库集合名称
    let gapTime = 300000; // 5 分钟
    cloud.init();
    let db = cloud.database();
    let result = await db.collection(collection).get();
    if (result.code) {
      return null;
    }
    // 数据库没有，获取
    if (!result.data.length) {
      let accessTokenBody = await this.getWechatAccessToken();
      let act = accessTokenBody.access_token;
      let ein = accessTokenBody.expires_in * 1000;
      await db.collection(collection).add({
        data: {
          _id: 1,
          accessToken: act,
          expiresIn: ein,
          createTime: Date.now()
        }
      });
      return act;
    } else {
      let data = result.data[0];
      let {
        _id,
        accessToken,
        expiresIn,
        createTime
      } = data;
      // 判断access_token是否有效
      if (Date.now() < createTime + expiresIn - gapTime) {
        return accessToken;
      }
      // 失效，重新获取
      else {
        let accessTokenBody = await this.getWechatAccessToken();
        let act = accessTokenBody.access_token;
        let ein = accessTokenBody.expires_in * 1000;
        await db.collection(collection).doc(_id).set({
          _id: 1,
          accessToken: act,
          expiresIn: ein,
          createTime: Date.now()
        });
        return accessTokenBody.access_token;
      }
    }*/
    let accessTokenBody = await this.getWechatAccessToken();
    let act = accessTokenBody.access_token;
    let ein = accessTokenBody.expires_in * 1000;
    return act;
  }
}
module.exports = AccessToken