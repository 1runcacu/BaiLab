var baoliu=10000;
function toRPolish(ts,datsn,dats,baoli){
	baoliu=baoli;
    var regex = /(\+|\-|\*|\/|\~|\^|\%|\#)+/;ts = ts.replace(/sqrt/g,'√');
	ts = ts.replace(/（/g,'(');ts = ts.replace(/）/g,')');ts = ts.replace(/\ +/g,'');
	ts = ts.replace(/[\r\n]/g,"");ts = ts.replace(/ /g,'');
	ts = ts.replace(/sin/g,'1#sin~');ts = ts.replace(/cos/g,'1#cos~');ts = ts.replace(/tan/g,'1#tan~');ts = ts.replace(/asin/g,'1#asin~');
	ts = ts.replace(/acos/g,'1#acos~');ts = ts.replace(/atan/g,'1#atan~');ts = ts.replace(/exp/g,'1#exp~');ts = ts.replace(/lg/g,'1#lg~');
	ts = ts.replace(/ln/g,'1#ln~');ts = ts.replace(/RA/g,'1#RA~');ts = ts.replace(/TA/g,'1#TA~');ts = ts.replace(/TN/g,'1#TN~');
	ts = ts.replace(/UP/g,'1#UP~');ts = ts.replace(/rref/g,'1#rref~');ts = ts.replace(/inv/g,'1#inv~');ts = ts.replace(/det/g,'1#det~');
	ts = ts.replace(/√/g,'1#√~');ts = ts.replace(/rand/g,'1#rand~');ts = ts.replace(/abs/g,'1#abs~');ts = ts.replace(/ceil/g,'1#ceil~');
	ts = ts.replace(/floor/g,'1#floor~');ts = ts.replace(/round/g,'1#round~');ts = ts.replace(/\)/g,'~)');ts = ts.replace(/\(/g,'(~');
	ts = ts.replace(/~~/g,'~');
	var name=['0','-1','1','pi','e'];
	var thdats=[];
    var array = ts.split(regex);
	var arr1=[];
	var j=5;
	var key=['(',')','+','-','*','#','/','^','%','sin','cos','tan','asin','acos','atan','exp','ln','lg','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round'];
	for(var i in array){
		if(array[i]!='~'&&array[i]!=''){
			arr1.push(array[i]);
		}
	}
	console.log('表达式分解:'+arr1);
	for(var i in arr1){
		if(key.indexOf(arr1[i])==-1){
			if(name.indexOf(arr1[i])==-1){
				name.push(arr1[i]);
				var t=[];
				t.push(j);
				arr1.splice(i,1,t);
				j++;
			}else{
				var t=[];
				t.push(name.indexOf(arr1[i]));
				arr1.splice(i,1,t);
			}
		}
	}
	if(arr1[0]=='-'){
		arr1.splice(0,0,'0');
	}
	if(arr1[0]=='+'){
		var a=[];
		a.push(arr1[1]);
		arr1.splice(0,2,a);
	}
	for(var i=0;i<arr1.length;i++){
		if(arr1[i]=='('){
			if(arr1[i+1]=='-'){
				var ths=[];
				ths.push('1');ths.push('*');
				ths.push(arr1[i+2]);
				arr1.splice(i+1,2,ths);
				i=i-1;
			}
			if(arr1[i+1]=='+'){
				arr1.splice(i+1,2,arr1[i+2]);
				i=i-1;
			}
		}
	}
	console.log('此刻的表达式:'+arr1);
	console.log('name:'+name);
	for(i in name){
		if(isNaN(name[i]+'')){
			name[i]=dats[datsn.indexOf(name[i])];
			i--;
		}
	name[0]='0';name[1]='-1.0';name[2]='1.0';name[3]='3.141592653589793';name[4]='2.7182845904523536';
	}
	console.log('最后的name:'+name);
	arr1=arr1.join().split(',');
	var num=trans(arr1);var tsname=[];
	for(var i in name){
		tsname.push(gave(name[i]));
	}
	return cacular(num,tsname);
}
function trans(arr1){
	var keys=['#','(',')','*','/','%','^','+','-','sin','cos','tan','asin','acos','atan','exp','ln','lg','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round'];
	var key1=['2','3','-1','2','2','2.5','2.5','1','1','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7'];
	var key2=['2','0','-1','2','2','2.5','2.5','1','1','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7','2.7'];
	var fun=['sin','cos','tan','asin','acos','atan','exp','ln','lg','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round'];
	var num=[];
	var key=[];
	var arr2=arr1;
	arr2.reverse();
	while(arr2.length>0){
		var ts=arr2.pop();
		var n=keys.indexOf(ts);
		if(n==-1){
			num.push(ts);
		}else{
			if(key.length==0){
				key.push(ts);
			}else{
				var cd=keys.indexOf(key[key.length-1]);
				if(ts=='('||key1[n]*1.0>key2[cd]*1.0){
					key.push(ts);
				}else{
					var a;
					if(key1[n]==-1){
						while(true){
							a=key.pop();
							if(a=='('||key.length==0){break;}
							num.push(a);
						}
						a=key.pop();
						if(fun.indexOf(a)!=-1){
							num.push(a);
						}else{
							key.push(a);
						}
					}
					if(key1[n]!=-1){
						while(true){
							cd=keys.indexOf(key[key.length-1]);
							if(key1[n]>key2[cd]||key[key.length-1]=='('||key.length==0){break;}
							a=key.pop();
							num.push(a);
						}
						key.push(ts);
					}
				}
			}
		}
	}
	while(true){
		if(key.length==0){break;}
		a=key.pop();
		num.push(a);
	}
	for(var i=0;i<num.length;i++){
		if(num[i]=='('||num[i]==')'||num[i]==undefined||num[i]==''){
			num.splice(i,1);
		}
	}
	console.log('后缀表达式检测:'+num);
	return num;
}
function cacular(num,name){
	var keys=['(',')','*','#','/','%','^','+','-','sin','cos','tan','asin','acos','atan','exp','ln','lg','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round'];
	let fun=['sin','cos','tan','asin','acos','atan','exp','ln','lg','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round'];
	var i=0;var j=0;//console.log('传入参数检测:'+num+'、'+name);
	let smu=['*','/','%','^','+','-','#'];
	while(num.length>1&&j<500){
		if(fun.indexOf(num[0])!=-1||smu.indexOf(num[0])!=-1||smu.indexOf(num[1])!=-1){return '表达式错误';}
		if(keys.indexOf(num[i])==-1){
			i++;
		}else{
			console.log('num的情况:'+num);
			console.log('数据情况:'+name);
			var a=1.0,b=1.0;
			if(i>0){
				a=name[num[i-1]*1];
			}
			if(i>1){
				b=name[num[i-2]*1];
			}
			console.log('输入参数:'+b+','+a);
			var rst=func(num[i]+'',b,a);
			if(rst=='出现降秩矩阵'){
				return '表达式运算出现降秩矩阵求逆';
			}
			if(fun.indexOf(num[i])==-1){
				name.push(rst);
				num.splice(i-2,3,(name.length-1)+'');
			}else{
				name.push(rst);
				num.splice(i-1,2,(name.length-1)+'');
			}
			i=0;
		}
		j++;
	}
	console.log('表达式情形:'+fun.indexOf(num[0])+'>>>'+smu.indexOf(num[0])+'>>>'+smu.indexOf(num[1]));
	console.log('复杂度:'+j);
	/*if(j==500){
		console.log('执行500次');
		return '运行已超时,复杂度为:1,最终结果为:'+name[num[0]];
	}*/
	return [name[num[0]],j];
}
function func(fname,dat3,dat4){
	var rt;//console.log('计算输入检测:'+dat3+'、'+dat4);
	var fuc=['*','/','%','^','+','-','sin','cos','tan','asin','acos','atan','exp','lg','ln','RA','TA','TN','UP','rref','inv','det','√','rand','abs','ceil','floor','round','#'];
	var ll=fuc.indexOf(fname);var cb1=!isNaN(dat3+'');var cb2=!isNaN(dat4+'');var dat1,dat2;
	console.log('cb1:cb2'+cb1+','+cb2);
	if(!cb1){var n=dat3.length;
		dat1=gave(dat3);
	}else{
		dat1=dat3*1.0;
	}
	if(!cb2){var n=dat4.length;
		dat2=gave(dat4);
	}else{
		dat2=dat4*1.0;
	}
	//console.log('输入数据格式检测:'+dat1+'、'+dat2);
	switch(ll){
		case 0://'*' 
			if(cb1&&cb2){
				rt=dat1*1.0*dat2;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<dat1.length;i++){
					var fs=[];
					for(var j=0;j<dat2[0].length;j++){
						var s=0;
						for(var k=0;k<dat2.length;k++){
							s+=dat1[i][k]*dat2[k][j]*1.0;
						}
						fs.push(s);
					}
					rt.push(fs);
				}
			}else if(!cb1&&cb2){
				for(var i in dat1){
					var datf4=[];
					for(var j in dat1[i]){
						datf4.push(dat1[i][j]*dat2*1.0);
					}
					rt.push(datf4);
				}
			}else{
				for(var i in dat2){
					var datf4=[];
					for(var j in dat2[i]){
						datf4.push(dat2[i][j]*dat1*1.0);
					}
					rt.push(datf4);
				}
			}
			break;
		case 1://'/'
			if(cb1&&cb2){
				rt=dat1*1.0/dat2;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(dat1[i][j]*1.0/dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(dat1[i][j]*1.0/dat2*1.0);
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(dat1*1.0/dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}
			break;
		case 2://'%'
			if(cb1&&cb2){
				rt=dat1*1.0%dat2;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(dat1[i][j]*1.0%dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(dat1[i][j]*1.0%dat2*1.0);
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(dat1*1.0%dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}
			break;
		case 3://'^'
			if(cb1&&cb2){
				rt=Math.pow(dat1*1.0,dat2*1.0);
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(Math.pow(dat1[i][j]*1.0,dat2[i][j]*1.0));
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(Math.pow(dat1[i][j]*1.0,dat2*1.0));
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(Math.pow(dat1*1.0,dat2[i][j]*1.0));
					}
					rt.push(datf4);
				}
			}
			break;
		case 4://'+'
			if(cb1&&cb2){
				rt=dat1*1.0+dat2*1.0;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(dat1[i][j]*1.0+dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(dat1[i][j]*1.0+dat2*1.0);
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(dat1*1.0+dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}
			break;
		case 5://'-'
			if(cb1&&cb2){
				rt=dat1*1.0-dat2*1.0;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(dat1[i][j]*1.0-dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(dat1[i][j]*1.0-dat2*1.0);
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(dat1*1.0-dat2[i][j]*1.0);
					}
					rt.push(datf4);
				}
			}
			break;
		case 6://'sin'
			if(cb2){
				rt=Math.sin(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.sin(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 7://'cos'
			if(cb2){
				rt=Math.cos(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.cos(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 8://'tan'
			if(cb2){
				rt=Math.tan(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.tan(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 9://'asin'
			if(cb2){
				rt=Math.asin(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.asin(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 10://'acos'
			if(cb2){
				rt=Math.acos(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.acos(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 11://'atan'
			if(cb2){
				rt=Math.atan(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.atan(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 12://'exp'
			if(cb2){
				rt=Math.exp(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.exp(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 13://'lg'
			if(cb2){
				rt=Math.log(dat2*1.0)/Math.log(10.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.log(dat2[i][j]*1.0)/Math.log(10.0));
					}
				}
			}
			break;
		case 14://'ln'
			if(cb2){
				rt=Math.log(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.log(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 15://'RA'
			if(cb2){
				if(dat2*1==0){
					rt=0+'';
				}else{
					rt=1+'';
				}
				break;
			}else{
				var m=dat2.length,n=dat2[0].length;
				for(var i=0;i<n;i++){
					for(var j=i;j<m;j++){
						var k=i;
						for(k=i;k<n;k++){
							if(Math.abs(dat2[j][k])>0.000001){
								break;
							}
						}
						for(var u=k+1;u<n;u++){
							dat2[j][u]=dat2[j][u]*1.0/dat2[j][k];
						}
						if(k!=n){
							dat2[j][k]=1;
						}
					}
					var k=i;
					for(k=i;k<m;k++){
						if(dat2[k][i]*1!=0){
							break;
						}
					}
					if(k==m){break;}
					var t=dat2[k];dat2[k]=dat2[i];dat2[i]=t;
					for(var j=i+1;j<m;j++){
						if(dat2[j][i]*1!=0){
							for(var u=i;u<n;u++){
								dat2[j][u]-=dat2[i][u];
							}
						}
					}
				}
				var rt=0;
				for(var i=0;i<dat2.length;i++){
					if(dat2[i].indexOf(1)!=-1){
						rt++;
					}
				}
				rt=rt;
			}
			break;
		case 16://'TA'
			if(cb2){
				rt=dat2*1.0;
				break;
			}else{
				rt=[];
				for(var i=0;i<dat2[0].length;i++){
					var datf3=[];
					for(var j=0;j<dat2.length;j++){
						datf3.push(dat2[j][i]);						
					}
					rt.push(datf3);
				}
			}
			break;
		case 17://'TN'
			if(cb2){
				rt=dat2*1.0;
				break;
			}else{
				rt=func('TA',1,dat2);
				rt.reverse();
				rt=func('TA',1,rt);
			}
			break;
		case 18://'UP'
			if(cb2){
				rt=dat2*1.0;
				break;
			}else{
				rt=gave(dat2);
				rt.reverse();
			}
			break;
		case 19://'rref'
			if(cb2){
				if(dat2*1==0){
					rt=0;
				}else{
					rt=1;
				}
				break;
			}else{
				rt=gave(dat2);
				var m=rt.length,n=rt[0].length;
				for(var i=0;i<n;i++){
					for(var j=i;j<m;j++){
						var k=i;
						for(k=i;k<n;k++){
							if(Math.abs(rt[j][k])>0.000001){
								break;
							}
						}
						for(var u=k+1;u<n;u++){
							rt[j][u]=rt[j][u]*1.0/rt[j][k];
						}
						if(k!=n){
							rt[j][k]=1;
						}
					}
					var k=i;
					for(k=i;k<m;k++){
						if(rt[k][i]*1!=0){
							break;
						}
					}
					if(k==m){break;}
					var t=rt[k];rt[k]=rt[i];rt[i]=t;
					for(var j=i+1;j<m;j++){
						if(rt[j][i]*1!=0){
							for(var u=i;u<n;u++){
								rt[j][u]-=rt[i][u];
							}
						}
					}
				}
				for(var i=1;i<m;i++){
					var t=rt[i].indexOf(1);
					if(t==-1){break;}
					for(var l=0;l<i;l++){
						for(var j=t+1;j<n;j++){
							rt[l][j]=rt[l][j]-rt[l][t]*rt[i][j];
						}
						rt[l][t]=0;
					}
				}
			}
			break;
		case 20://'inv'
			if(cb2){
				rt=1.0/dat2;
				break;
			}else{
				rt=gave(dat2);
				var n=Math.min(rt.length,rt[0].length);
				if(func('det','1',rt)==0){
					return '出现降秩矩阵';
				}
				for(var i=0;i<n;i++){
					for(var j=0;j<n;j++){
						if(i==j){
							rt[i].push(1);
						}else{
							rt[i].push(0);
						}
					}
				}
				rt=func('rref','1',rt);
				rt=func('TA','0',rt);
				var datf3=[];
				for(var u=0;u<n;u++){
					datf3.push(rt.pop());
				}
				datf3=func('TA','0',datf3);
				rt=func('TN','0',datf3);
			}
			break;
		case 21://'det'
			if(cb2){
				rt=dat2*1.0;
				break;
			}else{
				var asd=gave(dat2);
				n=Math.min(asd.length,asd[0].length);
				s=1.0;
				for(var k=0;k<n;k++){
					var max=Math.abs(asd[k][k]);
					var m=k;var ff=true;
					for(var i=k;i<n;i++){
						if(asd[i][k]!=0){
							ff=false;
							break;
						}
					}
					if(ff){rt=0;break;}
					for(var l=k+1;l<n;l++){
						if(max<Math.abs(asd[l][k])){
							m=l;
						}						
					}
					if(k!=m){
						var t=asd[k];
						asd[k]=asd[m];
						asd[m]=t;
						s=-s;
					}
					var tp=asd[k][k];
					for(var j=k+1;j<n;j++){
						asd[k][j]=asd[k][j]*1.0/tp;
					}
					for(var i=k+1;i<n;i++){
						for(var j=k+1;j<n;j++){
							asd[i][j]=asd[i][j]*1.0-asd[i][k]*asd[k][j];
						}
					}
				}
				for(var i=0;i<n;i++){
					s=s*asd[i][i];
				}
				rt=s;
			}
			break;
		case 22://'√'
			if(cb2){
				rt=Math.sqrt(Math.abs(dat2*1.0));
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.sqrt(Math.abs(dat2[i][j]*1.0)));
					}
				}
			}
			break;
		case 23://'rand'
			if(cb2){
				rt=dat2*1.0*Math.random();
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(dat2[i][j]*1.0*Math.random());
					}
				}
			}
			break;
		case 24://'abs'
			if(cb2){
				rt=Math.abs(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.abs(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 25://'ceil'
			if(cb2){
				rt=Math.ceil(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.ceil(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 26://'floor'
			if(cb2){
				rt=Math.floor(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.floor(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 27://'round'
			if(cb2){
				rt=Math.round(dat2*1.0);
				break;
			}else{
				rt=[];
				for(var i in dat2){
					rt.push([]);
					for(var j in dat2[i]){
						rt[i].push(Math.round(dat2[i][j]*1.0));
					}
				}
			}
			break;
		case 28://'#'
			if(cb1&&cb2){
				rt=dat1*1.0*dat2;
				break;
			}rt=[];
			if(!cb1&&!cb2){
				for(var i=0;i<Math.min(dat1.length,dat2.length);i++){
					var datf4=[];
					for(var j=0;j<Math.min(dat1[0].length,dat2[0].length);j++){
						datf4.push(dat1[i][j]*1.0*dat2[i][j]);
					}
					rt.push(datf4);
				}
			}else if(!cb1&&cb2){
				for(var i=0;i<dat1.length;i++){
					var datf4=[];
					for(var j=0;j<dat1[0].length;j++){
						datf4.push(dat1[i][j]*1.0*dat2);
					}
					rt.push(datf4);
				}	
			}else{
				for(var i=0;i<dat2.length;i++){
					var datf4=[];
					for(var j=0;j<dat2[0].length;j++){
						datf4.push(dat1*1.0*dat2[i][j]);
					}
					rt.push(datf4);
				}
			}
			break;
	}
	//console.log('计算处理前:'+rt);
	if(!isNaN(rt+'')){
		rt=Math.round(rt*baoliu)/baoliu+'';
	}else{
		for(var i in rt){
			for(var j in rt[i]){
				rt[i][j]=Math.round(rt[i][j]*baoliu)/baoliu+'';
			}	
		}
		rt=rt;
	}
	console.log('计算结果查看:'+rt);
	return gave(rt);
}
function gave(dat2){
	let tsrt=[],tst=[];
	if(isNaN(dat2)){
		for(var i in dat2){
			tsrt.push(dat2[i]+'')
		}
		for(var i in tsrt){
			tst.push(tsrt[i].split(','));
		}
		return tst;
	}else{
		var oo=dat2+''
		tsrt.push(oo);
		return tsrt;
	}	
}
module.exports = {
  toRPolish:toRPolish,
  trans:trans,
  cacular:cacular,
  func:func
}