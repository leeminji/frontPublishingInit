/* 
ux.js 
*/


//초기실행
$(document).ready(function(){
	
	//하위버전 placeholder설정
	$('input, textarea').placeholder();
	
	//datepicker설정
	setDatePicker($(".datepicker"));
	
	//tooltip
	$( ".tooltip" ).tooltip();

	//체크박스 디자인
	fncCheck($(".chk_area"));

});

//자리수설정
function formatZero(num, len) {
	while(num.toString().length < len) {
	num = "0" + num;
	}
	return num;
}

//자바스크립터에서 주소(URL) 상으로 넘어오는 인자(QueryString) 값을 쉽게 파싱해서 사용할 수있는 함수
function getUrlParams(url) {
	var params = {};
	url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
	return params;
} 

//헤더 고정
function headerFixed(el){
	var path= $(el);
	if( path.length > 0 ){
		var top = path.offset().top;
		$(window).scroll(function(){
			if( $(this).scrollTop() > top  ){
				path.addClass('fixedOn');
			}else{
				path.removeClass('fixedOn');
			}
		});
	}
}


//체크박스 디자인적용
function fncCheck(el){
	el.each(function(){
		var label = $(this).find('label');
		var tit = $(this).find('.tit');
		var chk = $(this).find('input[type="checkbox"]');
		tit.click(function(){
			label.trigger('click');
		});
		$(this).find('label').click(function(e){
			e.preventDefault();
			if( label.hasClass('on')){
				$(this).removeClass('on');
				chk.removeAttr('checked');
			}else{
				$(this).addClass('on');
				chk.attr('checked', 'checked');
			}
		});
	});
}

//달력설정
function setDatePicker(el){
	$(el).datepicker({
		dateFormat : 'yy-mm-dd',
		showOn: "button",
		buttonText: "Select date",
		changeMonth: true,
		changeYear: true,
		monthNamesShort : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
		gotoCurrent : true,
		showButtonPanel: true
	});
}

//모바일체크
function isCheckMobile(){
	var mobileInfo = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
	for (var info in mobileInfo){
		if (navigator.userAgent.match(mobileInfo[info]) != null){
			// 모바일 수행
			return true;
		}else{
			return false;
		}
	}
}

//넓이에 따른 디바이스체크
function getDevice(){
	var device = null;
	if( $(window).width() > 800 ){
		device = "pc";
	}else{
		device = "moblie";
	}
	return device;
}

//ie8이하 이미지 opacity적용
function ieOpacityImage(){
	if(getInternetExplorerVersion()==8 || getInternetExplorerVersion()==7){
		$('.ie_png').each(function(){
			var src = String($(this).attr('src'));
				if (src.indexOf('.png') > -1 ) {
					$(this).attr('style',"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + src + "')");
				}
		});
	}
}

//ie 버전체크
function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.    
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)            
		rv = parseFloat(RegExp.$1);    
	}
	return rv; 
}

//탭
function tabProduct(el, init_num){
	var tab = $(el).find(".tab");
	var tab_list = tab.children('ul').children('li');
	var tab_con = $(el).find('.tab_content');

	var init = function(){
		tab_list.eq(init_num).children('a').addClass('on');
		tab_con.hide();
		tab_con.eq(init_num).show();
	}
	init();
	
	tab_list.each(function(){
		$(this).children('a').click(function(e){
			var href = $(this).attr('href');
			tab_list.find('a').removeClass('on');
			$(this).addClass('on');
			tab_con.hide();
			$(href).show();
			e.preventDefault();
		});
	});
}

//아코디언
function fncArcodian(className, start_num){
	var obj = $('.'+className).children('dl');
	
	if(start_num>=0){
		obj.find('dd').not(obj.find('dd').eq(start_num)).css('display','none'); //오픈
		addOn(start_num); //오픈
	}else{
		obj.find('dd').css('display','none');
	}

	obj.children('dt').each(function(index){
		var index = index;
		$(this).children('a').click(function(){
			if($(this).parent().next('dd').css('display') == 'block'){
				$(this).parent().next('dd').slideUp();
				removeOn();
			}else{
				obj.find('dd').not($(this).parent().next('dd')).slideUp();
				$(this).parent().next('dd').slideDown();
				removeOn();
				addOn(index);
			}
		});
	});
	function addOn(index){
		obj.find('dt').eq(index).addClass('on');
		obj.find('dd').eq(index).addClass('on');
	}
	function removeOn(){
		obj.find('dd').removeClass("on");
		obj.find('dt').removeClass("on");
	}
}

//팝업오픈 openPopup(경로, 넓이, 높이, top, left)
function openPopup(path, width, height, top, left){
	window.open(path, "","width="+width+",height="+height+",top="+top+",left="+left+",noresizable,toolbar=no,status=no,scrollbars=yes,directory=no");
}


//즐겨찾기
function bookmarksite(title,url) { 
	// Internet Explorer
	if(document.all){
		window.external.AddFavorite(url, title); 
	}
	// Google Chrome
	else if(window.chrome){
		alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	}
	// Firefox
	else if (window.sidebar){
		window.sidebar.addPanel(title, url, ""); 
	}
	// Opera
	else if(window.opera && window.print){ // opera 
		var elem = document.createElement('a'); 
		elem.setAttribute('href',url); 
		elem.setAttribute('title',title); 
		elem.setAttribute('rel','sidebar'); 
		elem.click(); 
	}
} 


//placeholder 플러그인
/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn?셳 support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {
		placeholder = prototype.placeholder = function() {
			return this;
		};
		placeholder.input = placeholder.textarea = true;
	} else {
		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;
		hooks = {
			'get': function(element) {
				var $element = $(element);
				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}
	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (exception) {}
	}
}(this, document, jQuery));
