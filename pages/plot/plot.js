const app = getApp()
import * as echarts from '../../ec-canvas/echarts';
var common1 = require("../common/runcacular.js");
var common2 = require("../common/translate.js");
Page({
  data: {
	ncmd1: '',
	ncmd2: '',
	ncmd3: 100,
    fgs:[],
	fuzadu:'0',
    ec: {
      lazyLoad: true
    }
  },
  onLoad: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.init_echarts();
  },
  init_echarts: function(){
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      return Chart;
    });
  },
  getOption: function () {
	console.log('aaa');
	var option = {
    legend: {},
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid:{
      left:'12%',right:'12%',height:'60%'
    },
	xAxis: {name: 'x'},
	yAxis: {name: 'y'},
    series: [
        {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: this.data.fgs
        }
    ]
	};
	return option
  },
cmdwords1: function (e) {
    this.setData({
      ncmd1: e.detail.value
    })
  },
cmdwords2: function (e) {
    this.setData({
      ncmd2: e.detail.value
    })
  },
cmdwords3: function (e) {
	var c=e.detail.value;
	if(!isNaN(c)&&c>0&&c<=10000){	
	}else{
		c=100;
	}
    this.setData({
      ncmd3: c
    })
	e.detail.value=c;
  },
running:function(e){
	var cmd1=this.data.ncmd1;
  var cmd2=this.data.ncmd2;
  var ld=this.data.ncmd3;
  cmd1 = cmd1.replace(/\*/g,'#');
  console.log(cmd1+','+cmd2);
	cmd1=common2.thans(cmd1+'#1');	
	cmd2=common2.thans(cmd2);
  var xf=cmd2.split(',');
  console.log(cmd1+','+cmd2);
  console.log(xf);
  var x=[];var d=(xf[1]*1.0-xf[0]*1.0)/ld;
  console.log(d);
	for(var i=xf[0];i<=xf[1];i=i*1.0+d*1.0){
		x.push(i);
	}console.log('x:'+x);
	common2.inputs(['pi','e','x'],['3.1415926','2.718281828',x+''],[]);
	var vl=common2.check(cmd1);
	var get=common2.runn(vl,cmd1,10000,false);
  var get2=common2.runn(11,'',10000,false);
  console.log(get);
	console.log(get2);
	var rst1=common1.toRPolish(get[2],get2[1],get2[0],1000000);
	console.log(rst1[1]*1.0/5.0);
	this.setData({
		fuzadu:rst1[1]*1.0/5.0
	})
	var rst3=rst1[0].join().split(',');
	var rst4=x.join().split(',');var rst=[];
	for(var i=0;i<Math.min(rst3.length,rst4.length);i++){
		rst.push([rst4[i],rst3[i]]);
	}
	console.log(rst);
	this.setData({
		fgs:rst
	})
	this.getChartData();
	},
   onShareAppMessage: function (res) {
    return {
      title: '绘图',
      path: '/pages/plot/plot',
      success: function () { },
      fail: function () { }
    }
  },
  getChartData: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.init_echarts();
  }
})
