

function DX(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "";
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
	}  


function biotodo_again(){	

	for(var i=0;i<APP.D.uarr.length;i++){

		if(APP.DOM.logAgainUn.val()==APP.D.uarr[i]){
		    APP.STATE.IDENTIFY = true;
			break;
		}
	}

	
	

	if(APP.STATE.IDENTIFY){
		//alert(123);
		biotodo('have');
	}
	else{

		window.external.notify('loginfailed|');
	}
}


function exceed_500(){

	if($('#jymm').val()!='111111'){

		$('#pass-error').html('密码输入错误');
	}
	else{
		$('#pass-error').html('');
		//console.log(APP.D.unow);
		window.external.notify('transfer|' + APP.D.unow);
	}
}


function isEmpty(obj) 
{ 
    for (var name in obj)  
    { 
        return false; 
    } 
    return true; 
};


String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }





//登录生物验证的统一前端处理
function biotodo(isbound){
//alert(123);
	if(isbound=='have'){ //有账号的情形下的触发，即非绑定的登录

		//alert(123);
		APP.D.unow = APP.DOM.logAgainUn.val().trim();
		//console.log(APP.D.unow);

		window.external.notify('loginbyhello|' + APP.D.unow);
		return false;
	}

	else{
	

	if(APP.DOM.logUn.val().trim()==''){

		APP.DOM.uLogHint.html('请输入您的账号信息');
		return false;
	}

	else{
		//登录生物识别成功，并绑定
		APP.D.unow = APP.DOM.logUn.val().trim();
		//console.log(APP.D.unow);

		//APP.DOM.logUn.val('');
		APP.DOM.uLogHint.html('');
		window.external.notify('bindaccount|' + APP.D.unow);
		//console.log(1);
	}

	}

}

//生物验证转账处理
function biotodo_zz(dl){
	
	var cash;

	if(APP.STATE.JUMPFROM=='zz'){
		 cash = parseInt($('#trans-cash').val());
	}
	else{

		 cash = parseInt($('#trans-cash-th').val());
	}

	if(cash<500){
		console.log(APP.D.unow);
		window.external.notify('transfer|' + APP.D.unow);
	}

	else{
		$('#pass-error').html('');
		$('#jymm').val('');
		dl.show();
	}
}

//生物验证成功以后的回调
function after_input(){


		var contentDialog = document.querySelector(".win-contentdialog").winControl;
		 var dl = document.querySelector(".exceed-500-win").winControl;
		 dl.hide();
		contentDialog.show();
}


function judge_login(save,chooselogin){


	
	if(chooselogin == undefined){
	
		if(APP.DOM.logUn.val().trim()==''){

			APP.DOM.uLogHint.html('请输入您的账号信息');
			return false;
		}
	}


	APP.STATE.LOGIN = true;

	APP.DOM.uLogHint.html('');
	

	var JF = APP.STATE.JUMPFROM;

	APP.DOM.toUrlBtns[JF].trigger('click');
	APP.DOM.exitDash.removeClass('away');
	APP.DOM.loginDash.addClass('away');

	
	
	if(save!='login_not_save'){

		//如果是登录按钮触发，绑定账号
		if(chooselogin == undefined){
		
			//如果不是选择账号界面 里面的绑定
		
			//添加新的用户记录并保存
		if(APP.D.ustr!=''){

			APP.D.ustr+='|';
			APP.D.ustr+=APP.DOM.logUn.val();
			
		}
		else{
	
			APP.D.ustr = APP.DOM.logUn.val();
		}
	}
		
		localStorage.userlist = APP.D.ustr;
		
	}
	else{

		APP.D.unow = APP.DOM.logUn.val().trim();
	}



	APP.DOM.logUn.val('');
	

}
function after_input_login_bd(){

		
		judge_login(undefined,undefined);
	
	

}
function after_input_login(){

		judge_login(undefined,true);

} 			


	



//  离线的瀑布流处理方式-------------------
function empty_row(rows){

		for(var i in rows){

			rows[i].html('')
		}
}


