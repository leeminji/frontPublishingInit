"use strict";

function _classCallCheck(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}


var Panorama = function(e, t, n) {
function i() {
	h = requestAnimFrame(i), $()
}
var o, a, s, c, l, r, h, u = {
		lon: 0,
		lat: 20
	},
	d = 0,
	_ = 0,
	w = new THREE.Vector3,
	f = 500,
	g = (new THREE.Vector2, Math.PI / 180, t("#contents .section_360")),
	v = navigator.userAgent.indexOf("MSIE") != -1;
e.init = function() {
	v || (o = document.getElementById("panorama"), a = new THREE.PerspectiveCamera(70, g.innerWidth() / g.innerHeight(), 1, 1100), a.target = new THREE.Vector3(0, 0, 0), a.position.set(0, 0, 0), s = new THREE.Scene, r = (new THREE.TextureLoader).load("/Images/main/panorama_mini.jpg", function() {
		var e = r.clone();
		e.needsUpdate = !0
	}), l = new THREE.Mesh(new THREE.SphereGeometry(f, 60, 60), new THREE.MeshBasicMaterial({
		map: r,
		overdraw: !0
	})), l.scale.x = -1, l.position.y = 50, s.add(l), c = Detector.webgl ? new THREE.WebGLRenderer({
		alpha: !0,
		antialias: !1,
		sortObjects: !1
	}) : new THREE.CanvasRenderer({
		alpha: !0,
		antialias: !1,
		sortObjects: !1
	}), c.setPixelRatio(window.devicePixelRatio), c.setSize(g.innerWidth(), g.innerHeight()), o.appendChild(c.domElement), window.addEventListener("resize", m, !1), m())
};
var m = function() {
	a.aspect = g.innerWidth() / g.innerHeight(), a.updateProjectionMatrix(), c.setSize(g.innerWidth(), g.innerHeight()), c.render(s, a)
};
e.animate = function() {
	v || i()
}, e.move = function(e) {
	v || TweenMax.to(u, .5, {
		lon: e,
		ease: Quad.easeOut
	})
}, e.stop = function() {
	v || Detector.webgl && Detector !== n && cancelAnimFrame(h)
};
var $ = function() {
	u.lat = Math.max(-85, Math.min(85, u.lat)), d = THREE.Math.degToRad(90 - u.lat), _ = THREE.Math.degToRad(u.lon);
	var e = f * Math.sin(d) * Math.cos(_),
		t = f * Math.cos(d),
		n = f * Math.sin(d) * Math.sin(_);
	TweenMax.to(w, .5, {
		x: e,
		y: t,
		z: n,
		onUpdate: function() {
			c.clear(), a.updateProjectionMatrix(), a.lookAt(w), c.render(s, a)
		}
	})
};
return e
}(window.Panorama || {}, jQuery);


$(function() {
Panorama.init()
});


