//解决浏览器不兼容问题
function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name]
	}
	else
	{
		return getComputedStyle(obj,false)[name]
	}
}

/*获取oParent下className为nClassd的元素*/
function getByClass(oParent,nClass)
{
	var eLe = oParent.getElementsByTagName('*');
	var aRrent  = [];
	for(var i=0; i<eLe.length; i++)
	{
		if(eLe[i].className == nClass)
		{
			aRrent.push(eLe[i]);
		}
	}
	return aRrent;
}

/*为滚动设置定时器*/
function startMove(obj,json,fnEnd){	
	
	clearInterval(obj.timer);
		
	obj.timer = setInterval(function()
	{	
		
		for(var attr in json){
		
			var cur = 0;	
			
			var bStop = true;    //假设所有的都达到目标值
				
			if(attr == 'opacity')
			{
				cur = Math.round(parseFloat(getStyle(obj,attr))*100); //Math.round()取整，完全舍去小数
			}
			else
			{
				cur = parseInt(getStyle(obj,attr));				
			}
		
			var speed = (json[attr]-cur)/4;   
			
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
			{
				bStop = false;
			}

			if(attr == 'opacity')
			{			
				obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
			
				obj.style[attr] = (cur+speed)/100;
			}
			else
			{				
				obj.style[attr] = cur+speed+'px';
			}				
		}
		
		if(bStop){
			
			clearInterval(obj.timer);
			
			if(fnEnd)fnEnd(); //如果执行的函数存在，就执行该函数
		}
			
	},30);	
}

  window.onload = function()
  {
	  var oDiv = document.getElementById('playBox');
	  var oPre = getByClass(oDiv,'pre')[0];
	  var oNext = getByClass(oDiv,'next')[0];
	  var oUlBig = getByClass(oDiv,'oUlplay')[0];
	  var aBigLi = oUlBig.getElementsByTagName('li');
	  var oDivSmall = getByClass(oDiv,'smalltitle')[0]
	  var aLiSmall = oDivSmall.getElementsByTagName('li');
	 
	 /*------------------图片轮播部分----------------------*/ 
	  function tab()
	  {
	     for(var i=0; i<aLiSmall.length; i++)
	     {
		    aLiSmall[i].className = '';
	     }
	     aLiSmall[now].className = 'thistitle'
	    // startMove(oUlBig,'left',-(now*aBigLi[0].offsetWidth))
		 startMove(oUlBig,{"left":-(now*aBigLi[0].offsetWidth)});
	  }
	  var now = 0;
	  for(var i=0; i<aLiSmall.length; i++)
	  {
		  aLiSmall[i].index = i;
		  aLiSmall[i].onclick = function()
		  {
			  now = this.index;
			  tab();
		  };
	 }
	  oPre.onclick = function()
	  {
		  now--;
		  if(now ==-1)
		  {
			  now = aBigLi.length;
		  }
		   tab();
	  }
	   oNext.onclick = function()
	  {
		   now++;
		  if(now ==aBigLi.length)
		  {
			  now = 0;
		  }
		  tab();
	  }
	  var timerSlideImge = setInterval(oNext.onclick,3000); //滚动间隔时间设置
	  oDiv.onmouseover = function()
	  {
		  clearInterval(timerSlideImge);
	  }
	   oDiv.onmouseout = function()
	  {
		  timerSlideImge = setInterval(oNext.onclick,3000); //滚动间隔时间设置
	  }
	  
	  /*------------------------送至+城市--------------------------------*/
	  var oHTop= document.getElementById('header_top_city');
	  var oAllCityList = document.getElementById('head_all_city_list');
	  var oAddcity = getByClass(oHTop,"add_city")[0];
	  var selecty = getByClass(oAllCityList,"select")[0];
	  var oCity_a = oAllCityList.getElementsByTagName('a');
	  var sDefaultCity = getByClass(oHTop,"add_default_city")[0];
	  var changeCity = document.getElementById('change_city');
	 
	 oAllCityList.onmouseover=oAddcity.onmouseover = function()
	 {
		 oAddcity.style.background = "#fff";
		 oAddcity.style.borderBottom = "2px solid white";		 		 
		 oAllCityList.style.display = "block";
		 /*设置当前城市的高亮*/	 
		 
	 }
	 oAllCityList.onmouseout=oAddcity.onmouseout = function()
	 {
		 oAllCityList.style.display = "none";
		  oAddcity.style.background = "none";
		  oAddcity.style.borderBottom = "none";
	 }
	 /*--------------------------切换城市----------------------------*/
	 var cityStr = "正在切换至";
	 for(var i=0;i<oCity_a.length;i++){
	    var timer = null;
		oCity_a[i].onclick = function(){
		var that= this;
		clearTimeout(timer);
		clearTimeout(timer2);
		/*为每个城市添加点击事件*/
		for(var j=0;j<oCity_a.length;j++)
			{
				oCity_a[j].index = j;
				oCity_a[j].style.color = "#999";
				oCity_a[j].className = ""; 
			}
				/*切换城市时设置背景色*/
			that.className = "select";
			that.style.color = "#fff";  //这个地方在select中设置过样式，但是不知道为什么还要在这设置一遍才会显示
			sDefaultCity.innerHTML = this.innerHTML;
		var timer2=	setTimeout(
			function(){
			   changeCity.style.display = "block";   //显示切换至哪个城市
			   changeCity.innerHTML=cityStr+that.innerHTML+"。。。";
			   oAllCityList.style.display = "none";
			   },500);
			 
		   /*切换完毕后消失*/
			timer = setTimeout(function(){
	
				changeCity.style.display = "none";
				changeCity.innerHTML=cityStr;  //设置城市的时候不会累加
				
			},1500);
			clearTimeout(timer3);
			var timer3=	setTimeout(
			function(){				
				 changeCity.style.display = "none";			
				
			},2000);
		
		 }
		 
	 }
	 
	 /*----------------查看分类-------------------------*/ 
	 
	 $(".header_top_right li#see_classfy").mouseover(function(){
		 //console.log($(".header_top_right li#see_classfy").text());
		$(".head_all_kinds_list").show();   /*这有一个小bug z-index 引起的*/
		$("#see_classfy").css({"background":"#fff"});		
	});
	$(".head_all_kinds_list").mouseover(function(){
		$(".head_all_kinds_list").show();
		$("#see_classfy").css({"background":"#fff"});	
		
	});
	$("#see_classfy").mouseleave(function(){
		$(".head_all_kinds_list").hide();
		$("#see_classfy").css({"background":""});
	});
	$(".head_all_kinds_list").mouseleave(function(){
		$(".head_all_kinds_list").hide();
		$("#see_classfy").css({"background":""});
	});

	 
	var nowDiv = $(".head_list_left_div");
	var nowLi = $(".head_nav_right_ul li");
	for(var n=0;n<nowLi.length;n++){
		nowLi[n].index = n;
		nowDiv[n].index = n;
		
		nowLi[n].onmouseover=function(){
			for(var m=0;m<nowLi.length;m++){
				
				nowLi[m].style.background = "#faf9f6";
				nowDiv[m].style.display = "none";
				$(".head_nav_right_ul li a").eq(m).css("color","#464545");
				$(".head_list_left").css({"margin-left":"36px"});
			}	
			var that = this;
			nowLi[that.index].style.background = "#f88eb2";
			$(".head_nav_right_ul li a").eq(that.index).css("color","#fff");
			nowDiv[that.index].style.display = 'block';	
			//$(".head_list_left_div").eq(that.index).show("fast");

			$(".head_list_left").animate({marginLeft:"56px"});
			
		
		}
		
	
	}
	
	/*查看更多*/
	$("#see_more").mouseover(function(){
		 //console.log($(".header_top_right li#see_classfy").text());
		$(".header_sub_more").show();   /*这有一个小bug z-index 引起的*/
		$("#see_more").css({"background":"#fff"});		
	});
	$(".header_sub_more").mouseover(function(){
		$(".header_sub_more").show();
		$("#see_more").css({"background":"#fff"});	
		
	});
	$("#see_more").mouseleave(function(){
		$(".header_sub_more").hide();
		$("#see_more").css({"background":""});
	});
	$(".header_sub_more").mouseleave(function(){
		$(".header_sub_more").hide();
		$("#see_more").css({"background":""});
	});
	
	/*我的聚美*/
	$("#my_jumei").mouseover(function(){
		 //console.log($(".header_top_right li#see_classfy").text());
		$(".header_sub_jumei").show();   /*这有一个小bug z-index 引起的*/
		$("#my_jumei").css({"background":"#fff"});		
	});
	$(".header_sub_jumei").mouseover(function(){
		$(".header_sub_jumei").show();
		$("#my_jumei").css({"background":"#fff"});	
		
	});
	$("#my_jumei").mouseleave(function(){
		$(".header_sub_jumei").hide();
		$("#my_jumei").css({"background":""});
	});
	$(".header_sub_jumei").mouseleave(function(){
		$(".header_sub_jumei").hide();
		$("#my_jumei").css({"background":""});
	});
	 
	 
	 
	 /*-----------------------------------中间搜索部分---------------------------------------*/
	 /*鼠标点击输入框时提示信息的显示和消失*/
	 $(".search_input_text").click(function(){
		$(".search_suggest").show();
	});
	$(".search_input_text").mouseleave(function(){
		$(".search_suggest").hide();
	});
	$(".search_suggest").mouseleave(function(){
		$(".search_suggest").hide();
	});
	$(".search_suggest").mouseover(function(){
		$(".search_suggest").show();
		
	});
	
	$(".search_suggest li").click(function(){
		$(".search_suggest").hide("slow");
		$(".search_input_text").val($(this).text());
	});
	
	/*---小购物车--*/
	$(".center_cart_image").mouseover(function(){
		$(".center_cart_content").show();
		$(".center_cart_image .text").css({"background":"#fff"});
		$(".center_cart_image").css({"border-bottom-color":"#fff"});		
	});
	$(".center_cart_content").mouseover(function(){
		$(".center_cart_content").show();
		$(".center_cart_image .text").css({"background":"#fff"});
		$(".center_cart_image").css({"border-bottom-color":"#fff"});		
	});
	$(".center_cart_image").mouseleave(function(){
		$(".center_cart_content").hide();
		$(".center_cart_image .text").css({"background":"#F8F8F8"});
		$(".center_cart_image").css({"border-bottom-color":"#E6E6E6"});		
	});
	$(".center_cart_content").mouseleave(function(){
		$(".center_cart_content").hide();
		$(".center_cart_image .text").css({"background":"#F8F8F8"});
		$(".center_cart_image").css({"border-bottom-color":"#E6E6E6"});
				
	});
	
	/*-----导航栏的第一层-----*/
	/*--点击切换样式--*/
	var navBarL=$(".header_navBar ul li").length;
	$(".header_navBar ul li").click(function(){
		$(".header_navBar ul li").each(function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");
			}
		});	
		$(this).addClass("active");	
	});
	/*-----导航栏的第二层-----*/
	$(".header_navBar ul li:eq(3)").mouseover(function(){
		$(".header_navBar .nav_sub").show();
	});
	$(".header_navBar .nav_sub").mouseover(function(){
		$(".header_navBar .nav_sub").show();	
	});
	$(".header_navBar ul li:eq(3)").mouseleave(function(){
		$(".header_navBar .nav_sub").hide();
	});
	$(".header_navBar .nav_sub").mouseleave(function(){
		$(".header_navBar .nav_sub").hide();
	});
	
	 
	 /*----------------------------jQuery  右侧导航栏--------------------------------------*/
	/*Jquery使用mouseenter和mouseleave实现鼠标经过弹出层且可以点击*/
	$(".quick_links_panel li").mouseenter(function(){
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
		$(this).children(".ibar_login_box").css("display","block");
	});
	$(".quick_links_panel li").mouseleave(function(){
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});
		$(this).children(".ibar_login_box").css("display","none");
	});
	//鼠标移入移出时弹出的侧栏
	$(".quick_toggle li").mouseover(function(){
		$(this).children(".mp_qrcode").show();
	});
	$(".quick_toggle li").mouseleave(function(){
		$(this).children(".mp_qrcode").hide();
	});
	
	/*-----------------------------------------------------飞入购物车部分---------------*/
	// 元素以及其他一些变量
	var eleFlyElement = document.querySelector("#flyItem"), eleShopCart = document.querySelector("#shopCart");
	var numberItem = 0;
	// 抛物线运动
	var myParabola = funParabola(eleFlyElement, eleShopCart, {
		speed: 400, //抛物线速度
		curvature: 0.0008, //控制抛物线弧度
		complete: function() {
			eleFlyElement.style.visibility = "hidden";
			eleShopCart.querySelector("span").innerHTML = ++numberItem;
		}
	});
	// 绑定点击事件
	if (eleFlyElement && eleShopCart) {
		
		[].slice.call(document.getElementsByClassName("btnCart")).forEach(function(button) {
			button.addEventListener("click", function(event) {
				// 滚动大小
				var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
				eleFlyElement.style.left = event.clientX + scrollLeft + "px";
				eleFlyElement.style.top = event.clientY + scrollTop + "px";
				eleFlyElement.style.visibility = "visible";
				
				// 需要重定位
				myParabola.position().move();			
			});
		});
	}
	
	/*----------底部 bottom_top-----------*/
	$(".footer_top ul li a").mouseover(function(){
		
		//$(this).css({"padding-left":"36px"});
		$(this).animate({paddingLeft:"10px"});
	});
	$(".footer_top ul li a").mouseleave(function(){
		
		$(this).animate({paddingLeft:"0px"});
	});


		
}
  
  
  
  