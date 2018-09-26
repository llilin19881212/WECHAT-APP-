

var playTimeInterval
var recordTimeInterval

Page({
  data: {

  },
 
onLoad:function(){
 var that=this;
  wx.downloadFile({

    url: "https://waferpreview-1257041495.cos.ap-guangzhou.myqcloud.com/group.png" ,

    success: function (res) {

      console.log('downloadFile success, res is', res)

      that.setData({

        tempFilePath: res.tempFilePath
      })


    },
    fail: function ({ errMsg }) {
      console.log('downloadFile fail, err is:', errMsg)
    }
  })
  
} 
 
})
