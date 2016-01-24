/*
 *	sGallery 1.0 - simple gallery with jQuery
 *	made by bujichong 2009-11-25
 *	作者：不羁虫  2009-11-25
 * http://hi.baidu.com/bujichong/
 *	欢迎交流转载，但请尊重作者劳动成果，标明插件来源及作者
 */

(function($) {
	$.fn.sGallery = function(o) {
		return new $sG(this, o);
		//alert('do');
	};

	var settings = {
		thumbObj: null, //预览对象
		titleObj: null, //标题
		botLast: null, //按钮上一个
		botNext: null, //按钮下一个
		thumbNowClass: 'now', //预览对象当前的class,默认为now
		slideTime: 800, //平滑过渡时间
		autoChange: null, //是否自动切换
		changeTime: 5000, //自动切换时间
		delayTime: 100 //鼠标经过时反应的延迟时间
	};

	$.sGalleryLong = function(e, o) {
		this.options = $.extend({}, settings, o || {});
		var _self = $(e);
		var set = this.options;
		var thumb;
		var size = _self.size();
		var nowIndex = 0; //定义全局指针
		var index; //定义全局指针
		var startRun; //预定义自动运行参数
		var delayRun; //预定义延迟运行参数

		//初始化
		_self.eq(0).show();

		//主切换函数

		function fadeAB() {
			if (nowIndex != index) {
				if (set.thumbObj != null) {
					$(set.thumbObj).removeClass().eq(index).addClass(set.thumbNowClass);
				}
				_self.eq(nowIndex).stop(false, true).fadeOut(set.slideTime);
				_self.eq(index).stop(true, true).fadeIn(set.slideTime);
				$(set.titleObj).eq(nowIndex).hide(); //新增加title
				$(set.titleObj).eq(index).show(); //新增加title
				nowIndex = index;
				if (set.autoChange == true) {
					clearInterval(startRun); //重置自动切换函数
					startRun = setInterval(runNext, set.changeTime);
				}
			}
		}

		//切换到下一个

		function runNext() {
			index = (nowIndex + 1) % size;
			fadeAB();
		}

		//点击任一图片
		if (set.thumbObj != null) {
			thumb = $(set.thumbObj);
			//初始化
			thumb.eq(0).addClass(set.thumbNowClass);
			thumb.bind("mousemove", function(event) {
				index = thumb.index($(this));
				fadeAB();
				delayRun = setTimeout(fadeAB, set.delayTime);
				clearTimeout(delayRun);
				event.stopPropagation();
			})
		}

		//点击上一个
		if (set.botNext != null) {
			var botNext = $(set.botNext);
			botNext.click(function() {
				runNext();
				return false;
			});
		}

		//点击下一个
		if (set.botLast != null) {
			var botLast = $(set.botLast);
			botLast.click(function() {
				index = (nowIndex + size - 1) % size;
				fadeAB();
				return false;
			});
		}

		//自动运行
		if (set.autoChange == true) {
			startRun = setInterval(runNext, set.changeTime);
		}

	}

	var $sG = $.sGalleryLong;

})(jQuery);

/*滚动*/

(function ($) { 
$.fn.extend({ 
Scroll: function (opt, callback) { 
if (!opt) var opt = {}; 
var _btnleft = $(opt.left); 
var _btnright = $(opt.right); 
var timerID; 
var _this = this.eq(0).find("div").eq(1); 
var lineW = _this.find("a:first").width(), //获取列宽 
line = opt.line ? parseInt(opt.line, 10) : parseInt(_this.width() / lineW, 10), //每次滚动的列数，默认为一屏，即父容器列宽 
speed = opt.speed ? parseInt(opt.speed, 10) : 500; //滚动速度，数值越大，速度越慢（毫秒） 
timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //滚动的时间间隔（毫秒） 
if (line == 0) line = 1; 
var upWidth = 0 - line * lineW; 
//滚动函数 
var scrollLeft = function () { 
if (!_this.is(":animated")) { 
_this.animate({ 
left: upWidth 
}, speed, function () { 
for (i = 1; i <= line; i++) { 
_this.find("a:first").appendTo(_this); 
} 
_this.css({ left: 0 }); 
}); 
} 
} 
var scrollRight = function () { 
if (!_this.is(":animated")) { 
for (i = 1; i <= line; i++) { 
_this.find("a:last").show().prependTo(_this); 
} 
_this.css({ left: upWidth }); 
_this.animate({ 
left: 0 
}, speed, function () { 
}); 
} 
} //Shawphy:自动播放 
var autoPlay = function () { 
if (timer) timerID = window.setInterval(scrollLeft, timer); 
}; 
var autoStop = function () { 
if (timer) window.clearInterval(timerID); 
};　　　　　　　　　　　　//鼠标事件绑定 
_this.hover(autoStop, autoPlay).mouseout(); 
_btnleft.css("cursor", "pointer").click(scrollLeft).hover(autoStop, autoPlay); 
_btnright.css("cursor", "pointer").click(scrollRight).hover(autoStop, autoPlay); 
} 
}) 
})(jQuery); 

