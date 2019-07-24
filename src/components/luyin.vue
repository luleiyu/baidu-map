<template>
  <div>录音</div>
</template>

<script>
// export default {
//   mounted() {
//     $(".luyin").on("touchstart", function() {
//       wx.startRecord({
//         success: function() {
//           START = new Date().getTime();

//           wx.onVoiceRecordEnd({
//             // 录音时间超过一分钟没有停止的时候会执行 complete 回调

//             complete: function(res) {
//               alert("最多只能录制一分钟");

//               var localId = res.localId;

//               uploadluyin(localId, 60000);
//             }
//           });
//         },

//         cancel: function() {
//           alert("用户拒绝授权录音");

//           return false;
//         }
//       });
//     });

//     $(".luyin").on("touchend", function() {
//       END = new Date().getTime();

//       //录音时间

//       luyintime = END - START;

//       if (luyintime < 2000) {
//         END = 0;

//         START = 0;

//         wx.stopRecord({});

//         alert("录音时间不能少于2秒");

//         return false;

//         //小于300ms，不录音
//       } else {
//         wx.stopRecord({
//           success: function(res) {
//             localId = res.localId;

//             uploadluyin(localId, luyintime);
//           }
//         });
//       }
//     });

//     function uploadluyin(localId, luyintime) {
//       wx.uploadVoice({
//         localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得

//         isShowProgressTips: 1, // 默认为1，显示进度提示

//         success: function(res) {
//           var serverId = res.serverId; // 返回音频的服务器端ID

//           console.log(serverId);

//           $.post(
//             "/home/xishanluyin/scyuyin",
//             {
//               serverId: serverId,

//               luyintime: luyintime
//             },

//             function(data) {
//               if (data.success == 1) {
//                 alert("录音成功");
//               } else {
//                 alert(data.msg);
//               }
//             },
//             "json"
//           );
//         }
//       });
//     }
//   }
// };
</script>
