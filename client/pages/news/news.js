var util = require('../../utils/util.js')

Page({
  data: {
    titlea: '',
    titleb: '',
    titlec: '',
    titled: '',
    titlee: '',
    imgUrls: [],
    indicatorDots: true,
    loadarticles: [],
    title1:'',
    title2: '',
    title3: '',

   
    image1:'',
    image2: '',
    image3: '',
    imagel:'',
    artnum:4
  },

  onLoad: function () {
    var that = this;
    var title = this.data.imgUrls.title
    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/getnews',

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
    }),
      wx.request({
        url: 'https://847123177.torontoqcloud1212.club/weapp/getswiper',

        data: {

        },

        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
         
          console.log(res);
          console.log(res.data);
          let newswiper = [{ img: 'https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/swiper1', title: res.data[0],swnum:1 },
            { img: 'https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/swiper2', title: res.data[1],swnum:2 },
            { img: 'https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/swiper3', title: res.data[2], swnum: 3},
            { img: 'https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/swiper4', title: res.data[3], swnum: 4},
            { img: 'https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/swiper5', title: res.data[4], swnum: 5}].concat(that.data.imgUrls)

      
            that.setData({
              imgUrls: newswiper,
             
            })


         
        }
      })  


  },


  
  news1: function () {
    wx.navigateTo({
      url: 'page?artnum=2',
    })

  },
  news2: function () {
    wx.navigateTo({
      url: 'page?artnum=3',
    })

  },
  news3: function () {
    wx.navigateTo({
      url: 'page?artnum=4',
    })

  },


  //loadnews:function(){
   // wx.navigateTo({
     // url: 'page?artnum='+this.data.artnum,
    //})

  //},


  onPullDownRefresh: function () {
        var num=this.data.artnum+1
       var that=this
    var artnum =this.data.artnum
  
    wx.request({
      url: 'https://847123177.torontoqcloud1212.club/weapp/loadnews',

      data: {
        artnum: artnum,

      },

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data);

          if (res.data[0]<1){
            wx.showToast({
              title: '没有更多了',
              icon: 'none',
              duration: 1000
            })

      }else{
            wx.showNavigationBarLoading() //在标题栏中显示加载
            let newarticles = [{ title: res.data[1], author: '李麟', article: 'hello', artnum: num, img: res.data[2] }].concat(that.data.loadarticles)

            setTimeout(() => {
              that.setData({
                loadarticles: newarticles,
                artnum: num + 1,

              })
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh() //停止下拉刷新
            }, 2000)



            that.setData({

              imagel: res.data[1],

            })

     
      }
      }

      
    })  
       
      }
  
  
})