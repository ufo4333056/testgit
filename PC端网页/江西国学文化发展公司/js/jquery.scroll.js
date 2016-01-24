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