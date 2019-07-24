
<template>
<div>
  <div id="allmap" ref="allmap"></div>
  <div id="r-result" ref="rResult"></div>
  <div class="_input">
    <div>
      <input type="text" @keydown.enter="handlerGetBoundary" v-model="district" class="radius_district" placeholder="请输入行政区">
      <span class="searchBtn" @click="handlerGetBoundary">行政区</span>
    </div>
    <div style="position:relative">
      <p class="font_x" @click="clearAddress">X</p>
      <input type="text" @keydown.enter="searchBtn" v-model="address" class="radius_district user_write" placeholder="请输入地点">
      <input type="text" @keydown.enter="searchBtn" v-model="radius" class="radius_district" placeholder="请输入半径(千米)">
      <span class="searchBtn" @click="searchBtn">搜索</span>
    </div>
  </div>
</div>
</template>

<script>
import { baiduMap } from '../http/map'
const img = require('../assets/logo.png')

export default {
  name: 'App',
  data () {
    return {
      address: '',
      radius: '',
      district: '',
      tempData: [
        {
          name: '趣学世界总部', // 机构名字
          address: '北京市中关村南大街31号', // 机构地址
          lat: 39.953295, // 纬度
          lng: 116.327617, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '付春燕',
          phone: '18190730323'
        },
        {
          name: '四川省成都市青羊区五朵金花教育', // 机构名字
          address: '成都市青羊区方池街17号', // 机构地址
          lat: 30.665242, // 纬度
          lng: 104.060496, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '付春燕',
          phone: '18190730323'
        },
        {
          name: '四川省成都市大邑县美涵少儿英语', // 机构名字
          address: '四川省成都市大邑县潘家街四段625号美涵学苑(佳菲牛排二楼)', // 机构地址
          lat: 30.574697, // 纬度
          lng: 103.52406, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '刘思雨',
          phone: '18200342315'
        },
        {
          name: '上海市杨浦区东方星教育培训中心（芬蓝）', // 机构名字
          address: '上海杨浦区民星路378号301室', // 机构地址
          lat: 31.317827, // 纬度
          lng: 121.545665, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '林青青',
          phone: '13918157411'
        },
        {
          name: '陕西省渭南市临渭区优唯国际少儿英语', // 机构名字
          address: '陕西省渭南市临渭区胜利大街上上国风北门西侧2楼商铺（优唯国际少儿英语）', // 机构地址
          lat: 34.51668, // 纬度
          lng: 109.474346, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '赵福明',
          phone: '18161921230'
        },
        {
          name: '江苏省南京市鼓楼区美华校区', // 机构名字
          address: '南京市玄武区龙蟠中路167号金卡大厦407室', // 机构地址
          lat: 32.079814, // 纬度
          lng: 118.818502, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '刘小勇',
          phone: '15850505580'
        },
        {
          name: '辽宁省本溪市优贝乐国际儿童教育中心', // 机构名字
          address: '辽宁省本溪市本溪满族自治县优贝乐国际儿童教育中心', // 机构地址
          lat: 41.304817, // 纬度
          lng: 124.132362, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '程禹潼',
          phone: '18641425759'
        },
        {
          name: '内蒙古自治区巴彦淖尔市临河区奇凡教育', // 机构名字
          address: '内蒙古巴彦淖尔市临河区新华西街原歌舞团二楼', // 机构地址
          lat: 40.759942, // 纬度
          lng: 107.420068, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '吴静',
          phone: '13947827920'
        },
        {
          name: '山东省东营市西城区校区欣益名教育', // 机构名字
          address: '山东省东营市西城区万家新城底商', // 机构地址
          lat: 37.48803, // 纬度
          lng: 118.527847, // 经度
          radius: 2, // 保护半径
          time: ['2019-07-24','2019-09-23'], // 合同周期
          type: '加盟', // 合作类型
          content: '招生', // 合作内容
          power: 1, // 权限 1-大客户部 2-加盟部 3-分渠道 4-严禁开发
          user: '齐裕',
          phone: '18562931343'
        },
      ]
    }
  },
  mounted () {
    this.map = new BMap.Map(this.$refs.allmap)  // 创建Map实例
    this.baiduMap()
    for (let i = 0; i < this.tempData.length; i++) {
      let point = new BMap.Point(this.tempData[i].lng, this.tempData[i].lat)
      console.log(point)
      // alert('纬度'+ array[i].location.lat + '经度' + array[i].location.lng)
      this.map.centerAndZoom(point, 5)
      let marker = new BMap.Marker(point)
      // marker.setIcon({size:(50,50)})
      this.map.addOverlay(marker)
      // 添加marker上的数字
      var label = new BMap.Label(i+1,{offset:new BMap.Size(5,4)});
      if (i+1 == 10) {
        label = new BMap.Label(i+1,{offset:new BMap.Size(1,4)});
      }
      // 设置marker上的数字样式
      label.setStyle({background:'none',color:'#fff',border:'none'})
      marker.setLabel(label);
      // 画半径2km的圆
      let Circle = new BMap.Circle(point, this.tempData[i].radius*1000, {strokeColor:'red', fillColor: '', fillOpacity: 0, strokeWeight: 2, strokeOpacity: 0.5})
      this.map.addOverlay(Circle)
      let content = `<div style="margin:0;line-height:20px;padding:2px;">
                      学校地址：${this.tempData[i].address}<br/>
                      联系人：${this.tempData[i].user}<br/>
                      联系电话：${this.tempData[i].phone}<br/>
                      保护半径：${this.tempData[i].radius}<br/>
                      合同周期：${this.tempData[i].time[0]}${this.tempData[i].time[1]}<br/>
                      课程合作类型：${this.tempData[i].type}<br/>
                      合作内容：${this.tempData[i].content}<br/>
                    </div>`
      // console.log(content)
      // let marker = new BMap.Marker(point);  // 创建标注
      // this.map.addOverlay(marker);              // 将标注添加到地图中
      this.map.centerAndZoom(point, 15);
      let opts = {
        width : 300,     // 信息窗口宽度
        height: 200,     // 信息窗口高度
        title : this.tempData[i].name , // 信息窗口标题
        // enableMessage:true,//设置允许信息窗发送短息
        // message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
      }
      let infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
      marker.addEventListener("click", () => {
        this.map.openInfoWindow(infoWindow,point); //开启信息窗口
      })
      // this.getAddressInfo(point,this.tempData[i].name,content)
    }
  },
  methods:{
    // 点击获取地址的信息
    getAddressInfo (pointD,title,content) {
      console.log(content)
      let marker = new BMap.Marker(pointD);  // 创建标注
      // this.map.addOverlay(marker);              // 将标注添加到地图中
      this.map.centerAndZoom(pointD, 15);
        let opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : title , // 信息窗口标题
          // enableMessage:true,//设置允许信息窗发送短息
          // message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        }
      let infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
      marker.addEventListener("click", () => {
        this.map.openInfoWindow(infoWindow,pointD); //开启信息窗口
      })
    },
    searchBtn () {
      // 多点搜索
      // let myKeys = ["酒店", "加油站"];
      // let local = new BMap.LocalSearch(this.map, {
      //   renderOptions:{map: this.map, panel: this.$refs.rResult},
      //   pageCapacity:5
      // });
      // local.searchInBounds(myKeys, this.map.getBounds());
      // return

      // 单点搜索
      let local = new BMap.LocalSearch(this.map, {
        renderOptions:{map: this.map}
      })
      // local.search("趣学世界")
      // return

      if (!this.address) {
        this.$message.warning('请输入地址')
        return
      } else if (!this.radius) {
        this.$message.warning('请输入半径')
        return
      }
      // this.searchData('')
      this.searchData(this.address)
      console.log(this.radius,this.address)
    },
    baiduMap () {
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);// 初始化地图,设置中心点坐标和地图级别

      let pointC = new BMap.Point(116.404, 39.805)
      let Circle = new BMap.Circle(pointC, 10000, {strokeColor:'blue', fillColor: '', fillOpacity: 0, strokeWeight: 5, strokeOpacity: 0.5})
      // this.map.addOverlay(Circle)

      let pointA = new BMap.Point(116.404, 39.915)
      let pointB = new BMap.Point(116.404, 39.905)
      // alert('从大渡口区到江北区的距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。');  //获取两点距离,保留小数点后两位
      // let polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
      // this.map.addOverlay(polyline);     //添加折线到地图上

      this.map.addControl(new BMap.MapTypeControl({//添加地图类型控件
        mapTypes:[
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]}))

        let citysSze = new BMap.Size(10, 20);
        this.map.addControl(new BMap.CityListControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: citysSze,
            // 切换城市之间事件
            // onChangeBefore: function(){
            //    alert('before');
            // },
            // 切换城市之后事件
            // onChangeAfter:function(){
            //   alert('after');
            // }
        }));

      // 根据ip定位
      // let that = this
      // function myFun(result){
      //   var cityName = result.name;
      //   that.map.setCenter(cityName);
      //   alert("当前定位城市:"+cityName);
      // }
      // var myCity = new BMap.LocalCity();
      // myCity.get(myFun);

      // 带搜索框的信息提示框
      let poi = new BMap.Point(116.307852,40.057031);
      let content = `<div style="margin:0;line-height:20px;padding:2px;">
                      <img src="${img}" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>
                      地址：北京市海淀区上地十街10号<br/>电话：(010)59928888<br/>简介：百度大厦位于北京市海淀区西二旗地铁站附近，为百度公司综合研发及办公总部。
                    </div>`
      //创建检索信息窗口对象
      let searchInfoWindow = null;
      searchInfoWindow = new BMapLib.SearchInfoWindow(this.map, content, {
        title  : "百度大厦",      //标题
        width  : 290,             //宽度
        height : 105,              //高度
        panel  : "panel",         //检索结果面板
        enableAutoPan : true,     //自动平移
        searchTypes   :[
          BMAPLIB_TAB_SEARCH,   //周边检索
          BMAPLIB_TAB_TO_HERE,  //到这里去
          BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
      })
      let searchMarker = new BMap.Marker(poi); //searchMarker
      searchMarker.enableDragging(); //searchMarker可拖拽
      // 拖拽获取坐标
      searchMarker.addEventListener("dragend", function(e){
        console.log(e)
        let a = searchMarker.getPosition()
        console.log(a)
      })
      searchMarker.addEventListener("click", function(e){
        searchMarker.addEventListener("dragend", function(e){
          console.log(e)
          let a = searchMarker.getPosition()
          console.log(a)
        })
        searchInfoWindow.open(searchMarker);
      })
      // this.map.addOverlay(searchMarker); //在地图中添加marker

      // 信息窗口
      let pointD = new BMap.Point(116.417854,39.921988);
      let marker = new BMap.Marker(pointD);  // 创建标注
      // this.map.addOverlay(marker);              // 将标注添加到地图中
      this.map.centerAndZoom(pointD, 15);
        let opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : "海底捞王府井店" , // 信息窗口标题
          enableMessage:true,//设置允许信息窗发送短息
          message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        }
      let infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象
      marker.addEventListener("click", () => {
        this.map.openInfoWindow(infoWindow,pointD); //开启信息窗口
      })
      // 允许拖拽
      marker.enableDragging(); //marker
      marker.addEventListener("dragend", function(e){
        let a = marker.getPosition()
        console.log(a)
      })

      // 鼠标拾取坐标
      this.map.addEventListener("click",(e) => {
        // console.log(e)
        console.log(e.point.lng + "," + e.point.lat)
        var geoc = new BMap.Geocoder()
        var pt = e.point
        geoc.getLocation(pt, function(rs){
          var addComp = rs.addressComponents
          console.log(addComp)
          console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        })
      })

      this.map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    async searchData (mapLocation) {
      // 清楚地图上的已有的覆盖物
      this.map.clearOverlays()
      let param = {
        address: mapLocation,
        city: '北京'
      }
      let data = await baiduMap(param)
      if (data.status === 0) {
        let array = data.results
        for (let i = 0; i < array.length; i++) {
          let point = new BMap.Point(array[i].location.lng, array[i].location.lat)
          console.log(point)
          // alert('纬度'+ array[i].location.lat + '经度' + array[i].location.lng)
          this.map.centerAndZoom(point, 15)
          let marker = new BMap.Marker(point)
          // marker.setIcon({size:(50,50)})
          this.map.addOverlay(marker)
          // 添加marker上的数字
          var label = new BMap.Label(i+1,{offset:new BMap.Size(5,4)});
          if (i+1 == 10) {
            label = new BMap.Label(i+1,{offset:new BMap.Size(1,4)});
          }
          // 设置marker上的数字样式
          label.setStyle({background:'none',color:'#fff',border:'none'})
          marker.setLabel(label);
          // 画半径2km的圆
          let Circle = new BMap.Circle(point, this.radius*1000, {strokeColor:'red', fillColor: '', fillOpacity: 0, strokeWeight: 2, strokeOpacity: 0.5})
          this.map.addOverlay(Circle)
        }
      }
    },
    // 划分行政区
    // 添加行政区划分
    getBoundary () {
      var bdary = new BMap.Boundary();
      bdary.get(this.district, (rs) => {       //获取行政区域
        this.map.clearOverlays()       //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
          alert('未能获取当前输入行政区域');
          return ;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
          this.map.addOverlay(ply);  //添加覆盖物
          pointArray = pointArray.concat(ply.getPath());
        }
        this.map.setViewport(pointArray);    //调整视野
        this.addlabel()
      });
    },
    addlabel () {
	    var pointArray = [
	      new BMap.Point(121.716076,23.703799),
	      new BMap.Point(112.121885,14.570616),
        new BMap.Point(123.776573,25.695422)
      ]
	    var optsArray = [{},{},{}];
	    var labelArray = [];
	    var contentArray = [
	      "台湾是中国的！",
	      "南海是中国的！",
	      "钓鱼岛是中国的！"];
	    for(var i = 0;i < pointArray.length; i++) {
	      optsArray[i].position = pointArray[i];
	      labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
	      labelArray[i].setStyle({
          color : "red",
          fontSize : "12px",
          height : "20px",
          lineHeight : "20px",
          fontFamily:"微软雅黑"
			  });
	      this.map.addOverlay(labelArray[i]);
	    }
    },
    handlerGetBoundary () {
      this.getBoundary()
    },
    clearAddress () {
      this.address = ''
    }
  }
}
</script>

<style>
p {
  margin: 0px;
  padding: 0px;
}
#allmap{
  height: 600px;
}
._input {
  position: fixed;
  top: 50px;
  right: 0px;
  display: flex;
  align-items: center;
}
.font_x {
  position: absolute;
  left: 40%;
  top: 4px;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #aaa;
}
.user_write {
  width: 250px;
}
.radius_district {
  height: 30px;
  font-size: 16px;
  border-radius: 20px;
  outline-style: none;
  border: 2px solid blue;
  padding: 0 20px;
}
.BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none!important;
}
.anchorBL {
  display: none!important;
}
.searchBtn {
  width: 100px;
  font-size: 20px;
  border-radius: 10px;
  border: 2px solid red;
  display: inline-block;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: pink;
  cursor: pointer;
}
</style>
