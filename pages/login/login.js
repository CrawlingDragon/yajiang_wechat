import Toast from "@vant/weapp/toast/toast";
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */

  data: {
    active: 0,
    checked: false,
    fromPage: "",
    js_code: "",
    logo: "/pages/login/logo.jpg",
    icon: [
      {
        normal: "./15.png",
        active: "./25.png",
      },
      {
        normal: "./16.png",
        active: "./27.png",
      },
      {
        normal: "./17.png",
        active: "./29.png",
      },
      {
        normal: "./18.png",
        active: "./34.png",
      },
      {
        normal: "./19.png",
        active: "./31.png",
      },
    ],
  },
  showLoginBoxFn() {
    this.setData({
      show: true,
    });
  },

  onChangeCheck(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onChangeCheckP1() {
    let check = this.data.checked;
    console.log(check);
    this.setData({
      checked: !check,
    });
  },
  weChatLoginBeforeFn() {
    if (!this.data.checked) {
      Toast("请先同意用户协议");
      return;
    }
  },
  getPhoneNumber(e) {
    // 微信授权登录
    console.log("code", e);
    let that = this;
    let code = e.detail.encryptedData;
    let userCenterBaseUrl = app.globalData.userCenterBaseUrl;
    let errMsg = e.detail.errMsg; //授权的msg信息
    if (errMsg == "getPhoneNumber:fail user deny") {
      wx.showToast({
        title: "已拒绝",
        icon: "none",
      });
      return;
    }
    wx.request({
      url: userCenterBaseUrl + "/token",
      method: "POST",
      data: {
        client_id: "yaj",
        grant_type: "wemini",
        encrypted_data: code,
        code: this.data.js_code,
        iv: e.detail.iv,
        scope: "",
      },
      success(res) {
        let token = encodeURIComponent(res.data.access_token);
        // console.log("token", res.data.access_token);
        // console.log("encodeURIComponent-token", token);
        app.globalData.token = token;
        if (res.data.msg) {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
          return;
        }
        if (that.data.fromPage == "me") {
          wx.reLaunch({
            // url: "/pages/me/me?from=weChatMobileLogin",
            url: "/pages/index/index?redirect=me",
          });
        } else {
          wx.reLaunch({
            url: "/pages/index/index",
          });
        }
      },
    });
  },

  goPhoneLogin() {
    // 手机号码登录按钮

    if (!this.data.checked) {
      Toast("请先同意用户协议");
      return;
    }
    wx.reLaunch({
      // url: "/pages/me/me?from=weChatMobileLogin",
      url: "/pages/index/index?redirect=me",
    });
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引

    this.setData({ active: event.detail });
  },
  goWebUrl(e) {
    let page = e.currentTarget.dataset.page;
    let token = app.globalData.token;
    switch (page) {
      case "index":
        wx.reLaunch({
          url: "/pages/index/index",
        });
        break;
      case "nav":
        if (token == "") {
          wx.showToast({
            title: "请先登录",
            icon: "none",
          });
          return;
        }
        wx.reLaunch({
          url: "/pages/me/me?from=wechat",
        });
        break;
      case "ask":
        if (token == "") {
          wx.showToast({
            title: "请先登录",
            icon: "none",
          });
          return;
        }
        wx.reLaunch({
          url: "/pages/ask/ask?fromPage=ask",
        });
        break;
      case "me":
        if (token == "") {
          wx.showToast({
            title: "请先登录",
            icon: "none",
          });
          return;
        }
        wx.reLaunch({
          url: "/pages/me/me",
        });
        break;
      case "agreement":
        wx.reLaunch({
          url: "/pages/agreement/agreement",
        });
        break;
      case "privacy":
        wx.reLaunch({
          url: "/pages/privacy/privacy",
        });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
      success(res) {
        that.setData({
          js_code: res.code,
        });
        // console.log("res", res);
      },
    });
    let token = app.globalData.token;
    let clearToken = options.clearToken;
    let logo = options.logo;
    if (logo) {
      this.setData({ logo: logo });
    }
    console.log("options", options);
    if (clearToken) {
      app.globalData.token = "";
      if (options.fromPage === "me") {
        this.setData({
          fromPage: options.fromPage,
        });
        wx.setNavigationBarTitle({
          title: "我的",
        });
        this.setData({
          active: 4,
        });
      }
      return;
    }
    if (token) {
      wx.reLaunch({
        url: "/pages/index/index",
      });
    }

    // console.log("options", options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