function pubu_show(){

	var wn = document.body.clientWidth;
	var _chipbox = [$('.i-1').clone(),$('.i-2').clone(),$('.i-3').clone(),$('.i-5').clone(),$('.i-6').clone(),$('.i-4').clone()];
	var _row1 = $('.row-1');
	var _row2 = $('.row-2');
	var _row3 = $('.row-3');
	//根据页面不同宽度响应离线瀑布流处理
	if(wn>0&&wn<=550){
		empty_row();
		_row2.addClass('away');
		_row3.addClass('away');
		
		for(var i=0; i<_chipbox.length;i++){
			_row1.append(_chipbox[i][0]);
		}


	}
	else if(wn>550&&wn<=800){
		
		empty_row();
		_row2.removeClass('away');
		_row3.addClass('away');
		
		for(var i=0; i<_chipbox.length;i++){

			if((i+1)%2==0){

				_row2.append(_chipbox[i][0]);

			}
			else{

				_row1.append(_chipbox[i][0]);
			}
		}
	}
	else{

		_row2.removeClass('away');
		_row3.removeClass('away');

			for(var i=0; i<_chipbox.length;i++){

			if((i+1)%3==0){

				_row3.append(_chipbox[i][0]);

			}
			else if((i+1)%2==0){

				_row2.append(_chipbox[i][0]);
			}
			else{

				_row1.append(_chipbox[i][0]);
			}
		}

	}

}

function winSizeInit(){

		//窗口高度变化响应整体高度撑满
	window.onresize = function(){
		var H = document.body.clientHeight
		APP.DOM.leftMenu.css('height',H);
		APP.DOM.main.css('height',H);
		pubu_show();
		//console.log(12333);
	}

	APP.DOM.leftMenu.css('height',APP.D.bodyHeight); 
	APP.DOM.main.css('height',APP.D.bodyHeight);
}

//winjs dialog组件初始化
function winJsInit(){

	WinJS.UI.processAll()

	.done(function () {

		//对话框关闭绑定
		$('.win-contentdialog .win-contentdialog-backgroundoverlay').on('click',function(){
		var contentDialog = document.querySelector(".confirm-complete-win").winControl;
        var dl = document.querySelector(".exceed-500-win").winControl;
        var con = document.querySelector(".con-win-1").winControl;
        
        contentDialog.hide();
        dl.hide();
        con.hide();
		});

		//对话框弹出绑定
   		$(".btn-confirm-ok").on("click", function () {

        var contentDialog = document.querySelector(".confirm-complete-win").winControl;
        var dl = document.querySelector(".exceed-500-win").winControl;

        if($('#winrz').attr('checked')){

				
				biotodo_zz(dl);
	
		}

		else{

				contentDialog.show();
				
		}       
    		});
		});

}