var _createClass = function() {
	function e(e, t) {
		for (var n = 0; n < t.length; n++) {
			var i = t[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
		}
	}
	return function(t, n, i) {
		return n && e(t.prototype, n), i && e(t, i), t
	}
}(),
weAreTimer = function() {
	function e() {
		_classCallCheck(this, e), this.name = "weAreTimer", this.count = 0, this.is_next = !1, this.is_timer = !1, this.init()
	}
	return _createClass(e, [{
		key: "init",
		value: function() {
			var e, t = this;
			$("#contents .weare_section .inner .thumb li a").click(function() {
				clearTimeout(e);
				var n = $(".thumb li.active").index(),
					i = $(this).parent().index();
				n != i && (t.is_next = !1, t.count = i, t.changeThumb(i, !1), e = setTimeout(function() {
					t.enRolling(!1)
				}, 7e3))
			}), t.changeThumb(t.count, !1)
		}
	}, {
		key: "enRolling",
		value: function(e) {
			var t = this;
			t.is_timer && (t.is_next = !0, t.changeThumb(t.count, e))
		}
	}, {
		key: "startRolling",
		value: function() {
			this.is_timer = !0, this.enRolling(!0)
		}
	}, {
		key: "stopRolling",
		value: function() {
			this.is_timer = !1
		}
	}, {
		key: "changeThumb",
		value: function(e, t) {
			var n, i = this,
				o = "l";
			clearTimeout(n), o = $(".thumb li.active").position().left - $(".thumb li").eq(e).position().left <= 0 ? "l" : "r", 1 == t && TweenMax.to($("#contents .weare_section .thumb .select_line>span"), 0, {
				autoAlpha: 1,
				width: 0,
				marginLeft: 121
			}), TweenMax.to($("#contents .weare_section .thumb .select_line>span"), 0 == t ? 0 : 6, {
				width: 245,
				marginLeft: 0,
				onComplete: function() {
					n = setTimeout(function() {
						$(".thumb li").removeClass("active"), $("#contents .weare_section").attr("data-num", e);
						var n = $("#contents .weare_section .inner .thumb li").eq(0 == e ? 2 : e - 1).css("z-index", "l" == o ? 0 : 1),
							a = $("#contents .weare_section .inner .thumb li").eq(e).addClass("active").css("z-index", 2),
							s = $("#contents .weare_section .inner .thumb li").eq(e >= 2 ? 0 : e + 1).css("z-index", "l" == o ? 1 : 0);
						$(".thumb_content_area").fadeOut(), $(".thumb_content_area").eq(e).fadeIn(), 1 == t && TweenMax.to($("#contents .weare_section .thumb .select_line>span"), .5, {
							autoAlpha: 0
						}), TweenMax.to(n, 1, {
							x: 295,
							ease: Quad.easeOut
						}), TweenMax.to(a, 1, {
							x: 0,
							ease: Quad.easeOut
						}), TweenMax.to(s, 1, {
							x: -295,
							ease: Quad.easeOut,
							onComplete: function() {
								i.count = 0 == i.count ? 2 : i.count - 1, 1 == i.is_next && i.enRolling(!0)
							}
						})
					}, 0)
				}
			})
		}
	}]), e
}(),
Parallax = function() {
	function e() {
		_classCallCheck(this, e), this.name = "Parallax", this.init()
	}
	return _createClass(e, [{
		key: "init",
		value: function() {
			TweenMax.set($("#contents .info_section ul.link li").eq(0), {
				y: 300
			}), TweenMax.set($("#contents .info_section ul.link li").eq(1), {
				y: 300
			}), TweenMax.set($("#contents .info_section ul.link li").eq(2), {
				y: 300
			}), TweenMax.set($("#contents .info_section ul.link li a .text"), {
				y: 100
			}), TweenMax.set($("#contents .character_section .inner a"), {
				y: 300
			}), TweenMax.set($("#contents .weare_section .inner h3"), {
				y: 100
			}), TweenMax.set($("#contents .weare_section .inner .thumb"), {
				y: 140
			}), TweenMax.set($("#contents .weare_section .inner .thumb_content_area"), {
				y: 180
			}), TweenMax.set($("#contents .highlight_section .inner"), {
				y: 200
			}), TweenMax.set($("#contents .section_360 .inner .bg .img"), {
				x: -60
			}), TweenMax.set($("#contents .section_360 .inner .bg .text"), {
				x: -110
			}), $("#contents .character_section .inner .text").hover(function() {
				$(this).prev().addClass("active")
			}, function() {
				$(this).prev().removeClass("active")
			})
		}
	}, {
		key: "parallaxMotion",
		value: function(e, t, n, i, o) {
			if (0 != i.length) {
				var a = document.body.clientHeight - window.innerHeight;
				t = t > a - 100 ? a - 100 : t;
				var s = (e - t) / ((n > a ? a : n) - t);
				s = s < 0 ? 0 : s > 1 ? 1 : s, o && o(s)
			}
		}
	}, {
		key: "scrollMotion",
		value: function(e, t, n, i) {
			e >= t && i && void 0 == n[0].is_play && (i(), n[0].is_play = !0)
		}
	}]), e
}(),
CircleMotion = function() {
	function e() {
		_classCallCheck(this, e), this.name = "CircleMotion", this.init()
	}
	return _createClass(e, [{
		key: "init",
		value: function() {
			EventDispatcher.add(this, Events.STARTCIRCLEMOTION, this.startMotion), EventDispatcher.add(this, Events.STOPCIRCLEMOTION, this.stopMotion)
		}
	}, {
		key: "circleMotion1",
		value: function() {
			var e = this,
				t = $("#contents .section_360 .inner .bg .circle li").eq(1);
			TweenMax.set(t, {
				scale: 1
			}), TweenMax.to(t, .3, {
				alpha: 1
			}), TweenMax.to(t, 1, {
				scale: 1.14
			}), TweenMax.to(t, .8, {
				delay: .4,
				alpha: 0
			}), TweenMax.delayedCall(1.4, e.circleMotion1)
		}
	}, {
		key: "circleMotion2",
		value: function() {
			var e = this,
				t = $("#contents .section_360 .inner .bg .circle li").eq(2);
			TweenMax.set(t, {
				delay: .7,
				scale: 1
			}), TweenMax.to(t, .3, {
				delay: .7,
				alpha: 1
			}), TweenMax.to(t, 1, {
				delay: .7,
				scale: 1.14
			}), TweenMax.to(t, .8, {
				delay: 1.1,
				alpha: 0
			}), TweenMax.delayedCall(1.4, e.circleMotion2)
		}
	}, {
		key: "startMotion",
		value: function() {
			this.circleMotion1(), this.circleMotion2()
		}
	}, {
		key: "stopMotion",
		value: function() {
			var e = this;
			TweenMax.killDelayedCallsTo(e.circleMotion1), TweenMax.killDelayedCallsTo(e.circleMotion2), TweenMax.killTweensOf($("#contents .section_360 .inner .bg .circle li").eq(1)), TweenMax.killTweensOf($("#contents .section_360 .inner .bg .circle li").eq(2))
		}
	}]), e
}(),
FlowText = function() {
	function e() {
		_classCallCheck(this, e), this.name = "FlowText", this.init()
	}
	return _createClass(e, [{
		key: "init",
		value: function() {
			EventDispatcher.add(this, Events.STARTFLOWTEXT, this.startTimer), EventDispatcher.add(this, Events.STOPFLOWTEXT, this.stopTimer), this.val = 0
		}
	}, {
		key: "startTimer",
		value: function() {
			var e = this,
				t = $("#contents .highlight_section .flow .flow_inner ul").innerWidth();
			this.isLoop = !0, this.flowTimer = function() {
				if (0 != e.isLoop) {
					e.val++;
					var n = .2 * e.val;
					if (TweenMax.to($("#contents .highlight_section .flow .flow_inner"), 0, {
							x: n * -1.8
						}), n % -t == 0) {
						e.val = 0;
						var i = $("#contents .highlight_section .flow .flow_inner ul.active"),
							o = 0 == i.next().length ? $("#contents .highlight_section .flow .flow_inner ul").eq(0) : i.next(),
							a = 0 == o.next().length ? $("#contents .highlight_section .flow .flow_inner ul").eq(0) : o.next();
						$("#contents .highlight_section .flow .flow_inner ul.active").css("marginLeft", 2 * t).removeClass("active"), i.removeClass("active").css("marginLeft", 2 * t), o.addClass("active").css("marginLeft", 0), a.css("marginLeft", t)
					}
					requestAnimFrame(e.flowTimer)
				}
			}, this.flowTimer()
		}
	}, {
		key: "stopTimer",
		value: function() {
			var e = this;
			e.isLoop = !1, cancelAnimFrame(e.flowTimer)
		}
	}]), e
}(),
weare = new weAreTimer;
new FlowText;
var p = new Parallax,
		isScroll = !1,
		gnbH = $("#gnb").innerHeight(),
		lastScroll = 0,
		is_slide = !0,
		is_flow_text = !1,
		is_weare_rolling = !1,
		is_circle_motion = !1,
		is_360_show = !1;

		$(window).scroll(function() {
		var e = $(window).scrollTop(),
			t = $("#contents .info_section").offset().top - (window.innerHeight - $("#contents .info_section").innerHeight() / 2) - 230 - gnbH,
			n = window.innerHeight / 5 + t;
			p.parallaxMotion(e, 0, n, $("#contents .info_section"), function(e) {
				e >= 1 ? 1 == is_slide && (is_slide = !1, EventDispatcher.is(Events.STOPSLIDE)) : 0 == is_slide && (is_slide = !0, EventDispatcher.is(Events.STARTSLIDE))
			}), p.parallaxMotion(e, t + 50, n, $("#contents .info_section"), function(e) {
			TweenMax.to($("#contents .info_section ul.link li").eq(0), .5, {
				delay: .1,
				y: e * -460 + 300,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($("#contents .info_section ul.link li").eq(1), .5, {
				delay: 0,
				y: e * -530 + 300,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($("#contents .info_section ul.link li").eq(2), .5, {
				delay: .2,
				y: e * -425 + 300,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($("#contents .info_section ul.link li").eq(0).find("a .text"), .6, {
				delay: .2,
				y: e * -100 + 100,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($("#contents .info_section ul.link li").eq(1).find("a .text"), .6, {
				delay: .1,
				y: e * -100 + 100,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($("#contents .info_section ul.link li").eq(2).find("a .text"), .6, {
				delay: .3,
				y: e * -100 + 100,
				ease: Quad.easeOut,
				force3D: !0
			})
});
var i = $("#contents .weare_section").offset().top - (window.innerHeight - $("#contents .weare_section").innerHeight() / 1.5) - gnbH,
	o = window.innerHeight / 4 + i,
	a = ($("#contents .weare_section").offset().top - (window.innerHeight - $("#contents .weare_section").innerHeight()), $("#contents .weare_section").offset().top - (window.innerHeight - $("#contents .weare_section").innerHeight()) + 588 - gnbH - 72);
p.parallaxMotion(e, i, o, $("#contents .weare_section"), function(e) {
	TweenMax.to($("#contents .weare_section .inner h3"), .5, {
		delay: 0,
		y: e * -100 + 100,
		ease: Quad.easeOut,
		force3D: !0
	}), TweenMax.to($("#contents .weare_section .inner .thumb"), .5, {
		delay: 0,
		y: e * -140 + 140,
		ease: Quad.easeOut,
		force3D: !0
	}), TweenMax.to($("#contents .weare_section .inner .thumb_content_area"), .5, {
		delay: 0,
		y: e * -180 + 180,
		ease: Quad.easeOut,
		force3D: !0
	})
}), p.parallaxMotion(e, i, a, $("#contents .weare_section"), function(e) {
	e <= 0 || e >= 1 ? 1 == is_weare_rolling && (is_weare_rolling = !1, weare.stopRolling()) : 0 == is_weare_rolling && (is_weare_rolling = !0, weare.startRolling())
});


var s = $("#contents .highlight_section").offset().top - (window.innerHeight - $("#contents .highlight_section").innerHeight() / 2) - gnbH,
	c = $("#contents .highlight_section").offset().top - (window.innerHeight - $("#contents .highlight_section").innerHeight() / 4) - gnbH,
	l = window.innerHeight + c,
	r = $("#contents .highlight_section").offset().top - (window.innerHeight - $("#contents .highlight_section").innerHeight() / 5) - gnbH,
	h = 100 + r;
p.scrollMotion(e, s, $("#contents .highlight_section"), function() {
	var e = -40;
	TweenMax.to($("#contents .highlight_section .count li .counter"), .6, {
		opacity: 1
	}), TweenMax.to($("#contents .highlight_section .count li .counter1 > span"), .7, {
		delay: .4,
		y: 6 * e
	}), TweenMax.to($("#contents .highlight_section .count li .counter2 > span"), .7, {
		delay: .4,
		y: 3 * e
	}), TweenMax.to($("#contents .highlight_section .count li .counter3 > span"), .7, {
		delay: .5,
		y: 8 * e
	}), TweenMax.to($("#contents .highlight_section .count li .counter4 > span"), .7, {
		delay: .5,
		y: 2 * e
	}), TweenMax.to($("#contents .highlight_section .count li .counter5 > span"), .7, {
		delay: .6,
		y: 1 * e
	}), TweenMax.to($("#contents .highlight_section .count li .counter6 > span"), .7, {
		delay: .6,
		y: 5 * e,
		onComplete: function() {}
	})
}), p.parallaxMotion(e, r, h, $("#contents .highlight_section"), function(e) {
	TweenMax.to($("#contents .highlight_section .inner"), .5, {
		y: e * -72,
		ease: Cubic.easeOut
	})
}), p.parallaxMotion(e, c, l, $("#contents .highlight_section"), function(e) {
	e <= 0 || e >= 1 ? 1 == is_flow_text && (is_flow_text = !1, EventDispatcher.is(Events.STOPFLOWTEXT)) : 0 == is_flow_text && (is_flow_text = !0, EventDispatcher.is(Events.STARTFLOWTEXT))
});
var u = $("#contents .section_360").offset().top - (window.innerHeight - $("#contents .section_360").innerHeight() / 1.8) - gnbH,
	d = $("#contents .section_360").offset().top - window.innerHeight,
	_ = (window.innerHeight / 4 + u, window.innerHeight + $("#contents .section_360").innerHeight() + d - gnbH),
	_ = $("#contents .character_section .inner .img1").offset().top - window.innerHeight;
p.scrollMotion(e, u, $("#contents .section_360"), function() {
	is_flow_text = !1, EventDispatcher.is(Events.STOPFLOWTEXT), $("#contents .section_360 .inner .bg").css("width", 0), TweenMax.to($("#contents .section_360 .inner .bg .img"), 1.3, {
		delay: 0,
		x: 0,
		ease: Quad.easeOut,
		force3D: !0
	}), TweenMax.to($("#contents .section_360 .inner .bg .text"), 1.3, {
		delay: 0,
		x: 0,
		ease: Quad.easeOut,
		force3D: !0
	}), TweenMax.to($("#contents .section_360 .inner .bg"), .6, {
		width: 2e3,
		ease: Quad.easeOut,
		force3D: !0,
		onComplete: function() {
			is_360_show = !0
		}
	}), setTimeout(function() {
		$("#contents .section_360 .inner .bg .circle li").eq(0).addClass("move"), $("#contents .section_360 .inner .bg .circle li").eq(1).addClass("move"), is_circle_motion = !0
	}, 300)
}), p.parallaxMotion(e, d, _, $("#contents .section_360"), function(e) {
	e <= 0 || e >= 1 ? 1 == is_circle_motion && (is_circle_motion = !1, $("#contents .section_360 .inner .bg .circle li").removeClass("move"), Panorama.stop()) : (0 == is_circle_motion && (is_circle_motion = !0, $("#contents .section_360 .inner .bg .circle li").eq(0).addClass("move"), $("#contents .section_360 .inner .bg .circle li").eq(1).addClass("move"), Panorama.animate()), is_360_show && Panorama.move(20 * e - 20))
});
for (var w = 1; w < 5; w++) {
	var f = $("#contents .character_section .inner .img" + w),
		g = $("#contents .character_section .inner .text" + w),
		v = f.offset().top - window.innerHeight - f.innerHeight() + gnbH,
		m = 100 + v;
	p.parallaxMotion(e, v, m, f, function(e) {
		TweenMax.to(f, .5, {
			y: e * -500 + 500,
			ease: Quad.easeOut,
			force3D: !0
		}), TweenMax.to(g, .5, {
			y: e * -300 + 300,
			ease: Quad.easeOut,
			force3D: !0
		})
	})
}
lastScroll = e
});
var _createClass = function() {
	function e(e, t) {
		for (var n = 0; n < t.length; n++) {
			var i = t[n];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
		}
	}
	return function(t, n, i) {
		return n && e(t.prototype, n), i && e(t, i), t
	}
}(),
TopSlide = function() {
	function e() {
		_classCallCheck(this, e), this.name = "TopSlide", this.onResize(), this.init(), this.cnt = 0
	}
	return _createClass(e, [{
		key: "init",
		value: function() {
			window.onresize = this.onResize.bind(this);
			var e = this;
			TweenMax.set($("#misc_btns a"), {
				autoAlpha: 0,
				y: -30
			}), TweenMax.set($(".slide_section .btn_view_more span.label"), {
				autoAlpha: 0,
				y: 35
			}), setTimeout(function() {
				$(".dimmed").addClass("fout"), $(".navi").addClass("step1")
			}, 500), setTimeout(function() {
				$(".navi").addClass("step2")
			}, 1700), setTimeout(function() {
				$(".navi").addClass("step3")
			}, 2200), TweenMax.to($("#misc_btns a"), .5, {
				delay: 2.5,
				autoAlpha: 1,
				y: 0,
				ease: Cubic.easeOut,
				force3D: !0
			}), $(".slide_section .bg").eq(0).addClass("active motion"), setTimeout(function() {
				e.showSlide(0, "start"), e.startTimer()
			}, 1e3), TweenMax.to($(".slide_section .carousel"), .5, {
				delay: 1.5,
				autoAlpha: 1,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($(".slide_section .btn_view_more"), .3, {
				delay: 1.5,
				autoAlpha: 1,
				ease: Quad.easeOut,
				force3D: !0
			}), TweenMax.to($(".slide_section .btn_view_more span.label"), .5, {
				delay: 1.5,
				autoAlpha: 1,
				y: 0,
				ease: Quad.easeOut,
				force3D: !0
			}), EventDispatcher.add(this, Events.STARTSLIDE, this.startTimer), EventDispatcher.add(this, Events.STOPSLIDE, this.stopTimer)
		}
	}, {
		key: "showSlide",
		value: function(e) {
			$("#contents .slide_section .btn_view_more").attr("href", $(".slide_section .carousel li").eq(e).attr("data-link")), 2 == e && ($("#slide_video1")[0].currentTime = 0, $("#slide_video1")[0].pause()), this.$before = "start" == arguments[1] ? $(".slide_section .bg").eq(2) : $(".slide_section .bg.active"), this.$current = $(".slide_section .bg").eq(e), this.$before.removeClass("active"), this.$current.addClass("active motion"), $(".slide_section .carousel li.active").removeClass("active"), $(".slide_section .carousel li").eq(e).addClass("active"), 0 == e && $("#slide_video1")[0].play(), $(".slide_section .text li").eq(e).addClass("active"), this.$leave = $(".slide_section .text li.leave"), this.$active = $(".slide_section .text li.active"), this.$leave.attr("is_play", "false"), this.$active.attr("is_play", "false"), this.$before.attr("is_play", "false")
		}
	}, {
		key: "startTimer",
		value: function() {
			if (!$("body").hasClass("stop")) {
				var e = this;
				this.isLoop = !0, this.preper = this.preper || 0;
				var t = 6e3,
					n = (new Date).getTime(),
					i = n + t,
					o = document.getElementById("timer_circle");
				o.width = 50, o.height = 50;
				var a = o.getContext("2d");
				a.imageSmoothingEnabled = !0, a.beginPath();
				var s = $(".slide_section .bg1 video")[0];
				0 == this.cnt && $("#slide_video1")[0].play(), this.animate = function() {
					if (0 != e.isLoop) {
						var n = (new Date).getTime(),
							o = e.preper + 1 - Math.max((i - n) / t, 0);
						e.before = o, e.setProgress(o), requestAnimFrame(e.animate), s.currentTime / s.duration > 0 && ($(".slide_section .bg1 img").hide(), $(".slide_section .bg1 video").show()), o >= 1 && ($("#slide_video1")[0].pause(), e.preper = 0, i = n + t, e.cnt++, e.cnt > 2 && (e.cnt = 0), e.showSlide(e.cnt))
					}
				}, this.setProgress = function(t) {
					var n = document.getElementById("timer_circle"),
						i = -.5 + 2 * t * 1.01,
						o = -.5 * Math.PI,
						s = i * Math.PI,
						c = n.width / 2,
						l = n.height / 2,
						r = 20.5;
					a.clearRect(0, 0, n.width, n.height), a.beginPath(), a.arc(c, l, r, o, s, !1), a.lineWidth = 2, a.strokeStyle = "#fff", a.stroke(), a.closePath(), t > .6 && "false" == e.$leave.attr("is_play") && (e.$leave.removeClass("leave"), e.$leave.attr("is_play", "true")), t > .85 && "false" == e.$active.attr("is_play") && (e.$active.removeClass("active").addClass("leave"), e.$active.attr("is_play", "true")), t >= 1 && "false" == e.$before.attr("is_play") && (e.$before.removeClass("motion"), e.$before.attr("is_play", "true"))
				}, this.animate()
			}
		}
	}, {
		key: "stopTimer",
		value: function() {
			$("#slide_video1")[0].pause();
			var e = this;
			e.isLoop = !1, cancelAnimFrame(e.animate), e.preper = e.before
		}
	}, {
		key: "onResize",
		value: function() {
			$(".slide_section").css({
				height: window.innerHeight + 230
			}), this.outerFit($(".slide_section"), $(".slide_section .bg1 video"), 9 / 16, 16 / 9), this.outerFit($(".slide_section"), $(".slide_section .bg1 img"), 9 / 16, 16 / 9)
		}
	}, {
		key: "outerFit",
		value: function(e, t, n, i) {
			var o = e.innerWidth(),
				a = e.innerHeight();
			if (a / o < n) {
				var s = o,
					c = o * n,
					l = (c - a) / 2 * -1;
				t.css({
					width: s,
					height: c,
					left: 0,
					top: l
				})
			} else {
				var c = a,
					s = a * i,
					r = (s - o) / 2 * -1;
				t.css({
					width: s,
					height: c,
					top: 0,
					left: r
				})
			}
		}
	}]), e
}();
$(window).load(function() {}), $(function() {
	new TopSlide
});