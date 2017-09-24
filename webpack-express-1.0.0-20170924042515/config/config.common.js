/**
 * Created by haiming.zeng on 2017/9/21.
 */
/*
* 公共配置
* */
var config = {
	port:'80',
	pageSize:10,
	pageNo:1,

	// v:'v1',
	v:'v2',

	//版本配置参数
	apiType:{
		msxf:'webservices',
		douban:'douban'
	},

	protocol:'http',

	//头信息验证机制
	XApplicationId:'MSFQ_ANDROID',
	XAPIVersion:'1',
	XToken:'',  //X-Token注册或登录后由API返回，APP缓存后在后续的接口都需带上，用于认证用户信息
	XClient:';;;;;;;;;;',  //系统、设备、软件 Mac地址; App渠道; 版本; 网络状态; IP; GPS

};

module.exports = config