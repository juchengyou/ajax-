function myAjax(opt){
	opt=opt||{};
	opt.method=opt.method||'GET';
	opt.url=opt.url||'';
	opt.async=opt.async||true;
	opt.data=opt.data||null;
	opt.dataType=opt.dataType||'JSON';
	opt.success=opt.success||function(){
		
	};
	var xmlHttp=null;
	if (XMLHttpRequest) {
		xmlHttp=new XMLHttpRequest();
	} else{
		xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	var params=[];
	for (var key in opt.data) {
		params.push(key+'='+opt.data[key]);
	}
	var postData=params.join('&');
	if (opt.dataType==='JSONP') {
		creatScript(opt.url,postData);
	} else{
		if(opt.method.toUpperCase()==='POST'){
			xmlHttp.open(opt.method,opt.url,opt.async);
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
			xmlHttp.send(postData);
		}else if(opt.method.toUpperCase()==='GET'){
			xmlHttp.open(opt.method,opt.url+'?'+postData,opt.async);
			xmlHttp.send(null);
		}
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4&&xmlHttp.status==200){
				if(opt.dataType==='JSON'){
					opt.success(xmlHttp.response);
				}
			}
		};
	}
}

function creatScript(url,data){
	var oScript=document.createElement('script');
	oScript.src=url+'?'+data+'&callback=getEn';
	document.body.appendChild(oScript);
}










