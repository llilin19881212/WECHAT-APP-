var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


var app = getApp();
Page({
  data: {
    nickName: '',
    iconUrl: '',
    isname: false,
    newname: '',
    qrCode: '',
    sumTotal: 0,
    collectTotal:0,
    ismobile: true,
    istouqu: false,
    isshop: false,
    issnap: false,
    userType: '',
    accountBalance: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    header:'',
 
  },

  // 用户登录示例
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          console.log(result)
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
          wx.login({
            success: function (res) {
              var code = res.code;//发送给服务器的code
          wx.getUserInfo({
            success: function (res) {
              var userNick = res.userInfo.nickName;//用户昵称
              var avataUrl = res.userInfo.avatarUrl;//用户头像地址
              var gender = res.userInfo.gender;//用户性别
              var sumTotal = 0;
              var collectTotal = 0;
              if (code) {
                wx.request({
                  url: 'https://847123177.torontoqcloud1212.club/openid',
                  data: {
                    code: code,
                    nick: userNick,
                    avaurl: avataUrl,
                    sex: gender,

                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data);
                    wx.setStorageSync('name', res.data.name);//将获取信息写入本地缓存
                    wx.setStorageSync('openid', res.data.openid);
                    wx.setStorageSync('imgUrl', res.data.imgurl);
                    wx.setStorageSync('sex', res.data.sex);
                    that.setData({

                      collectTotal: res.data[0],
                      sumTotal: res.data[1]


                    });
                  }
                })
              }
              else {
                console.log("获取用户登录态失败！");
              }
            }
          })
            },
            fail: function (error) {
              console.log('login failed ' + error);
            }

          })
        
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log(result.data.data.openId)
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              wx.request({
                url: 'https://847123177.torontoqcloud1212.club/openidwithcode',
                data: {
                  id: result.data.data.openId,
                  nick: result.data.data.nickName,

                  sex: result.data.data.gender,

                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data);

                  that.setData({

                    collectTotal: res.data[0],
                    sumTotal: res.data[1]


                  });
                }
              })


            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  // 切换是否带有登录态
  switchRequestMode: function (e) {
    this.setData({
      takeSession: e.detail.value
    })
    this.doRequest()
  },

 

  // 切换信道的按钮
  switchChange: function (e) {
    var checked = e.detail.value

    if (checked) {
      this.openTunnel()
    } else {
      this.closeTunnel()
    }
  },

  openTunnel: function () {
    util.showBusy('信道连接中...')
    // 创建信道，需要给定后台服务地址
    var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

    // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
    tunnel.on('connect', () => {
      util.showSuccess('信道已连接')
      console.log('WebSocket 信道已连接')
      this.setData({ tunnelStatus: 'connected' })
    })

    tunnel.on('close', () => {
      util.showSuccess('信道已断开')
      console.log('WebSocket 信道已断开')
      this.setData({ tunnelStatus: 'closed' })
    })

    tunnel.on('reconnecting', () => {
      console.log('WebSocket 信道正在重连...')
      util.showBusy('正在重连')
    })

    tunnel.on('reconnect', () => {
      console.log('WebSocket 信道重连成功')
      util.showSuccess('重连成功')
    })

    tunnel.on('error', error => {
      util.showModel('信道发生错误', error)
      console.error('信道发生错误：', error)
    })

    // 监听自定义消息（服务器进行推送）
    tunnel.on('speak', speak => {
      util.showModel('信道消息', speak)
      console.log('收到说话消息：', speak)
    })

    // 打开信道
    tunnel.open()

    this.setData({ tunnelStatus: 'connecting' })
  },

  /**
   * 点击「发送消息」按钮，测试使用信道发送消息
   */
  sendMessage() {
    if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
    // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
    if (this.tunnel && this.tunnel.isActive()) {
      // 使用信道给服务器推送「speak」消息
      this.tunnel.emit('speak', {
        'word': 'I say something at ' + new Date(),
      });
    }
  },

  /**
   * 点击「关闭信道」按钮，关闭已经打开的信道
   */
  closeTunnel() {
    if (this.tunnel) {
      this.tunnel.close();
    }
    util.showBusy('信道连接中...')
    this.setData({ tunnelStatus: 'closed' })
  },
  
  editarticle: function () {

   if (this.data.logged) {
          
     var that = this;
     wx.login({
       success: function (res) {
         var code = res.code;//发送给服务器的code

         wx.getUserInfo({

           success: function (res) {
             var userNick = res.userInfo.nickName;//用户昵称
             var avataUrl = res.userInfo.avatarUrl;//用户头像地址
             var gender = res.userInfo.gender;//用户性别

             if (code) {
               wx.request({
                 url: 'https://847123177.torontoqcloud1212.club/weapp/level',
                 data: {
                   code: code,
                   
                 },
                 header: {
                   'content-type': 'application/json'
                 },
                 success: function (res) {

                   console.log(res);
                   console.log(res.data);
                  if (res.data>1){
                   wx.navigateTo({
                     url: 'editarticle/editindex',
                   })
                  }else{
                    wx.showModal({

                      content: '您的等级不能发布文章',
                      showCancel: false
                    })

                  }

                 }
               })
             }
             else {
               console.log("获取用户登录态失败！");
             }
           }
         })
       },
       fail: function (error) {
         console.log('login failed ' + error);
       }

     })


    

    } else {


      wx.showModal({

        content: '请先点击登陆',
        showCancel: false
      })

    }
  },



    aboutMe: function () {
      wx.navigateTo({
        url: 'aboutme',
      })
    }
  
 
  
})