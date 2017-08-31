//index.js
// 引入工具类
var dis = require("../../utils/distance.js");
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 只会被执行一次
  onLoad: function () {
    // //console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  },

  //页面显示的周期函数
  onShow:function(){
    let emp = wx.getStorageSync("emp");
    //console.log(emp); //如果key不存在返回的是空字符
    if(!emp){
      // console.log("没有完善过消息");
      wx.switchTab({
        // 相对于当前文件 所指定的页面的地址
        url: '../settings/settings',
      })
    }
    wx.getNetworkType({
      success: function (res) {
        // res 返回的对象是
        //{errMsg: "getNetworkType:ok", networkType: "4g"}
        // errMsg 错误消息   networkType 网络类型
        //console.log(res);
        if (res.networkType == "none") {
          //console.log("当前没有网络");
          wx.showToast({
            title: '当前没有网络',
            //icon: 'loading'
            image: '../../images/error.png',
            // 提示框关闭的延迟时间
            duration: 3000,
            mask: true
          })
        }
      },
    });

  },
  
  // 自定义方法
  printNetWorkType:function(){
    // console.log("自定义方法");
    wx.getNetworkType({
      success: function(res) {
        // res 返回的对象是
        //{errMsg: "getNetworkType:ok", networkType: "4g"}
        // errMsg 错误消息   networkType 网络类型
        //console.log(res);
        if (res.networkType=="none"){
            //console.log("当前没有网络");
            wx.showToast({
              title: '当前没有网络',
              //icon: 'loading'
              image:'../../images/error.png',
              // 提示框关闭的延迟时间
              duration:3000,
              mask:true
            })
         }

      },
    });
  },

  //自定义方法
  scan:()=>{
    let lat = 32;
    let lon = 118;

    //console.log(1);
    wx.scanCode({
      // onlyFromCamera: true,
      // path
      success:(res)=>{
        //{errMsg: "scanCode:ok", 
        //  result: "itany", 
        //  scanType: "QR_CODE", 
        //  path: "", 
        //  charSet: "UTF-8"}
        console.log(res.result);
        // console.log(scanType);
        // console.log(charSet);
        
        //需要实现定位打卡的功能
        // 需要确定一个范围

        //1、手机定位
        //wx.getLocation(OBJECT)  获取手机地理位置
        // 不一定调用的是GPS 会根据 当前网络状态的地理位置进行定位
        // 默认调用的是GPS 定位
        if(res.result=="itany"){
          wx.getLocation({
            success: function(res) {
              // 在固定位置打卡（100m范围内）
              console.log(res);
              let d = dis.distance(res.latitude,res.longitude,lat,lon);
              console.log(d);
              if(d>100){
                wx.showToast({
                  title: '不在公司，不能打卡',
                })
              }else{
                //数据库操作
                //  ……
                //

                // 在打开程序时 如何判断用户是否已完成完善信息功能
                // 数据存储的问题 本地存储
                
                // 到底是谁打了卡（真实身份信息）=> 用户主动输入  
                // （微信中如何唯一确定一个人）=> 确定一个微信用户
                wx.showToast({
                  title: '打卡成功',
                })
              }
            },
          })
        }
      }
      // fail:(e)=>{
      //   console.log(e);
      // },
      // complete:()=>{
      //   console.log(2);
      // }
    });
  }
})
