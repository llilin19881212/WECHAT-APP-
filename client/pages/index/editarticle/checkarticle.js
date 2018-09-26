

Page({
  data: {

    loadarticles: [],
    title1: '',
    title2: '',
    title3: '',
    image1: '',
    image2: '',
    image3: '',
    imagel: '',
    artnum: 4
  },

  onLoad: function () {
    var that = this;

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/getnewspre',

      data: {

      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);
        that.setData({
          title1: res.data[0],
          title2: res.data[1],
          title3: res.data[2],
          image1: res.data[3],
          image2: res.data[4],
          image3: res.data[5],


        })

      }
    })
  },



  news1: function () {
    wx.navigateTo({
      url: 'preview1?artnum=1',
    })

  },
  news2: function () {
    wx.navigateTo({
      url: 'preview1?artnum=2',
    })

  },
  news3: function () {
    wx.navigateTo({
      url: 'preview1?artnum=3',
    })

  },
  delarticle: function () {

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/delnews',

      data: {
        artnum: this.data.artnum

      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);


      }
    })



  },


  //loadnews: function () {
   // var artnum1 = this.data.artnum-1;
   // wx.navigateTo({
    //  url: 'preview1?artnum=' + artnum1,
    //})

  //},
  
  onPullDownRefresh: function () {
    var num = this.data.artnum
    var that = this
    var artnum = this.data.artnum

    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/loadnewspre',

      data: {
        artnum: artnum,

      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);


        wx.showNavigationBarLoading() //在标题栏中显示加载
        let newarticles = [{ title: res.data[0], author: '李麟', article: 'hello', artnum: num, img: res.data[1] }].concat(that.data.loadarticles)

        setTimeout(() => {
          that.setData({
            loadarticles: newarticles,
            artnum: num+1 ,

          })
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 2000)



        that.setData({

          imagel: res.data[1],

        })

      }
    })









  }



})