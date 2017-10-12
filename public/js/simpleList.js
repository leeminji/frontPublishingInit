;(function($){
	
	/*
	* @selector : 목록 css 선택자
	* count : 보이는 목록 갯수

	$(".product_lastest").simpleList([{
		count : 10
	},{
		count:3
	},{
		count:4
	}]);
	*/

	function SimpleList(selector, count){
		this.$slider = null;
		this.$ul = null;
		this.$count = count;
		this.$h = null;
		this.$total = 0;

		this.init(selector);
	}

	//요소초기화
	SimpleList.prototype.init = function(selector, count){
		this.$slider = $(selector);
		this.$ul = this.$slider.find('ul');
		this.$total = this.$ul.children('li').size();
		this.$h= this.$ul.children('li').eq(0).height();

		this.$slider.children('.list_view').css({
			'overflow' : 'hidden',
			'position' : 'relative',
			'height' : this.$count * this.$h
		});
		this.$ul.css({
			position:"absolute",
			zIndex:20,
			marginTop : -this.$h,
			left: 0,
			right: 0
		});
		this.$ul.children('li').eq(-1).prependTo(this.$ul);
	}
	
	//메서드추가 toPrev
	SimpleList.prototype.toPrev = function(){
		clearInterval(this.$timer);
		var ul = this.$ul;
		ul.not(":animated").animate({
			top: -this.$h
		},300,function(){
			$(this).children('li').eq(0).appendTo(ul);
			$(this).css('top',0);
		});
	}

	//메서드추가 toNext
	SimpleList.prototype.toNext = function(){
		clearInterval(this.$timer);
		var ul = this.$ul;
		ul.not(":animated").animate({
			top: this.$h
		},300,function(){
			$(this).children('li').eq(-1).prependTo(ul);
			$(this).css('top',0);
		});
	}

	$.simpleListOption = {
		count : 3
	}

	$.fn.simpleList = function(optionList){
		this.each(function(index){
			var options = $.extend(null, $.simpleListOption, optionList[index]);
			var slider = new SimpleList($(this), options.count );

			$(this).find(".btn_prev").on("click",function(e){
				e.preventDefault();
				slider.toPrev();
			});
			$(this).find(".btn_next").on("click",function(e){
				e.preventDefault();
				slider.toNext();
			});
		});
	}
})(jQuery);