const CoinHiveAPI = require('./coinhive-api');

// Instantiate the class with your secret key
var coinhive = new CoinHiveAPI('your-secret-key');

coinhive.verifyToken({
  token:"04imQTobrmbTjEq5th0g9eLRRHf5F9hw",
  hashes:1024,
}).then(token=>{
  console.log('verifyToken:',token.success);
}).catch(error=>{
  console.log(error);
});

coinhive.getUserBalance({
  name:'ext'
}).then(userBalance=>{
  console.log('userBalance:',userBalance.success);
}).catch(error=>{
  console.log(error);
});

coinhive.withdrawUser({
  name:'ext',
  amount:10
}).then(withdraw=>{
  console.log('withdraw:',withdraw.success);
}).catch(error=>{
  console.log(error);
});

/*
coinhive.resetUser({name:'ext'}).then(reset=>{console.log('reset:',reset.success);})
.catch(error=>{console.log(error);});
coinhive.resetAllUser({name:'ext'}).then(reset=>{console.log('reset:',reset.success);})
.catch(error=>{console.log(error);});
//*/

coinhive.getTopUser({
  count:1024,
  order:'total'
}).then(userList=>{
  console.log('TopUser:',userList.success);
}).catch(error=>{
  console.log(error);
});

//*
coinhive.getListUser({
  count:8192,
  page:''
}).then(userList=>{
  console.log('listUser:',userList.success);
}).catch(error=>{
  console.log(error);
});
//*/

/*
coinhive.createLink({
  url:"https://coinhive.com",
  hashes:1024,
}).then(siteStats=>{
  console.log('createLink:',siteStats.success);
}).catch(error=>{
  console.log(error);
});
//*/

//*
coinhive.getPayoutStats().then(payoutStats=>{
  console.log('getPayoutStats:',payoutStats.success);
}).catch(error=>{
  console.log(error);
});

coinhive.getSiteStats().then(siteStats=>{
  //console.log(siteStats.hashesTotal);
  console.log('getSiteStats:',siteStats.success);
}).catch(error=>{
  console.log(error);
});

coinhive.getHistoryStats({
	begin: (new Date('2018-01-03T10:11:10')).getTime()/1000,
	end: (new Date('2018-01-03T23:11:10')).getTime()/1000,
}).then(historyStats=>{
  console.log('getHistoryStats:',historyStats.success);
  //console.log(historyStats.history.length);
}).catch(error=>{
  console.log(error);
});
//*/

