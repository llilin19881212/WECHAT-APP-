Page({

  data: {artnum:0,
   title: '',
    image: '',
    author: '',
    article: '',
    auid:'',
    tempFilePath: '',
  },

  onLoad: function (options) {
var that=this;
    this.setData({
      "artnum": options.artnum,
    })

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/newspage1',

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
          auid: res.data[4],
        })

      }
    })  
  
  
  
  
  
  },








  publicarticle:function(){
    var image=this.data.image;
    var that=this;
    var artnum = this.data.artnum;
    var auid = this.data.auid;
    wx.downloadFile({

      url: "https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/" + image,

      success: function (res) {
  
        console.log('downloadFile success, res is', res)
        
        that.setData({

          tempFilePath: res.tempFilePath
        })
       
       
        wx.uploadFile({

          url: 'https://847123177.torontoqcloud1212.club/weapp/upimg1',

          filePath: res.tempFilePath,
          name: 'file',

          formData: {
            'artnum':that.data.artnum,
            'auid': that.data.auid

          },
          success: function (res) {

            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            that.setData({

              artnum: res.data
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

        
      },
      fail: function ({ errMsg }) {
        console.log('downloadFile fail, err is:', errMsg)
      }
    })


  }




})