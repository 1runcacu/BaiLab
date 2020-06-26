var name=[];
var data=[];
var logs=[];
var log=[];
function inputs(nem,dat,lo){
	name=nem;
	data=dat;
	logs=lo;
}
function thans(cmd){
	cmd = cmd.replace(/（/g,'(');cmd = cmd.replace(/）/g,')');cmd = cmd.replace(/\ +/g,'');
	cmd = cmd.replace(/[\r\n]/g,'');cmd = cmd.replace(/\ /g,'');cmd = cmd.replace(/，/g,',');
	cmd = cmd.replace(/？/g,'?');cmd = cmd.replace(/；/g,';');cmd = cmd.replace(/：/g,':');
	cmd = cmd.replace(/【/g,'[');cmd = cmd.replace(/】/g,']');
	log=[];
	return cmd;
}
function check(cmd){
	console.log(cmd);
	console.log(cmd=='');
	if(/\?/.test(cmd)){
		return 3;
	}else if(/clear/.test(cmd)){
		return 0;
	}else if(/cls/.test(cmd)){
		return 1;
	}else if(/plot/.test(cmd)){
		return 2;
	}else if(/setting/.test(cmd)){
		return 4;
	}else if(/diag/.test(cmd)){
		return 5;
	}else if(/ones/.test(cmd)){
		return 6;
	}else if(/zeros/.test(cmd)){
		return 7;
	}else if(/eye/.test(cmd)){
		return 8;
	}else if(/\[/.test(cmd)||/\]/.test(cmd)){
		return 9;
	}else if(/:/.test(cmd)){
		return 10;
	}else{
		console.log('this is run');
		if(/(\*|\(|\)|\/|\%|\^|\+|\-|\#|sin|cos|tan|asin|acos|atan|exp|ln|lg|RA|TA|TN|UP|rref|inv|det|√|rand|abs|ceil|floor|round)/.test(cmd)){return 11;}
		if(/\=/.test(cmd)){
			var g=cmd.substring(cmd.indexOf('=')+1,cmd.length);
			if(!isNaN(g)){return 12;}
			if(name.indexOf(g)==-1){
				log.push('不存在数据'+g);
				return -1;
			}else{
				return 12;
			}
		}
		if(name.indexOf(cmd)==-1){
			log.push('不存在该表达式:'+cmd);
			return -1;
		}else{
			return 12;
		}
	}
	log.push('不存在该表达式:'+cmd);
	return -1;
}
function runn(key,tcmd,baoliu,vul){
	var cmd=tcmd;var tname='';
	if(/\=/.test(tcmd)){
		tname=tcmd.substring(0,tcmd.indexOf('='));
		cmd=tcmd.substring(tcmd.indexOf('=')*1.0+1,tcmd.length)
	}
	if(tname==''||!isNaN(tname)){tname='ans';}
	switch(key){
		case -1:
			logs.push(log);
			return logs;
		case 0:
			console.log('delete');
			if(/\(/.test(cmd)&&/\)/.test(cmd)){
				var m=cmd.substring(cmd.indexOf('(')+1,cmd.indexOf(')'));
				var arr=m.split(',');
				for(var i in arr){
					var j=name.indexOf(arr[i]);
					if(j!=-1){
						name.splice(j,1);
						data.splice(j,1);
					}
				}
				if(vul){logs.push(arr+'清除成功');}
				return [name,data,logs];
			}else{
				name=[];
				data=[];
				if(vul){logs.push('所有数据清除成功');}
				return [name,data,logs];
			}
		case 1:
			logs=[];
			return [];
		case 2:
			if(/\(/.test(cmd)&&/\)/.test(cmd)){
				var m=cmd.substring(cmd.indexOf('(')+1,cmd.indexOf(')'));
				var arr=m.split(',');
				return arr;
			}else{logs.push('缺少括号,表达式有误');return '缺少括号,表达式有误';}
			return [];
		case 3:
			if(/clear/.test(cmd)){
				logs.push('clear:清除所有数据');
				logs.push('clear(a,b):清除数据a、b');
			}else if(/cls/.test(cmd)){
				logs.push('cls:清除日志');
			}else if(/plot/.test(cmd)){
				logs.push('plot（x，y）绘图,x和y均可以为数学表达式');
			}else if(/setting/.test(cmd)){
				logs.push('setting:为设置保留小数点位数,如setting6,保留6位,默认保留4位');
			}else if(/diag/.test(cmd)){
				logs.push('diag创建对角矩阵,diag(a1,a2...an)');
			}else if(/ones/.test(cmd)){
				logs.push('ones创建全1矩阵,ones(m,n)或者ones(m)');
			}else if(/zeros/.test(cmd)){
				logs.push('zeros创建全0矩阵,zeros(m,n)或者zeros(m)');
			}else if(/eye/.test(cmd)){
				logs.push('eye创建全单位矩阵,eye(m,n)或者eye(m)');
			}else if(/\[/.test(cmd)||/\]/.test(cmd)){
				logs.push('[...]自定义矩阵,[a1,a2...;b1,b2...]');
			}else if(/:/.test(cmd)){
				logs.push(': 创建等差列向量,[a1,a2...;b1,b2...]');
			}else if(/\+/.test(cmd)){
				logs.push('+ :加法');
			}else if(/\-/.test(cmd)){
				logs.push('- :减法');
			}else if(/\*/.test(cmd)){
				logs.push('* :矩阵乘法');
			}else if(/\#/.test(cmd)){
				logs.push('# :点乘');
			}else if(/\//.test(cmd)){
				logs.push('/ :除法');
			}else if(/\^/.test(cmd)){
				logs.push('^ :幂运算');
			}else if(/\%/.test(cmd)){
				logs.push('% :取余');
			}else if(/asin/.test(cmd)){
				logs.push('asin :反正弦');
			}else if(/acos/.test(cmd)){
				logs.push('acos :反余弦');
			}else if(/atan/.test(cmd)){
				logs.push('atan :反正切');
			}else if(/sin/.test(cmd)){
				logs.push('sin :正弦');
			}else if(/cos/.test(cmd)){
				logs.push('cos :余弦');
			}else if(/tan/.test(cmd)){
				logs.push('tan :正切');
			}else if(/exp/.test(cmd)){
				logs.push('exp :e为底指数');
			}else if(/ln/.test(cmd)){
				logs.push('ln :e为底对数');
			}else if(/lg/.test(cmd)){
				logs.push('lg :10为底对数');
			}else if(/RA/.test(cmd)){
				logs.push('RA :矩阵求秩');
			}else if(/TA/.test(cmd)){
				logs.push('TA :转置');
			}else if(/TN/.test(cmd)){
				logs.push('TN :左右翻转');
			}else if(/UP/.test(cmd)){
				logs.push('UP :上下翻转');
			}else if(/rref/.test(cmd)){
				logs.push('rref :化简行最简型');
			}else if(/inv/.test(cmd)){
				logs.push('inv :矩阵求逆');
			}else if(/det/.test(cmd)){
				logs.push('det :求行列式');
			}else if(/sqrt/.test(cmd)||/√/.test(cmd)){
				logs.push('sqrt or √ :开平方根,此处会先对数据取绝对值再开平方');
			}else if(/rand/.test(cmd)){
				logs.push('rand :随机数');
			}else if(/abs/.test(cmd)){
				logs.push('abs :绝对值');
			}else if(/ceil/.test(cmd)){
				logs.push('ceil :上舍入');
			}else if(/floor/.test(cmd)){
				logs.push('floor :下舍入');
			}else if(/round/.test(cmd)){
				logs.push('round :四舍五入');
			}else{
				logs.push('clear:清除所有数据');logs.push('clear(a,b):清除数据a、b');logs.push('cls:清除日志');logs.push('plot（x，y）绘图,x和y均可以为数学表达式');
				logs.push('setting:为设置保留小数点位数,如setting6,保留6位,默认保留4位');logs.push('diag创建对角矩阵,diag(a1,a2...an)');
				logs.push('ones创建全1矩阵,ones(m,n)或者ones(m)');logs.push('zeros创建全0矩阵,zeros(m,n)或者zeros(m)');
				logs.push('eye创建全单位矩阵,eye(m,n)或者eye(m)');logs.push('[...]自定义矩阵,[a1,a2...;b1,b2...]');
				logs.push(': 创建等差列向量,[a1,a2...;b1,b2...]');logs.push('+ :加法');logs.push('- :减法');logs.push('* :矩阵乘法');
				logs.push('# :点乘');logs.push('/ :除法');logs.push('^ :幂运算');logs.push('% :取余');
				logs.push('sin :正弦');logs.push('cos :余弦');logs.push('tan :正切');
				logs.push('asin :反正弦');logs.push('acos :反余弦');logs.push('atan :反正切');
				logs.push('exp :e为底指数');logs.push('ln :e为底对数');logs.push('lg :10为底对数');logs.push('RA :矩阵求秩');
				logs.push('TA :转置');logs.push('TN :左右翻转');logs.push('UP :上下翻转');logs.push('rref :化简行最简型');
				logs.push('inv :矩阵求逆');logs.push('det :求行列式');logs.push('sqrt or √ :开平方根,此处会先对数据取绝对值再开平方');
				logs.push('rand :随机数');logs.push('abs :绝对值');logs.push('ceil :上舍入');logs.push('floor :下舍入');logs.push('round :四舍五入');
			}
			return [];
		case 4:
			var dt=/[0-9]/.exec(cmd);
			if(dt>=0){
				if(vul){logs.push('保留'+dt+'位小数')};
				return Math.pow(10,dt*1.0);
			}else{
				logs.push('数据有误,修改失败');
				return baoliu;
			}
		case 5:
			var mg=cmd.substring(cmd.indexOf("(")+1,cmd.indexOf(")"));
			var arr=mg.split(',');
			var arr2=[];
			var m=arr.length;
			for(var i in arr){
				var arr1=[];
				var t=0;
				for(var j=0;j<m;j++){
					if(i==j){
						t=arr[i];
					}else{
						t=0;
					}
					arr1.push(t);
				}
				arr2.push(arr1);
			}
			var gh=makedata(arr2);
			break;
		case 6:
			var jk=cmd.substring(cmd.indexOf("(")+1,cmd.indexOf(")"));
			var arr=jk.split(',');
			var arr2=[];
			var m=0,n=0;
			if(arr.length==1){
				m=arr[0];n=arr[0];
			}else{
				m=arr[0];n=arr[1];
			}
			for(var i=0;i<m;i++){
				var arr1=[];
				for(var j=0;j<n;j++){
					arr1.push(1);
				}
				arr2.push(arr1);
			}
			var gh=makedata(arr2);
			break;
		case 7:
			var jk=cmd.substring(cmd.indexOf("(")+1,cmd.indexOf(")"));
			var arr=jk.split(',');
			var arr2=[];
			var m=0,n=0;
			if(arr.length==1){
				m=arr[0];n=arr[0];
			}else{
				m=arr[0];n=arr[1];
			}
			for(var i=0;i<m;i++){
				var arr1=[];
				for(var j=0;j<n;j++){
					arr1.push(0);
				}
				arr2.push(arr1);
			}
			var gh=makedata(arr2);
			break;
		case 8:
			var jk=cmd.substring(cmd.indexOf("(")+1,cmd.indexOf(")"));
			var arr=jk.split(',');
			var arr2=[];
			var m=0,n=0;
			if(arr.length==1){
				m=arr[0];n=arr[0];
			}else{
				m=arr[0];n=arr[1];
			}
			for(var i=0;i<m;i++){
				var arr1=[];var t=0;
				for(var j=0;j<n;j++){
					if(i==j){
						t=1;
					}else{
						t=0;
					}
					arr1.push(t);
				}
				arr2.push(arr1);
			}
			var gh=makedata(arr2);
			break;
		case 9:
			if(/\[/.test(cmd)&&/\]/.test(cmd)){
				var m=cmd.substring(cmd.indexOf("[")+1,cmd.indexOf("]"));
				console.log('此时的m'+m);console.log('m的类型'+!isNaN(m));
				if(!isNaN(m)){var gh=m+'';break;}
				var arr2=[];
				var arr=m.split(';');
				var l=1;
				for(var i in arr){
					var gt=arr[i].split(',');
					if(gt.length>l){
						l=gt.length;
					}
				}
				for(var i in arr){
					var arr1=[];
					var f=arr[i].split(',');
					for(var j=0;j<l;j++){
						if(j<f.length){
							arr1.push(f[j]);
						}else{
							arr1.push(0);
						}
					}
					arr2.push(arr1);
				}
				var gh=makedata(arr2);
				break;
			}else{
				logs.push('数据异常,可能是中括号未匹配')
				return '数据异常';
			}
		case 10:
			var m=cmd.substring(cmd.indexOf('=')+1,cmd.length);
			var arr=m.split(':');var arr2=[];
			var d=1.0;var a0=0.0;var a1=0.0;
			console.log(a0);
			console.log(d);
			console.log(a1);
			if(arr.length==2){
				a0=arr[0]*1.0;
				a1=arr[1]*1.0;
			}else{
				a0=arr[0]*1.0;
				d=arr[1]*1.0;
				a1=arr[2]*1.0;
			}
			console.log(a0);
			console.log(d);
			console.log(a1);
			for(var i=a0*1.0;i<=a1;i=i+d*1.0){
				arr2.push(Math.round(i*baoliu)/baoliu);
			}
			var gh=makedata(arr2);
			break;
		case 11:
			var dan=[],da=[];
			dan=name.join().split(',');
			for(var i in data){
				da.push(makedata1(data[i]));
			}
			var tgf=/(\*|\(|\)|\/|\%|\^|\+|\-|\#|sin|cos|tan|asin|acos|atan|exp|ln|lg|RA|TA|TN|UP|rref|inv|det|√|rand|abs|ceil|floor|round)/.test(tname);
			if(tgf){logs.push('>>>'+cmd+':');}else{logs.push('>>>'+tname+'←'+cmd+':');}
			return [da,dan,cmd,tname,!tgf];
		case 12:
			logs.push('>>>'+tname+':');
			console.log('name'+tname);
			var gh;
			if(!isNaN(cmd)){gh=cmd;}else{gh=data[name.indexOf(cmd)];}
			console.log('gh:'+gh);
			if(name.indexOf(tname)==-1){
				name.push(tname);
				data.push(gh);
			}else{
				data[name.indexOf(tname)]=gh;
			}
			addlogs(gh);
			return [gh,tname,'数据添加成功'];
	}
	logs.push('>>>'+tname+':');
	if(tname!='ans'){
		if(name.indexOf(tname)==-1){
			name.push(tname);
			data.push(gh);
		}else{
			data.splice(name.indexOf(tname),1,gh);
		}
	}else{
		vul=true;
	}
	if(vul){addlogs(gh);}
	return [gh,tname,'数据添加成功'];
}
function makedata(dat){
	if(isNaN(dat)){
		var rt=dat[0]+'';
		for(var i=1;i<dat.length;i++){
			rt=rt+';'+dat[i];
		}
		return rt;
	}else{
		return dat+'';
	}
}
function makedata1(dat){
	if(isNaN(dat)){
		var arr2=[];
		var arr=dat.split(';');
		for(var i in arr){
			var arr1=[];
			var f=arr[i].split(',');
			for(var j in f){
				arr1.push(f[j]);
			}
			arr2.push(arr1);
		}
		return arr2;
	}else{
		return dat*1.0;
	}
}
function addlogs(dat){
	var arr=dat.split(';');
	for(var i in arr){
		logs.push(arr[i]);
	}
}
function getnums(){
	return [logs,name,data];
}
module.exports = {
  thans:thans,
  inputs:inputs,
  check:check,
  runn:runn,
  makedata:makedata,
  makedata1:makedata1,
  addlogs:addlogs,
  getnums:getnums
}