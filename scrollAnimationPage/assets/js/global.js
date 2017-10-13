var unicef = {},
    url = "http://www.unicef.or.kr/igreport/2016",
    Scroller = function() {
        var e = null,
            t = null,
            o = null,
            n = ($(document).height(), null),
            a = function() {
                n = $(window).height(), e = [], t = [], $(".anchor").each(function(o) {
                    var a = [0, 100],
                        i = $(this).data("type").split(" ");
                    $.inArray("breakpoint", i) > -1 && e.push(Math.floor($(this).offset().top + $(this).height() / 2 - n / 2)), $.inArray("show", i) > -1 && t.push(Math.floor($(this).offset().top + $(this).height() - n / 2 + a[0])), $.inArray("hide", i) > -1 && t.push(Math.floor($(this).offset().top - n / 2 + a[1]))
                }), o = [], $("section.checkpoint").each(function(e) {
                    o.push($(this).offset().top)
                })
            },
            i = function() {
                for (var n = $(window).scrollTop(), a = 200, i = 0, r = 0; r < o.length && n >= o[r]; r++) i = r;
                var s = Math.ceil((n - o[i]) / (o[i + 1] - o[i]) * 16.6);
                s += 16.6 * i, 6 == i && (s = 100), $(".filler").css("height", s + "%"), $("nav ul li").each(function(e) {
                    $(this)[i >= e ? "addClass" : "removeClass"]("on")
                }), $("section > .viewport").not(".static").each(function(t) {
                    $(this)[n >= e[t] && n < e[t + 1] ? "show" : "hide"]()
                }), $("section > .viewport .caption").each(function(e) {
                    if (e *= 2, n >= t[e]) var o = (n - t[e] + a) / a - 1;
                    if (n >= t[e + 1] - 500) var o = 1 - (n - t[e + 1] + a) / a;
                    o = o > 1 ? 1 : 0 > o ? 0 : o, $(this).css("opacity", o)
                })
            },
            r = function() {
                a(), $(window).on("scroll", throttle(function() {
                    i()
                }, 100)).on("resize", a), 
					$("nav ul li").on("click", function() {
                    var e = $(this).data("offset") - $(window).height() / 2;
					console.log(e);
                    TweenMax.to(window, .5, {
                        scrollTo: {
                            y: e
                        },
                        ease: "easeInOutExpo",
                        onComplete: i
                    })
                }), $(".report.button").on("click", function() {
                    $("body").addClass("locked"), $("section.report").fadeIn()
                }), $("section.report .close").on("click", function() {
                    $("body").removeClass("locked"), $("section.report").fadeOut()
                }), $("ul.social li.facebook a").on("click", function(e) {
                    e.preventDefault();
                    var t = encodeURIComponent(url + "/?TrackCode=16IgReport_share_fb&utm_source=Facebook&utm_medium=Earned&utm_campaign=IMC&utm_content=16IgReport_share_fb");
                    window.open("http://www.facebook.com/sharer.php?u=" + t, "facebook_pop", "width=600,height=450,scrollbars=no,resizable=no")
                }), $("ul.social li.kakaostory a").on("click", function(e) {
                    e.preventDefault(), Kakao.Story.share({
                        url: url + "/?TrackCode=16IgReport_share_ks&utm_source=KakaoStory&utm_medium=Earned&utm_campaign=IMC&utm_content=16IgReport_share_ks",
                        text: "작년 한 해 동안 69개국 어린이들에게 전달한\n생명을 구하는 선물  4,728,540개!\n어떤 변화를 만들었을까요?"
                    })
                })
            };
        r()
    },
    Animator = function() {
        var e = new TimelineMax;
        e.to($("section.one .animate"), 1, {
            rotation: -20,
            transformOrigin: "90% 80%",
            ease: "swing",
            repeat: -1,
            repeatDelay: .15,
            yoyo: !0
        }), TweenMax.to($("section.one .arrow, section.ten .arrow"), .5, {
            y: 3,
            ease: "swing",
            repeat: -1,
            yoyo: !0
        }), TweenMax.staggerTo($("section .clouds .cloud"), 2, {
            y: -10,
            ease: "swing",
            repeat: -1,
            yoyo: !0
        }, 1), TweenMax.staggerTo($("section.three .background .cloud"), 1, {
            x: 5,
            ease: "swing",
            repeat: -1,
            yoyo: !0
        }, .25), TweenMax.to($("section.two .aniObject"), 4, {
            x: -300,
            ease: "linear",
            repeat: -1,
            repeatDelay: 2,
            yoyo: !0
        }), TweenMax.to($("section.five .left .animate"), 1, {
            rotation: 15,
            transformOrigin: "100% 100%",
            ease: "swing",
            repeat: -1,
            repeatDelay: .25,
            yoyo: !0
        }), TweenMax.fromTo($("section.five .right .animate"), 2, {
            rotation: 5
        }, {
            rotation: -5,
            transformOrigin: "50% 0",
            ease: "swing",
            repeat: -1,
            yoyo: !0
        }), TweenMax.to($("section.seven .left .animate"), .75, {
            rotation: 15,
            transformOrigin: "100% 100%",
            ease: "swing",
            repeat: -1,
            repeatDelay: 1,
            yoyo: !0
        }), TweenMax.fromTo($("section.ten .balloon"), 2, {
            rotation: 5
        }, {
            rotation: -5,
            transformOrigin: "50% bottom",
            ease: "swing",
            repeat: -1,
            yoyo: !0
        }), TweenMax.fromTo($("section.one .hand"), 2, {
            rotation: 0
        }, {
            rotation: -15,
            transformOrigin: "left 50%",
            ease: "swing",
            repeat: -1,
            yoyo: !0
        });
        var t = new TimelineMax({
            repeat: -1,
            repeatDelay: 3
        });
        t.to($("section.seven .right .animate"), .75, {
            rotation: 10,
            transformOrigin: "100% 0",
            ease: "swing",
            repeat: 1,
            repeatDelay: .5,
            yoyo: !0
        });
        var o = new TimelineMax({
            repeat: -1,
            repeatDelay: 2
        });
        o.to($("section.eight .left .animate.one"), 1.25, {
            y: "+=120",
            ease: "easeInExpo"
        }).to($("section.eight .left .animate.one"), .65, {
            rotation: 150,
            ease: "swing"
        }, .5).to($("section.eight .left .animate.one"), .2, {
            x: "-=30",
            ease: "swing",
            yoyo: !0,
            repeat: 4
        }, .15);
        var n = new TimelineMax({
            repeat: -1,
            repeatDelay: 2
        });
        n.to($("section.eight .left .animate.two"), .5, {
            x: "+=50",
            y: "+=30",
            ease: "swing"
        }).to($("section.eight .left .animate.two"), .1, {
            rotationY: 180,
            ease: "easeInExpo"
        }, 2.5).to($("section.eight .left .animate.two"), .5, {
            x: "-=80",
            y: "-=60",
            ease: "swing"
        }), TweenMax.to($("section.eight .right .animate"), .75, {
            rotation: 15,
            transformOrigin: "80% 10%",
            ease: "swing",
            repeat: -1,
            repeatDelay: 1,
            yoyo: !0
        })
    },
    Preloader = function() {
        var e = $(".background, .layer"),
            t = 1,
            o = 0,
            n = function() {
                $("section.one .aniObject").hide(), $("section.loading").fadeOut(1e3, function() {
                    $(this).remove(), $("section.one .aniObject").each(function(e) {
                        var t = 250 * e,
                            o = $(this);
                        setTimeout(function() {
                            o.fadeIn(1e3)
                        }, t)
                    })
                }), new Scroller, new Animator
            },
            a = function() {
                t++, o = Math.ceil(t / e.length * 100), o > 100 && (o = 100), $(".percentage").text(o + "%"), 100 == o && setTimeout(n, 1e3)
            },
            i = function() {
                e.each(function(e) {
                    var t = $(this).css("background-image");
                    if ("none" != t) {
                        var o = new Image;
                        o.src = t.split('"')[1], $(o).on("load", function() {
                            $(this).remove()
                        }), a()
                    } else a()
                }), Kakao.init("f2ed9305ff8a0245b7b594481fea6037"), Kakao.Link.createTalkLinkButton({
                    container: ".kakaotalk",
                    label: "2016년 어린이들에게 전달한 생명을 구하는 선물 4백만 개!\n\n69개국 어린이들에게 생긴 놀라운 변화를 확인해 볼까요?",
                    image: {
                        src: url + "/assets/images/cover_kt.png",
                        width: "720",
                        height: "630"
                    },
                    webButton: {
                        text: "선물 확인하기",
                        url: url + "/?TrackCode=16IgReport_share_kt&utm_source=Kakaotalk&utm_medium=Earned&utm_campaign=IMC&utm_content=16IgReport_share_kt"
                    }
                })
            };
        setTimeout(i, 500)
    },
    timestamp = Date.now || function() {
        return (new Date).getTime()
    },
    throttle = function(e, t, o, n) {
        var a, i, r, s = null,
            c = 0,
            l = function() {
                c = o === !1 ? 0 : timestamp(), s = null, r = e.apply(a, i), s || (a = i = null)
            };
        return function() {
            var u = timestamp();
            c || o !== !1 || (c = u);
            var h = t - (u - c);
            return a = this, i = arguments, 0 >= h || h > t ? (s && (clearTimeout(s), s = null), c = u, r = e.apply(a, i), s || (a = i = null)) : s || n === !1 || (s = setTimeout(l, h)), r
        }
    };
$(document).ready(function() {
    new Preloader, $(".scroller").mCustomScrollbar({
        theme: "dark-3",
        scrollInertia: 150
    })
});

function moveToScroll(e){
	$('html, body').animate({
		scrollTop : e
	});
}