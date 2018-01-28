const https = require('https');

class CoinHiveAPI {// doc ref : https://coinhive.com/documentation/http-api
  constructor(secret){
    this._version = '1.0.0';
    this._API_URL = 'api.coinhive.com';// https://api.coinhive.com
    this._secret = secret;

    // TOKENS
    this.verifyToken = (parameters) => this._prepare('/token/verify',parameters,'POST');
    // USERS
    this.getUserBalance = (parameters) => this._prepare('/user/balance',parameters);
    this.withdrawUser = (parameters) => this._prepare('/user/withdraw',parameters,'POST');
    this.getTopUser = (parameters) => this._prepare('/user/top',parameters);
    this.getListUser = (parameters) => this._prepare('/user/list',parameters);
    this.resetUser = (parameters) => this._prepare('/user/reset',parameters,'POST');
    this.resetAllUser = (parameters) => this._prepare('/user/reset-all',parameters,'POST');
    // LINKS
    this.createLink = (parameters) => this._prepare('/link/create',parameters,'POST');
    // STATS
    this.getPayoutStats = () => this._prepare('/stats/payout');
    this.getSiteStats = () => this._prepare('/stats/site');
    this.getHistoryStats = (parameters) => this._prepare('/stats/history',parameters);
  }

  _serialize(parameters){
    return Object.entries(parameters).map(([key, val])=>`${key}=${encodeURIComponent(val)}`).join('&');
  }

  _prepare(endpoint,parameters={},method='GET'){
    parameters.secret=this._secret;
    const params = this._serialize(parameters);
    const options = {
      hostname: this._API_URL,
      port: 443,
      path: `${endpoint}${method==='GET'?`?${params}`:''}`,
      method: method,
      headers: {}
    };
    if(method==='POST')options.headers['Content-Type']='application/x-www-form-urlencoded';
    return this._request(options,method==='GET'?undefined:params);
  }

  _request(options,body){
    return new Promise(function(resolve,reject){
      const req = https.request(options, (res) => {// res.statusCode res.headers
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      });
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(body||'');
      req.end();
    })
  }
}

module.exports = CoinHiveAPI;
