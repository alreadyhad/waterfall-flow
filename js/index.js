window.onload = function(){

	var Oul = document.getElementById('ul1');
	var Ali = Oul.getElementsByTagName('li');
	var ipage = 1;
	var boff = true;

	getpicList();
	window.onscroll = function(){
		var _index = getheightmin();
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop+document.documentElement.clientHeight>Ali[_index].offsetHeight + getTop(Ali[_index]) ){
					if(boff){
						boff=false;
						ipage++;
						getpicList();
					}
			}
	}
	function getpicList(){
		Ajax('get','getPics.php','cpage='+ipage,function(data){
		var data = JSON.parse(data);
		if(!data.length){
			return;
		}
		for(var i=0; i<data.length; i++){
			var _index = getheightmin ();
			var Odiv = document.createElement('div');
			var Oimg = document.createElement('img');
			var Op = document.createElement('p');
			Oimg.src = data[i].preview;
			Op.innerHTML = data[i].title;
			Oimg.style.width = '225px';
			Oimg.style.height =  data[i].height * ( 225 / data[i].width ) + 'px';
			Odiv.appendChild(Oimg);
			Odiv.appendChild(Op);
			Ali[_index].appendChild(Odiv);
		}
		boff=true
	});
}

	function getTop(obj) {
		var iTop = 0;
		while(obj) {
			iTop += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return iTop;
	}
	function getheightmin (){
		var index = 0;
		var ih = Ali[index].offsetHeight;
		for (var i = 1; i<Ali.length; i++){
			if(Ali[i].offsetHeight<ih){
				index = i;
				ih = Ali[index].offsetHeight;
			}		
		}
		return index;
	}
}



function Ajax(method,url,data,fn){
	var Xhr = null;
	try{
		Xhr = new XMLHttpRequest();
	}catch(e){
		Xhr = new ActiveXObject('Microsoft,XMLHTTP');
	}
	if(method == 'get' && data){
		url += '?'+data;
	}
	Xhr.open(method,url,true);
	if(method == 'get'){
		Xhr.send();
	}else{
		Xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		Xhr.send(data);
	}
	Xhr.onreadystatechange = function (){
		if(Xhr.readyState==4){
			if(Xhr.status==200){
				fn&&fn(Xhr.responseText);
			}else{
				alert('Error：'+Xhr.status);
			}
		}
	}
}