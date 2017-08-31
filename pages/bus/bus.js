//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    array: ['南京', '苏州', '镇江', '南通'],
    index: 0,
    busArray: [],
    setPot:[],
    busLine:[]
  },

  onShow:function(){
    let that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          setPot:[res.latitude,res.longitude],
          // busLine: [{
          //   latitude: res.latitude,
          //   longitude: res.longitude
          // }]
        })

      },
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  sechSubmit: function (e) {
    let that = this;
    // 请求聚合数据 获取公交信息
    let key = "d2d32c505d2e478551ddaffd81be54b0";
    let city = e.detail.value.city;
    let bus = e.detail.value.busNo;
    wx.request({
      url: 'http://op.juhe.cn/189/bus/busline',
      data:{
        "key": key,
        "city": city,
        "bus": bus
      },
      success:function(res){
        let statiArr = res.data.result[0].stationdes;
        let busArr = new Array();
        // console.log(res.data.result[0].stationdes);
        for (let i in statiArr){
          let xyArr = statiArr[i].xy.split(",");
          if(i==0){
            that.setData({
              "setPot": [xyArr[1], xyArr[0]]
            })
          }
          let bus = {
            latitude: xyArr[1],
            longitude: xyArr[0],
            iconPath:"../../images/p.png",
            width:26, 
            height:26,
            // title: statiArr[i].name
            label:{
              color:"red",
              fontSize:16, 
              content: statiArr[i].name
              //手机上会出现地理位置偏差
              // x: xyArr[1], 
              // y: xyArr[0]
            }
          }
          busArr.push(bus);
        }
        console.log(busArr);
        that.setData({
          "busLine": busArr
        })
      }
    })
  }
});
