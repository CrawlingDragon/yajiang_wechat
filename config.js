const envObj = wx.getAccountInfoSync();
const { envVersion } = envObj.miniProgram;

const config = {
  develop: {
    baseUrl: "http://10.59.10.30:3000",
    userCenterBaseUrl: "https://betayaj.114nz.com/sso",
  },
  trial: {
    baseUrl: "https://www.yjsr.org.cn/app",
    userCenterBaseUrl: "https://www.yjsr.org.cn/sso",
    // baseUrl: "https://yajiang-m.114nz.com",
    // userCenterBaseUrl: "https://betayaj.114nz.com/sso",
  },
  release: {
    baseUrl: "https://www.yjsr.org.cn/app",
    userCenterBaseUrl: "https://www.yjsr.org.cn/sso",
  },
};

module.exports = config[envVersion];
