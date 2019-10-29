let config = {};

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    config.siteUrl = 'http://portalapi.ac002.gjsoft.local/';
	config.cdn1Url = 'http://cdn1.gjsoft.co/';
	config.cdn2Url = 'http://cdn2.gjsoft.co/';
}else{
    // 生产环境
    config.siteUrl = 'https://*****.com/';
	config.cdn1Url = 'https://cdn1.0a0s.com/';
	config.cdn2Url = 'https://cdn2.0a0s.com/';
}

export default config