//其他DOM事件初始化
function otherDomInit(){


$('#bioclick').on('click',function(){

	biotodo();
});

$('#bioagain').on('click',function(){

	biotodo_again();
})

	$('#page-zz input').on('blur',function(){

	var inputs = $('#page-zz input');
	var allright = true;

	inputs.each(function(){

		if($(this).val().trim()==''){
			allright = false;
		}
	});

	if(allright){

		$('#page-zz .zz-next-step').removeClass('disabled');
		$('#page-zz .zz-next-step').removeAttr('disabled');
	}
	else{

		$('#page-zz .zz-next-step').addClass('disabled');
		$('#page-zz .zz-next-step').attr('disabled','true');
	}


})

	$('#page-zz-th input').on('blur',function(){

	var inputs = $('#page-zz-th input');
	var allright = true;

	inputs.each(function(){

		if($(this).val().trim()==''){
			allright = false;
		}
	});

	if(allright){

		$('#page-zz-th .zz-next-step').removeClass('disabled');
		$('#page-zz-th .zz-next-step').removeAttr('disabled');
	}
	else{

		$('#page-zz-th .zz-next-step').addClass('disabled');
		$('#page-zz-th .zz-next-step').attr('disabled','true');
	}
	})


	$('#select-charge-type li').on('click',function(){

	$('#select-charge-type li').removeClass('bgorange');
	$(this).addClass('bgorange');
	
	});


	$('.fill-area .single-sel').on('click',function(){ 

	$('.fill-area .single-sel')
		.removeClass('icon-ok-sign')
		.removeClass('fgreen')
		.addClass('icon-circle-blank');
	$(this)
		.addClass('icon-ok-sign')
		.removeClass('icon-circle-blank')
		.addClass('fgreen');

		if($(this).attr('id')=='windows'){
			APP.STATE.ISWIN = true;
		}
		else{
			APP.STATE.ISWIN = false;
		}
	});


	$('#returntoindex').on('click',function(){
	 	var contentDialog = document.querySelector(".win-contentdialog").winControl;
		contentDialog.hide();
		$('#page-zz-2').addClass('away');
        $('#btn-wsyh').trigger('click');
	});


	$('.skcard-container .yhcard-radio').on('click',function(){ 
	$('.skcard-container .yhcard-radio')
		.removeClass('icon-ok-sign')
		.removeClass('fgreen')
		.addClass('icon-circle-blank');
	$(this)
		.addClass('icon-ok-sign')
		.removeClass('icon-circle-blank')
		.addClass('fgreen');
	});

	$('.fkcard-container .yhcard-radio').on('click',function(){ 

	$('.fkcard-container .yhcard-radio')
		.removeClass('icon-ok-sign')
		.removeClass('fgreen')
		.addClass('icon-circle-blank');
	$(this)
		.addClass('icon-ok-sign')
		.removeClass('icon-circle-blank')
		.addClass('fgreen');
	});


	$('#trans-cash').on('blur',function(){ 
	var T = $(this);
	$('#showCashChn').html(DX(T.val()));
	});

	$('#trans-cash-th').on('blur',function(){ 
	var T = $(this);
	$('#showCashChn-th').html(DX(T.val()));
	});

	$('#t-wygg').click(function(){
	$('#t-wygg').removeClass('lbblue');

	$(this).addClass('lbblue');

	var id = $(this).attr('id');
	$('#wygg').addClass('away');

	switch(id){	
		case 't-wygg':
			$('#wygg').removeClass('away');
		break;
	}
	});

	$('#pc-left-menu a.amainmenu')

	.on('click',function(){
	//alert('ssdfdf');
	$('.amainmenu').removeClass('fblue').removeClass('lblue');
	$(this).addClass('lblue');
	

	$('.sidebar-leftmenu li').removeClass('sidebar-border-blue li-active');
	$(this).closest('li').addClass('sidebar-border-blue li-active');

	

		$('#pc-left-menu img').each(function(){

			var baseclass = $(this).attr('class');
			$(this).attr('src','images/l-'+baseclass+'.png');
		});

		var img = $(this).find('img');
		var new_src = 'l-'+img.attr('class')+'-s.png';
		img.attr('src','images/'+new_src);

		$('.myapppage').addClass('away');
		var src = $(this).attr('href');


	APP.STATE.JUMPFROM = false;
	switch(src){
		case '#wsyh':
			$('#page-wsyh').removeClass('away');
		break;
		case '#tzlc':
			$('#page-tzlc').removeClass('away');
		break;

		case '#sz':
			$('#page-setting').removeClass('away');
		break;

		case '#mszx':
			$('#page-mszx').removeClass('away');
		break;

		case '#wh':
			$('#page-wh').removeClass('away');
		break;

	}


	})
	.on('mouseenter',function(){ 
 
	$('.sidebar-leftmenu li').removeClass('sidebar-border-blue');
		$(this).closest('li').addClass('sidebar-border-blue');


		var img = $(this).find('img');
		var new_src = 'l-'+img.attr('class')+'-s.png';
		img.attr('src','images/'+new_src); 

	})
	.on('mouseleave',function(){

		if($(this).closest('li').hasClass('li-active')){

			return false;
		}

		else{
			var img = $(this).find('img');
			var new_src = 'l-'+img.attr('class')+'.png';
			img.attr('src','images/'+new_src);
		} 
	});

	$('.backzz').on('click',function(){
	//alert('sdfsdf');
	$('#zz-btn').trigger('click');

	});


	$('#backfirstzz').on('click',function(){
	//alert('sdfsdf');
	$('#btn-wsyh').trigger('click');

	});


	$('#backfirststep').click(function(){

	$('#zz-btn').trigger('click');
	});

	$('#returnbackstep').click(function(){
	
	if(APP.STATE.JUMPFROM=='zz'){
		$('#btnbtn-khzz').trigger('click');
	}
	else if(APP.STATE.JUMPFROM=='thzz'){
		//alert('sdf');
		$('#btnbtn-thzz').trigger('click');
	}

	});

	$('.zz-next-step').on('click',function(){

	$('#page-zz').addClass('away');
	$('#page-zz-th').addClass('away');

	$('#page-zz-2').removeClass('away');

	if(APP.STATE.JUMPFROM=='zz'){
		$('#backwho').html('跨行转账');
		$('#zz-sxf').html('2.00');
		//$('#whichbank').html($('#wbank').val());
		$('#zz-wyhl-zz').removeClass('away');

		$('#zzmoney').html($('#trans-cash').val()+'.00');
		$('#zzmoney-c').html($('#showCashChn').html());
	}
	else if(APP.STATE.JUMPFROM=='thzz'){
		$('#backwho').html('本行转账');
		$('#zz-sxf').html('0.00');
		$('#zz-wyhl-zz').addClass('away');
		$('#zzmoney').html($('#trans-cash-th').val()+'.00');
		$('#zzmoney-c').html($('#showCashChn-th').html());
	}
	})

	$('#login').click(function(){
	
		judge_login('login_not_save');
	});


$('a').not('.amainmenu,.sub').on('click',function(){


	var url  = $(this).attr('href');
	///console.log(url);
	if(url=='#'){
		return false;
	}
	$('.myapppage').addClass('away');
	switch(url){
		
		case '#tologin':

			if(APP.STATE.LOGIN==false){
				APP.STATE.JUMPFROM = 'index';
				APP.DOM.loginStart.trigger('click');
			}
			else{

				$('#page-empty').removeClass('away');
			}
			
		break;

		case '#ttologin':

			if(APP.STATE.LOGIN==false){
				APP.STATE.JUMPFROM = 'prezz';
				APP.DOM.loginStart.trigger('click');
			}
			else{

				$('#page-empty').removeClass('away');
			}


		break;

		case '#zz':

			$('#page-sub-zz').removeClass('away');
		
		break;

		case '#login-win':

			if(APP.STATE.JUMPFROM === false){
				APP.STATE.JUMPFROM = 'purelogin';
				//console.log(APP.STATE.JUMPFROM);
			}

			if(localStorage.userlist!=undefined){

				
		
				

					APP.D.uarr = APP.D.ustr.split('|');
					
					if(APP.D.uarr.length==0){

						APP.D.uarr[0] = APP.D.ustr;

					}
				$('#page-choose-users').removeClass('away');
			}

			else{

				$('#page-login').removeClass('away');

			}

		break;

		case '#login-win-qz':

			$('#page-choose-users').addClass('away');
			$('#page-login').removeClass('away');

		break;

		case '#khzz':
			APP.STATE.JUMPFROM = 'zz';
			if(APP.STATE.LOGIN){

				$('#khzz-btn').trigger('click');
				
			}
			else{
				
				APP.DOM.loginStart.trigger('click');
			}

		break;
		
		case '#thzz':
			APP.STATE.JUMPFROM = 'thzz';
			if(APP.STATE.LOGIN){

				$('#thzz-btn').trigger('click');
				
			}
			else{
				
				APP.DOM.loginStart.trigger('click');
			}

		break;


		case '#khzzok':
			$('#page-zz').removeClass('away');
		break;

		case '#thzzok':
			$('#page-zz-th').removeClass('away');
		break;
	};
})

}




