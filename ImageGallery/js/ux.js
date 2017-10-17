/* 
ux.js 
*/


function List(thumb, content){
	this.thumb = thumb;
	this.content = content;
}


var lists = [
	{"thumb" : "data/images/small_1.jpg" ,  "content" : "data/images/big_1.jpg"},
	{"thumb" : "data/images/small_2.jpg" ,  "content" : "data/images/big_2.jpg"},
	{"thumb" : "data/images/small_2.jpg" ,  "content" : "data/movies/20170811.mp4"}
];


function openPage(){
	$(".page_area").fadeIn(200, function(){
		setGalleryList();
	});
}

function closePage(){
	$(".page_area").fadeOut();
}


function setGalleryList(){
	var list_area = $("#gallery_list").empty();
	for( var i = 0; i< lists.length; i++){
		var thumb = lists[i].thumb.toString();
		var output = "<li><a href='javascript:;' onclick='galleryViewer( "+i+" );'><img src='"+ thumb +"' /></a></li>";
		list_area.append(output);
	}
}

function getViewer(n){
	var content = lists[n].content.toString();
	var output = "";
	if( content.indexOf("movies") > -1 ){
		output = "<video controls autoplay='true' width='100%' class='viewer_in'><source src='"+ content +"' type='video/mp4'></video>";
	} else if(content.indexOf("images") > -1 ){
		output = "<img src='" + content +"' class='viewer_in' />";
	}
	return $(output);
}

//중앙으로 정렬
function setCenter(){
	$(".gallery_viewer_area").css({
		"marginTop" : -( $(".viewer_in").height()/2 )+"px",
		"marginLeft" : -( $(".viewer_in").width() / 2 )+"px",
		"opacity" : 1
	});
}

function closeGallery(){
	var area = $("#viewer_area");
	var content = $("#viewer_content");
	content.empty();
	area.hide();
}

function galleryViewer(n){
	var area = $("#viewer_area");
	var content = $("#viewer_content");
	var con = getViewer(n);
	
	content.empty().append(con);
	$(".gallery_viewer_area").css('opacity', '0');

	if( area.css('display') == 'none'){
		area.fadeIn(100);
	}
	setTimeout(function(){
		setCenter();
	}, 1500);

	$(".btn_next").off('click').on('click', function(){
		galleryNext();
	});

	function galleryNext(){
		if( n < lists.length-1){
			n++;
			galleryViewer(n);
		}
	}

	$(".btn_prev").off('click').on('click', function(){
		galleryPrev();
	});

	function galleryPrev(){
		if( n > 0 ){
			n--;
			galleryViewer(n);
		}
	}
}
