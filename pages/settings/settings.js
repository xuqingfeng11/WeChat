// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"tom",
    user:{
      name:"jack"
    },
    show:{
      complete:"hide",
      info:"show"
    }
  },

  /**
   * 生命周期函数--监听页面显示
   * callback hell
   */
  onShow: function () {
    let emp = wx.getStorageSync("emp");
    //console.log(emp); //如果key不存在返回的是空字符
    if (!emp) {
      // console.log("没有完善过消息");
      this.setData({
        show: {
          complete: "show",
          info: "hide"
        }
      });
    }else{
      this.setData({
        "emp":emp
      })
    }
  },
  doCompelte:function(e){
    //console.log(e);
    let name = e.detail.value.name;
    let tel = e.detail.value.tel;
    // 将page对象传递到 回调中
    let that = this;
    //data.name = "123";
    // console.log(this);
    // // 只会修改属性值 ，不会触发页面数据绑定的双向事件
    // this.data.name = "123";
    // console.log(this);
    // setData（obj） page对象 提供对于数据双向操作的设置方法
    // 在原有数据上进行修改和追加
    // this.setData({
    //   name:"123"
    // });

    //通过微信的开发接口，获取微信账号对应的opendID
    //实现微信登录
    wx.login({
      success:function(res){
        //console.log(res);
        //发送请求，获取 用户的 opendID
        //https://api.weixin.qq.com/sns/jscode2session
        //appid=APPID    // 微信小程序的开发授权码
        //secret=SECRET  // 解密秘钥 e5e1dd0f80cb024b0d6dbe8fd90fde5f
        //js_code=JSCODE //登录成功后返回的coed码
        //grant_type=authorization_code //固定写法

        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid: "wxdf39f513de597358",
            secret:"e5e1dd0f80cb024b0d6dbe8fd90fde5f",
            js_code:res.code,
            grant_type:"authorization_code"
          },
          method:"GET",
          success:function(res){
            console.log(res.data.openid);
            let emp = {
              "openid": res.data.openid,
              "name": name,
              "tel":tel
            }
            wx.setStorageSync("emp", emp);
            that.setData({
              "show": {
                complete: "hide",
                info: "show"
              },
              "emp":emp
            });
          }
        })
      }
    })
  }
})