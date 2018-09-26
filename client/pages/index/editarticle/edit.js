var util = require('../../../utils/util.js')

Page({
  data: {
   hasshow:1,
   preview: false,
    artnum:4,
    swnum:1,
  },

  chooseImage: function(){
var that=this;
    var imageSrc='';
    var artnum=0;
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      console.log(res);

      that.setData({
        imageSrc : res.tempFilePaths,
       
      })
      wx.uploadFile({
        url: 'https://847123177.torontoqcloud1212.club/weapp/upimg',
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: function (res) {
          console.log('uploadImage success, res is:', res)

         wx.showToast({
            title: '上传成功',
            icon: 'success',
           duration: 1000
          })

          that.setData({
            hasshow:2,
            artnum:res.data
          })
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage fail, errMsg is', errMsg)
       }
      })


    },
   fail: function ({ errMsg }) {
     console.log('chooseImage fail, err is', errMsg)
   }
  })
  
  },



  chooseImage1: function () {
    var that = this;
    var imageSrc = '';
    var artnum = 0;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res);

        that.setData({
          imageSrc: res.tempFilePaths,

        })
        wx.uploadFile({
          url: 'https://847123177.torontoqcloud1212.club/weapp/upswimg',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            that.setData({
              hasshow: 0,
              swnum: res.data
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })


      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })

  },


  messageSubmit: function (e) {
    var title='';
    var article='';
    var artnum= this.data.artnum;
    var that=this;
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
                url: 'https://847123177.torontoqcloud1212.club/weapp/uploadnews',
                data: {
                  code: code,
                  title: e.detail.value.title,

                  article: e.detail.value.article,
                  artnum: artnum,

                },
               
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function (res) {

                  console.log(res);
                  console.log(res.data);

                  that.setData({
                    hasshow: 3,
                    artnum: res.data
                  })
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
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
  },
  messageSubmit1: function (e) {
    var title = '';
    var author = '';
    var article = '';
    var swnum = this.data.swnum;
    var that = this;

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/uploadswiper',

      data: {
        title: e.detail.value.title,
        article: e.detail.value.article,
        swnum: swnum
      },

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        console.log(res.data);
      
        that.setData({
         
          swnum: res.data
        })
        wx.navigateTo({
          url: 'edit',
        })
      }
    })
  },



  preview: function () {
    var preview=this.data.hasshow;
    
    if(preview>2){
    wx.navigateTo({
      url: 'preview?artnum=' + this.data.artnum,
    })
    } else{
      wx.showModal({

        content: '请先发表',
        showCancel: false
       
      })
    }

},

reupload:function(){
  wx.navigateTo({
    url: 'reupload?artnum=' + this.data.artnum,
  })

},

  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }

 
})