function slide(Name, Class, Width, Height, fun,Prev,Next,AutoPlay) {
	$(Name).width(Width);
	$(Name).height(Height);

	if (fun == true) {
		$(Name).append('<div class="title-bg"></div><div class="title"></div><div class="change"></div>')
		var atr = $(Name + ' div.changeDiv a');
		var sum = atr.length;
		for (i = 1; i <= sum; i++) {
			var title = atr.eq(i - 1).attr("title");
			var href = atr.eq(i - 1).attr("href");
			$(Name + ' .change').append('<i>' + i + '</i>');
			$(Name + ' .title').append('<a href="' + href + '">' + title + '</a>');
		}
		$(Name + ' .change i').eq(0).addClass('cur');
	}
	$(Name + ' div.changeDiv a').sGallery({ //对象指向层，层内包含图片及标题
		titleObj: Name + ' div.title a',
		thumbObj: Name + ' .change i',
		botLast: Name +' '+ Prev, //按钮上一个
		botNext: Name+' '+ Next, //按钮下一个
		autoChange : AutoPlay,
		thumbNowClass: Class,
		
	});
	$(Name + " .title-bg").width(Width);
}

//缩略图
jQuery.fn.LoadImage = function(scaling, width, height, loadpic) {
	if (loadpic == null) loadpic = "../images/msg_img/loading.gif";
	return this.each(function() {
		var t = $(this);
		var src = $(this).attr("src")
		var img = new Image();
		img.src = src;
		//自动缩放图片
		var autoScaling = function() {
			if (scaling) {
				if (img.width > 0 && img.height > 0) {
					if (img.width / img.height >= width / height) {
						if (img.width > width) {
							t.width(width);
							t.height((img.height * width) / img.width);
						} else {
							t.width(img.width);
							t.height(img.height);
						}
					} else {
						if (img.height > height) {
							t.height(height);
							t.width((img.width * height) / img.height);
						} else {
							t.width(img.width);
							t.height(img.height);
						}
					}
				}
			}
		}
		//处理ff下会自动读取缓存图片
		if (img.complete) {
			autoScaling();
			return;
		}
		$(this).attr("src", "");
		var loading = $("<img alt=\"加载中...\" title=\"图片加载中...\" src=\"" + loadpic + "\" />");

		t.hide();
		t.after(loading);
		$(img).load(function() {
			autoScaling();
			loading.remove();
			t.attr("src", this.src);
			t.show();
			//$('.photo_prev a,.photo_next a').height($('#big-pic img').height());
		});
	});
}

//向上滚动代码

function startmarquee(elementID, h, n, speed, delay) {
	var t = null;
	var box = '#' + elementID;
	$(box).hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval(start, delay);
	}).trigger('mouseout');

	function start() {
		$(box).children('ul:first').animate({
			marginTop: '-=' + h
		}, speed, function() {
			$(this).css({
				marginTop: '0'
			}).find('li').slice(0, n).appendTo(this);
		})
	}
}

//TAB切换

function SwapTab(name, title, content, Sub, cur) {
	$(name + ' ' + title).click(function() {
		$(this).addClass(cur).siblings().removeClass(cur);
		$(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
	});
}


	
