// pages/detail/detail.js
var bmap = require('../../libs/bmap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoList:[] ,
    name : "暂无"
  },
  uid:"",
  latitude: 0,
  longitude: 0,
  name: "",
  
  getBMap: function () {
    var BMap = new bmap.BMapWX({
      ak: 'Ajc1srZRGRWFbDKtHkS43nYyDQlj9Noi'
    });
    return BMap;
  },
    /**
   * 获取评论列表
   */
  getCommentList: function(){
    var that = this;
    var successComment = function (data) {
      if (data == null) {
        return;
      }
      that.setData({
        commentData: data
      });
    };
    that.getBMap().detail({ success: successComment, uid: that.uid });
  },
  /**
* 获取图片列表
*/
  getPhotoList: function () {
    var that = this;
    let photoList = [];
    var successComment = function (data) {
      if (data == null) {
        return;
      }else{
        for (var i in data){
          photoList.push(data[i].imgUrl);
        }
      }
      that.setData({
        photoList: photoList
      });
    };
    that.getBMap().getPhotoList({ success: successComment, uid: that.uid });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.uid = options.uid;
    that.setData({
      name: options.name
    });
    that.latitude = options.latitude;
    that.longitude = options.longitude;
    that.name = options.name;

    that.getCommentList();
   // that.getPhotoList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})