const qiniuUploader = require("../../utils/qiniuUploader");
//index.js

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'NCN', // 华北区
    uptokenURL: 'https://[yourserver.com]/api/uptoken',
      // uptoken: 'xxx',
    domain: 'http://[yourBucketId].bkt.clouddn.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    imageObject: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this;
  },
  didPressChooesImage: function() {
    var that = this;
    didPressChooesImage(that);
  },
    didCancelTask: function() {
      this.data.cancelTask()
    }
});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            'imageObject': res
          });
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
        {
          region: 'ECN', // 华北区
            //  uptokenURL: 'https://[yourserver.com]/api/uptoken',
          uptoken: 'q9yEX7UMlOVNgK37K8GjcgPCktQYoYNJp-JREc5A:EIhXYIkqDWUtkSaErcFZEjArLio=:eyJzY29wZSI6ImltYWdlOnRlc3QvMTgxMjE5L3doYXQtaXMtcHl0aG9uLnBuZyIsImRlYWRsaW5lIjoxNTQ1MjA0NjQxfQ==',
             domain: 'https://sslqn.iamlj.com',
             shouldUseQiniuFileName: false,
          key: 'test/181219/what-is-python.png',
             uptokenURL: 'myServer.com/api/uptoken'
         },
        //null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
            console.log('已经上传的数据长度', progress.totalBytesSent)
            console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({cancelTask})
        );
      }
    })
}
