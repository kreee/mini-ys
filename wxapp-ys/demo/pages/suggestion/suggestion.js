var bmap = require('../../libs/bmap-wx.min.js');
Page({
    data: {
        sugData: ''
    },
    getBMap : function(){
      var BMap = new bmap.BMapWX({
        ak: 'Ajc1srZRGRWFbDKtHkS43nYyDQlj9Noi'
      });
      return BMap;
    },
    bindKeyInput: function(e) {
        var that = this;
        if (e.detail.value === '') {
            that.setData({
                sugData: ''
            });
            return;
        }

        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            that.setData({
              sugData: data.result
            });
        }
        BMap.suggestion({
            query: e.detail.value,
            region: '北京',
            city_limit: true,
            fail: fail,
            success: success
        });
    },
    search:function(e){
      this.data;
      console.log(this.data.sugData[e.target.dataset.index]);
    }
})