Page({

  data: {artnum:0,
   title: '',
    image: '',
    author: '',
    article: '',
    auid:''
  },

  onLoad: function (options) {
var that=this;
    this.setData({
      "artnum": options.artnum,
    })

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/newspage',

      data: {
        artnum:this.data.artnum

      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);
        that.setData({
          title: res.data[0],
          image: res.data[1],
          author: res.data[2],
          article: res.data[3],
          auid:res.data[4]
       
        })

      }
    })  
  
  
  
  
  
  },





  likeu:function(){
    var auid = this.data.auid;
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
                url: 'https://847123177.torontoqcloud1212.club/weapp/likeu',
                data: {
                  code: code,
                  auid: auid

                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {

                  console.log(res);
                  console.log(res.data);

                  if (res.data > 1) {
                    wx.showToast({
                      title: '打赏成功',
                      icon: 'success',
                      duration: 1000
                    })
                      

                  } else {
                    wx.showToast({
                      title: '你的金币不足',
                      icon: 'none',
                      duration: 1000
                    })}
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

  }


})