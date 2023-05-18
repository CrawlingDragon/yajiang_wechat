// app.js
import config from "./config";
let app = getApp();
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    const envObj = wx.getAccountInfoSync();
    const { envVersion } = envObj.miniProgram;
    console.log("env==========", envVersion);
  },
  globalData: {
    // baseUrl: "http://10.59.10.30:3000",
    baseUrl: config.baseUrl,
    userCenterBaseUrl: config.userCenterBaseUrl,
    token: "",
  },
});
