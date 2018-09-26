

Page({
  data: {
  
  },

 
sendart:function(){
wx.navigateTo({
  url: 'edit',
})

},
  publicart: function () {
   
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
                  if (res.data > 2) {
                    wx.navigateTo({
                      url: 'checkarticle',
                    })
                  } else {
                    wx.showModal({

                      content: '您的等级不能管理文章',
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


  }

  }) 
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   



