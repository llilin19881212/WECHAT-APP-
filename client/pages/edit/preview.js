Page({

  data: {artnum:0,
   title: '',
    image: '',
    author: '',
    article: '',
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
       
        })

      }
    })  
  
  
  
  
  
  },


})