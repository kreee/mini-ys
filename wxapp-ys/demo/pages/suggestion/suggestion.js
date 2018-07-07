let plugin = requirePlugin("myPlugin")
let routeInfo = {
  //startLat: 22.51405961415,    //起点纬度 选填
  //startLng: 114.0594553908,    //起点经度 选填
  startName: "我的位置",   // 起点名称 选填
  endLat: 22.521197404535,    // 终点纬度必传
  endLng: 114.06062789254,  //终点经度 必传
  endName: "阿大推拿理疗",  //终点名称 必传
  mode: "car"  //算路方式 选填
}

Page({
  data: {
    routeInfo: routeInfo
  },
  onLoad: function (option) {
    console.log(option.latitude);
    console.log(option.longitude);
    console.log(option.name);
    this.setData({
      routeInfo:{
        startName: "我的位置",
        endLat: option.latitude,
        endLng:option.longitude,
        endName: option.name,
        mode: "car"
      }
    });
    console.log(option.latitude);
  }
})