$(function(){


window.APP = {

	DOM:{
		main:$('#main-con'),
		checkTradeCode:$('#pass-error'),
		logAgainUn:$('#username-again'),
		loginDash:$('#login-part'),
		exitDash:$('#hasloged-part'),
		loginStart:$('#loginnn'),
		leftMenu:$('#left-menu'),
		logUn:$('#username'),
		uLogHint:$('#userhint'),
		
		toUrlBtns : {

		'zz':$('#khzz-btn'),
		'thzz':$('#thzz-btn'),
		'index':$('#btn-wsyh'),
		'prezz':$('#zz-btn'),
		'purelogin':$('#btn-wsyh')
		}
	},
	STATE:{
		LOGIN:false,
		IDENTIFY:false,
		JUMPFROM:false,
		ISWIN:false,
	},
	D:{
		bodyHeight:document.body.clientHeight,
		uarr:[],
		ustr:'',
		unow:''
	}
}


//localStorage初始化
if(localStorage.userlist != undefined){

	APP.D.ustr = localStorage.userlist ;

}
//console.log(APP.D.ustr);
if(APP.D.ustr==''){
	window.firstarr = true;
}


	//瀑布流处理
	pubu_show();


	$('#exit-loginn').on('click',function(){

		APP.STATE.LOGIN = false;
		APP.STATE.IDENTIFY = false;

		APP.DOM.loginDash.removeClass('away');
		APP.DOM.exitDash.addClass('away');

		APP.DOM.loginStart.click();
	});

	winSizeInit();
	winJsInit();
	otherDomInit();
});

