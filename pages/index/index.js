const app = getApp()
import * as echarts from '../../ec-canvas/echarts';
var common1 = require("../common/runcacular.js");
var common2 = require("../common/translate.js");
Page({
  data: {
	logs:[],
	datsn:[],
	dats:[],
	n: 0,
	ncmd: '',
	baoliu:10000,
	runw:[],
    fgs:[],
    ec: {
      lazyLoad: true
    }
  },

  onLoad: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.init_echarts()
  },
  init_echarts: function () {
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
      left:'12%',right:'12%',height:'55%'
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
  cmdwords: function (e) {
    this.setData({
      ncmd: e.detail.value
    })
	e.detail.value=this.data.ncmd;
  },
  running:function(e){
	var cmd=this.data.ncmd;
	var logs=this.data.logs;
	var datsn=this.data.datsn;
	var dats=this.data.dats;
	var baoliu=this.data.baoliu;
	var runw=this.data.runw;
	runw.push(cmd);
	cmd=common2.thans(cmd);
	var vul=false;
	if(/read/.test(cmd)){
		vul=!vul;
		cmd=cmd.replace(/read/g,'');
	}
	this.setData({runw:runw});
	var sdf=cmd.split('。');
	for(var i in sdf){
		if(sdf[i]==''){continue;}
		common2.inputs(datsn,dats,logs);
		var vl=common2.check(sdf[i]);
		console.log('firstvl:'+vl);
		var get=common2.runn(vl,sdf[i],baoliu,vul);
		console.log('get:'+get);
		var gns=common2.getnums();
		logs=gns[0];datsn=gns[1];dats=gns[2];
		this.save(datsn,dats,logs,baoliu);
		console.log('gns:'+gns);
		console.log('vl:'+vl);
		if(vl==4){baoliu=get;}
		if(vl==2){
			var get2=common2.runn(11,'',baoliu,vul);
			console.log(get2);
			var rst1=common1.toRPolish(get[0]+'#1',get2[1],get2[0],1000000);
			var rst2=common1.toRPolish(get[1]+'#1',get2[1],get2[0],1000000);
			logs.pop();logs.push('绘图如下:'+'复杂度分别为:'+rst1[1]*1.0/5+'% , '+rst2[1]*1.0/5+' %');
			this.save(datsn,dats,logs,baoliu);
			rst1=rst1[0];rst2=rst2[0];
			var rst3=rst1.join().split(',');
			var rst4=rst2.join().split(',');var rst=[];
			for(var i=0;i<Math.min(rst3.length,rst4.length);i++){
				rst.push([rst3[i],rst4[i]]);
			}
			console.log(rst);
			this.setData({
				fgs:rst
			})
			this.getChartData();
		}
		if(vl==11){
			baoliu=this.data.baoliu;
			var result=common1.toRPolish(get[2],get[1],get[0],baoliu);
			console.log('result:'+result);
			if(result[1]*1.0<500){
				logs.push('复杂度为:'+result[1]*1.0/5+'%');
			}else{
				logs.push('运行超时,输出结果不一定正确,复杂度为:'+result[1]*1.0/5+'%');
			}
			var aas=common2.makedata(result[0]);console.log('name:'+get[3]);
			console.log('aas:'+aas);
			if(get[3]!='ans'&&get[4]){
				if(datsn.indexOf(get[3])==-1){
					datsn.push(get[3]);
					dats.push(aas);
				}else{
					dats.splice(datsn.indexOf(get[3]),1,aas);
				}
			}
			if(vul||datsn.indexOf(get[3])==-1||get[3]=='ans'){
				var arrs=aas.split(';');
				for(var i in arrs){
					logs.push(arrs[i]);
				}
			}
			this.save(datsn,dats,logs,baoliu);
		}
	}
	this.save(datsn,dats,logs,baoliu);
  },
  save: function(datsn,dats,logs,baoliu){
	this.setData({
			datsn:datsn,
			dats:dats,
			logs:logs,
			baoliu:baoliu
		})
  },
   onShareAppMessage: function (res) {
    return {
      title: 'Bai语言编译器！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  getChartData: function () {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.init_echarts();
  }
})
