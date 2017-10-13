$(document).ready(function(){
	var duration = 0.4;
	var es_step = "Expo.ease";

	var start_slide;
	var current = 0;
	var visual_lang = $(".visual_indi .indi").length;

	$(".visual_indi li.indi").on("click",function(e){
		current = $(this).index();
		if(current < visual_lang){
			visual_roll();
		}
		$(".play_btn").addClass("on");
		clearTimeout(start_slide);
	})
	$(".visual_btn li").on("mouseenter",function(e){
		TweenMax.to($(this),0.3,{opacity:1})
	})
	.on("mouseleave",function(e){
		TweenMax.to($(this),0.3,{opacity:0.5})	
	})
	$(".visual_right_btn").on("click",function(e){
		current++;
		visual_roll();
		$(".play_btn").addClass("on");
		clearTimeout(start_slide);
	});
	$(".visual_left_btn").on("click",function(e){
		current--;
		visual_roll();
		$(".play_btn").addClass("on");
		clearTimeout(start_slide);
	});
	
	start_slide=setInterval(set_slide, 4000);
	
	function visual_roll(){
		current = current%visual_lang
		$(".visual_indi li.indi").removeClass("on");
		$(".visual_indi li.indi").eq(current).addClass("on");
		TweenMax.to($(".visual01 article"),1,{opacity:0,display:"none"});
		TweenMax.to($(".visual01 article").eq(current),0.5,{opacity:1,display:"block"});
		TweenMax.fromTo($(".visual01 article").eq(current).find(".txt_area h2"),0.4,{"margin-bottom":-40,opacity:0},{"margin-bottom":0,opacity:1,delay:0.5, ease:es_step});
		TweenMax.fromTo($(".visual01 article").eq(current).find(".txt_area p"),0.4,{"margin-bottom":-30,opacity:0},{"margin-bottom":0,opacity:1,delay:0.8, ease:es_step});
	}
	$(".visual02 span, .visual03 span").on("mouseenter",function(e){
		TweenMax.to($(".visual02 span, .visual03 span"),0.4,{opacity:0})
		TweenMax.to($(this),0.4,{opacity:0.7})
	})
	$(".visual_right").on("mouseleave",function(e){
		TweenMax.to($(".visual02 span, .visual03 span"),0.4,{opacity:0})
	})
	$(".play_btn").on("click",function(e){
		if($(this).hasClass("on") == false){ 
			$(this).addClass("on");
			clearTimeout(start_slide);
		} else {
			$(this).removeClass("on");
			start_slide=setInterval(set_slide, 4000);
		}
	});
	function set_slide(){
		current++;
		visual_roll();	
	};
});