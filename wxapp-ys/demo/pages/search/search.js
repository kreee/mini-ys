var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},
        commentData: {},
        sugData: '',
        flag : false,
        region : '北京',
        total : 0,
        page_num : 0
    },
    getBMap: function () {
      var BMap = new bmap.BMapWX({
        ak: 'Ajc1srZRGRWFbDKtHkS43nYyDQlj9Noi'
      });
      return BMap;
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);

        var successComment = function (data) {
          console.log(data);
          if (data == null){
            return;
          }
          that.setData({
            commentData: data
          });
        };
        that.getBMap().detail({ success: successComment, uid: wxMarkerData[id].uid});
        
    },
    
  bindKeyInput: function (e) {
    var that = this;
    that.setData({
      flag: false
    });
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      that.setData({
        sugData: data.result
      });
    }
    that.getBMap().suggestion({
      query: e.detail.value,
      region: that.data.region,
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  searchtap: function (e) {
    var that = this;
    that.setData({
      flag: true
    });
    location = this.data.sugData[e.target.dataset.index].location.lat + ',' + this.data.sugData[e.target.dataset.index].location.lng;
    that.search({ location : location});
  },
  changetap : function(e){
    var that = this;
    console.log("d" + that.data.page_num);

     if (that.data.page_num < that.data.total/20) {
       that.data.page_num ++;
     }else{
       that.data.page_num = 0;
     }
         location = that.data.latitude + ',' + this.data.longitude;
         that.search({ location: location, page_num: that.data.page_num });
  },
  onLoad: function() {
      this.search();
  },
  search: function(param){
    var that = this;
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      if (!wxMarkerData[0]){
        return;
      }
      that.setData({
        markers: wxMarkerData,
        region: wxMarkerData[0].city,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        total: wxMarkerData[0].total
      });
    };
    var config = {
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    };
    if (param){
      for(var key in param){
        config[key] = param[key];
      }
    }
    that.getBMap().search(config);
  },
    showSearchInfo: function(data, i) {
        var that = this;
        for (var j in data[i]) {
          if (data[i].hasOwnProperty(j) && typeof (data[i][j]) == "undefined") {
              data[i][j] = "暂无";
          }
        }
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone + '\n',
                tag: data[i].tag + '\t',
                distance: '距您' + data[i].distance + '米\t',
                price: '价格:' + data[i].price + '元\t',
                overall_rating: '星级:' + data[i].overall_rating + '星',
            }
        });
    },
    showCommentInfo: function (data, i) {
      var that = this;
      that.setData({
        commentData: {
          comment1: '名称：' + data[i].title + '\n',
          comment2: '地址：' + data[i].address + '\n',
          comment3: '电话：' + data[i].telephone
        }
      });
    },
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../img/marker_yellow.png";
            } else {
                data[i].iconPath = "../../img/marker_red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    }
})