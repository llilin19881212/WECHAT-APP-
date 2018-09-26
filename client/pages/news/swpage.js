Page({

  data: {swnum:0,
   title: '',
    image: '',
   
    article: '',
  },

  onLoad: function (options) {
var that=this;
    this.setData({
      "swnum": options.swnum,
    })

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/swiperpage',

      data: {
        swnum:this.data.swnum

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
        
          article: res.data[2],
       
        })

      }
    })  
  
  
  
  
  
  },


})