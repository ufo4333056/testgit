/*
 *	sGallery 1.0 - simple gallery with jQuery
 *	made by bujichong 2009-11-25
 *	���ߣ����  2009-11-25
 * http://hi.baidu.com/bujichong/
 *	��ӭ����ת�أ��������������Ͷ��ɹ������������Դ������
 */

(function($) {
	$.fn.sGallery = function(o) {
		return new $sG(this, o);
		//alert('do');
	};

	var settings = {
		thumbObj: null, //Ԥ������
		titleObj: null, //����
		botLast: null, //��ť��һ��
		botNext: null, //��ť��һ��
		thumbNowClass: 'now', //Ԥ������ǰ��class,Ĭ��Ϊnow
		slideTime: 800, //ƽ������ʱ��
		autoChange: null, //�Ƿ��Զ��л�
		changeTime: 5000, //�Զ��л�ʱ��
		delayTime: 100 //��꾭��ʱ��Ӧ���ӳ�ʱ��
	};

	$.sGalleryLong = function(e, o) {
		this.options = $.extend({}, settings, o || {});
		var _self = $(e);
		var set = this.options;
		var thumb;
		var size = _self.size();
		var nowIndex = 0; //����ȫ��ָ��
		var index; //����ȫ��ָ��
		var startRun; //Ԥ�����Զ����в���
		var delayRun; //Ԥ�����ӳ����в���

		//��ʼ��
		_self.eq(0).show();

		//���л�����

		function fadeAB() {
			if (nowIndex != index) {
				if (set.thumbObj != null) {
					$(set.thumbObj).removeClass().eq(index).addClass(set.thumbNowClass);
				}
				_self.eq(nowIndex).stop(false, true).fadeOut(set.slideTime);
				_self.eq(index).stop(true, true).fadeIn(set.slideTime);
				$(set.titleObj).eq(nowIndex).hide(); //������title
				$(set.titleObj).eq(index).show(); //������title
				nowIndex = index;
				if (set.autoChange == true) {
					clearInterval(startRun); //�����Զ��л�����
					startRun = setInterval(runNext, set.changeTime);
				}
			}
		}

		//�л�����һ��

		function runNext() {
			index = (nowIndex + 1) % size;
			fadeAB();
		}

		//�����һͼƬ
		if (set.thumbObj != null) {
			thumb = $(set.thumbObj);
			//��ʼ��
			thumb.eq(0).addClass(set.thumbNowClass);
			thumb.bind("mousemove", function(event) {
				index = thumb.index($(this));
				fadeAB();
				delayRun = setTimeout(fadeAB, set.delayTime);
				clearTimeout(delayRun);
				event.stopPropagation();
			})
		}

		//�����һ��
		if (set.botNext != null) {
			var botNext = $(set.botNext);
			botNext.click(function() {
				runNext();
				return false;
			});
		}

		//�����һ��
		if (set.botLast != null) {
			var botLast = $(set.botLast);
			botLast.click(function() {
				index = (nowIndex + size - 1) % size;
				fadeAB();
				return false;
			});
		}

		//�Զ�����
		if (set.autoChange == true) {
			startRun = setInterval(runNext, set.changeTime);
		}

	}

	var $sG = $.sGalleryLong;

})(jQuery);

/*����*/

(function ($) { 
$.fn.extend({ 
Scroll: function (opt, callback) { 
if (!opt) var opt = {}; 
var _btnleft = $(opt.left); 
var _btnright = $(opt.right); 
var timerID; 
var _this = this.eq(0).find("div").eq(1); 
var lineW = _this.find("a:first").width(), //��ȡ�п� 
line = opt.line ? parseInt(opt.line, 10) : parseInt(_this.width() / lineW, 10), //ÿ�ι�����������Ĭ��Ϊһ�������������п� 
speed = opt.speed ? parseInt(opt.speed, 10) : 500; //�����ٶȣ���ֵԽ���ٶ�Խ�������룩 
timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //������ʱ���������룩 
if (line == 0) line = 1; 
var upWidth = 0 - line * lineW; 
//�������� 
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
} //Shawphy:�Զ����� 
var autoPlay = function () { 
if (timer) timerID = window.setInterval(scrollLeft, timer); 
}; 
var autoStop = function () { 
if (timer) window.clearInterval(timerID); 
};������������������������//����¼��� 
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
	$(Name + ' div.changeDiv a').sGallery({ //����ָ��㣬���ڰ���ͼƬ������
		titleObj: Name + ' div.title a',
		thumbObj: Name + ' .change i',
		botLast: Name +' '+ Prev, //��ť��һ��
		botNext: Name+' '+ Next, //��ť��һ��
		autoChange : AutoPlay,
		thumbNowClass: Class,
		
	});
	$(Name + " .title-bg").width(Width);
}

//����ͼ
jQuery.fn.LoadImage = function(scaling, width, height, loadpic) {
	if (loadpic == null) loadpic = "../images/msg_img/loading.gif";
	return this.each(function() {
		var t = $(this);
		var src = $(this).attr("src")
		var img = new Image();
		img.src = src;
		//�Զ�����ͼƬ
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
		//����ff�»��Զ���ȡ����ͼƬ
		if (img.complete) {
			autoScaling();
			return;
		}
		$(this).attr("src", "");
		var loading = $("<img alt=\"������...\" title=\"ͼƬ������...\" src=\"" + loadpic + "\" />");

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

//���Ϲ�������

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

//TAB�л�

function SwapTab(name, title, content, Sub, cur) {
	$(name + ' ' + title).click(function() {
		$(this).addClass(cur).siblings().removeClass(cur);
		$(content + " > " + Sub).eq($(name + ' ' + title).index(this)).show().siblings().hide();
	});
}


	
