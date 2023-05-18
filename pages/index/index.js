let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    webUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = app.globalData.token;
    let webUrl = app.globalData.baseUrl;
    let redirectRouter = options.redirect;
    let clearToken = options.clearToken;
    console.log("options", options);
    if (clearToken) {
      app.globalData.token = "";
      wx.reLaunch({
        url: "/pages/login/login?fromPage=me",
      });
    }
    // if (redirectRouter == "me") {
    //   this.setData({ webUrl: webUrl + "/me" });
    // }
    if (token == "") {
      if (redirectRouter == "me") {
        this.setData({ webUrl: webUrl + "/me" });
      } else {
        // wx.reLaunch({
        //   url: "/pages/index/index",
        // });
        this.setData({ webUrl: webUrl + "/index?from=wechat" });
      }

      return;
    }
    if (token != "") {
      this.setData({
        token: token,
        webUrl: webUrl + "/index?token=" + token + "&from=wechat",
      });
      // console.log(this.data.webUrl);
    }
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
