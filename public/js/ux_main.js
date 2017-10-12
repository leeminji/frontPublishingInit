/* 
site : KPX life Science
ux_main.js 
*/


//메인페이지 실행
$(document).ready(function(){
	//아래
	$('.link_visual_area ul').bxSlider({
		auto: true
	});
	//메인비쥬얼 
	$('.main_visual_section ul').bxSlider({
		auto: true,
		mode: 'fade'
	});

	//공지사항
	listSlide($('.main_board_notice')); 

	//제품
	$(".product_lastest").simpleList([{
		count : 10
	},{
		count:3
	},{
		count:4
	}]);
});


//공지사항
function listSlide(el){
	var slider = $(el);
	var viewer = $(el).find('.list_view');
	var ul = viewer.children('ul');
	var list = ul.children('li');
	var list_size = list.size();
	var btn_prev = slider.find('#btn_prev');
	var btn_next = slider.find('#btn_next');
	var timer;
	var init = function(){
		viewer.css({
			position:"relative",
			zIndex:10,
			overflow:'hidden'
		});
		ul.css({
			position:"absolute",
			zIndex:20,
			marginTop : -list.height()
		});
		ul.children('li').eq(-1).prependTo(ul);
	}
	if(list_size > 1){
		init();
		timer = setInterval(toNext,6000);
	}
	btn_prev.on("click",function(e){
		toPrev();
		e.preventDefault();
	});
	btn_next.on("click",function(e){
		toNext();
		e.preventDefault();
	});
	function toPrev(){
		clearInterval(timer);
		ul.not(":animated").animate({
			top:-list.height()
		},300,function(){
			$(this).children('li').eq(0).appendTo(ul);
			$(this).css('top',0);
			timer = setInterval(toNext,6000);
		});
	}
	function toNext(){
		clearInterval(timer);
		ul.not(":animated").animate({
			top:list.height()
		},300,function(){
			$(this).children('li').eq(-1).prependTo(ul);
			$(this).css('top',0);
			timer = setInterval(toNext,6000);
		});
	}
}



//메인 비쥬얼
function visualSlider(startNum, speed){
	var c_num = startNum;
	var v_img = $(".visual_img");
	var v_text = $(".visual_text");
	var v_page = $(".pagging");
	var v_size = v_img.size()-1;

	var init = function(){
		v_img.eq(c_num).css({'z-index': 30, display:'block'});
		v_text.eq(c_num).show().css('left' , 0);
		
		for( var i=0;i<=v_size;i++){
			var is_chk = i == c_num ? "class='on'" : "";
			v_page.append("<a href='javascript:;' "+is_chk+" >"+(i+1)+"</a>");
		}
		v_page.children('a').each(function(index){
			$(this).click(function(){
				v_stop();
				c_num = index;
				setVisual(c_num, true);
			});
		});
	}

	function setPaging(num){
		v_page.children('a').removeClass('on');
		v_page.children('a').eq(num).addClass('on');
	}

	init();
	v_start();

	function v_start(){
		t_visual = setInterval(function(){
			c_num = c_num > v_size ? 0 : c_num;
			setVisual(c_num, false);
		}, 5000);
	}

	function v_stop(){
		clearInterval(t_visual);
	}

	function setVisual(num, state){
		
		v_stop();
		var n_num = num+1 <= v_size ? num+1 : 0;
		var p_num = num-1 < 0 ? v_size : num-1;

		setPaging(num);
		c_num++;
		if( !state ){
			v_img.css({'z-index' :1});
			//클릭하지 않은 경우 : 자동동작

			v_img.eq(p_num).css({display:'block', opacity: 1, 'z-index' : 40}).stop().animate({opacity : 0}, speed);

			v_img.eq(num).css({ display:'block', opacity: 0, 'z-index' : 30}).stop().animate({opacity: 1}, speed, "linear", function(){
				$(this).css('z-index' , 40);
			});
			v_img.eq(n_num).css({display:'block', 'z-index' : 10 });
			
		}else{
			v_img.css('z-index', 1);
			//클릭하여 움직이는 경우 
			v_img.eq(p_num).css({display: 'none', opacity: 0,'z-index' : 30});
			v_img.eq(num).css({display:'block', opacity: 1, 'z-index':20});
			v_img.eq(n_num).css({display:'block', 'z-index' : 10});
		}
		
		v_text.attr('style', '').hide();
		v_text.eq(num).show().animate({"left" : 0, "opacity" : 1}, 600, "swing", function(){
			v_start();
		});
	}
}



//자리수설정
function formatZero(num, len) {
	while(num.toString().length < len) {
	num = "0" + num;
	}
	return num;
}


