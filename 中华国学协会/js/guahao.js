$(function(){
	var host =document.domain;
	var selectNo = 0;
	if(host!="askm.boai.com"&&document.URL.indexOf(".shtml")>0){
		host = document.domain;
	}else if(document.referrer != ""){
		var referrer = document.referrer;
		var tmpurl = referrer.replace("http://","");
		var strs = new Array();
		strs = tmpurl.split("/");
		host = strs[0];
	}	
	switch(host){
		case "meirongm.boai.com":
			$("#keshiid").find("option[value='激光美容科']").attr("selected",true);
			selectNo = 2;
			break;
		case "zhengxingm.boai.com":
			$("#keshiid").find("option[value='整形美容科']").attr("selected",true);
			selectNo = 1;
			break;
		case "kouqiangm.boai.com":
			$("#keshiid").find("option[value='口腔科']").attr("selected",true);
			selectNo = 3;
			break;
		case "yankem.boai.com":
			$("#keshiid").find("option[value='眼科']").attr("selected",true);
			selectNo = 4;
			break;
		case "fukem.boai.com":
			$("#keshiid").find("option[value='妇科']").attr("selected",true);
			selectNo = 5;
			break;
		case "chankem.boai.com":
			$("#keshiid").find("option[value='产科']").attr("selected",true);
			selectNo = 6;
			break;
		case "nankem.boai.com":
			$("#keshiid").find("option[value='男科']").attr("selected",true);
			selectNo = 7;
			break;
		case "pifum.boai.com":
			$("#keshiid").find("option[value='皮肤科']").attr("selected",true);
			selectNo = 8;
			break;
		case "waikem.boai.com":
			$("#keshiid").find("option[value='外科']").attr("selected",true);
			selectNo = 9;
			break;
		case "neikem.boai.com":
			$("#keshiid").find("option[value='内科']").attr("selected",true);
			selectNo = 10;
			break;
		case "erbihoum.boai.com":
			$("#keshiid").find("option[value='耳鼻喉科']").attr("selected",true);
			selectNo = 11;
			break;
		case "ruxianm.boai.com":
			$("#keshiid").find("option[value='乳腺科']").attr("selected",true);
			selectNo = 12;
			break;
		case "zhongyim.boai.com":
			$("#keshiid").find("option[value='中医肝病科']").attr("selected",true);
			selectNo = 13;
			break;
		default:
			$("#keshiid").find("option[value='']").attr("selected",true);
			selectNo = 0;
			break;
	}
	//console.log("host="+host);
	//console.log("selectNo="+selectNo);	
	$("#keshiid").dropkick({
		mobile: true,
 		initialize:function(){
			 dk = this;
			 dk.selectOne(selectNo,false);
		}//参数说明 http://www.uedsc.com/dropkick.html
	});			
	$(".reset").click(function(){
		$("input[name='txtName']").val("");
		$("input[name='txtTel']").val("")
	});		
	$(".submit").click(function(){
		var keshiid = $("#keshiid option:selected").val();
		var txtName = $("input[name='txtName']").val();
		var txtTel = $("input[name='txtTel']").val();
		var reg =  /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		var reg2 = /^1[358][0123456789]\d{8}$/;
		if(keshiid == ""){
			alert("请选择预约科室");
		}else if(!reg.test(txtName)){
			alert("您的姓名必须为中文！");
		}else if(!reg2.test(txtTel)){
			alert("您的手机号码错误！");
		}else{
			window.location="../../m.boai.com/jiuyi/guahao/add1.php@txttype=yuyue&txtName="+txtName+"&txtTel="+txtTel+"&keshiid="+keshiid;
		}
	})
})