
// TODO: 上学的时候写的，我还没想好怎么封装成咱么公用的，这个先放在这里
/**邮箱正则表达式
 * 格式为：xxx@x.com
 */
var emailzz = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
/**办公电话验证
 * 格式为：000-0000000或13100001111
 */
var phonezz = /((\d{4})?-?[1-9][0-9]{6,7})|([1-9][34578]\d{9})/;
/**固定电话+手机验证
 * 格式为：0000-00000000或18900000000
 */
var newphonezz = /^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$/;
/**固定电话
 * 格式为：010-87654321
		 01087654321
		 0123-87654321
		 012387654321
		 010-8765432
		 0108765432
		 87654321
		 8765432
 */
var telzz = /^(\d{3,4}\-?)?\d{7,8}$/;
/**手机验证
 * 格式为：13100001111
 */
var iphonezz = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
/**性别验证
 * 格式为：男|女
 */
var patternzz = /^['男'|'女']$/ ; 
/**年龄验证
 * 格式为：0-120岁
 */
var agezz = /^([1-9]\d|\d)$/;
/**
 * 经度验证
 * 格式为：000.000000
 */
var jdzz = /^(-?((180)|(((1[0-7]\d)|(\d{1,2}))(\.\d{1,6})?)))$/;  
/**
 * 纬度验证
 * 格式为：00.000000
 */
var wdzz = /^(-?((90)|((([0-8]\d)|(\d{1}))(\.\d{1,6})?)))$/;
/**
 * 数字
 * 格式为：必须为数字
 */
var numberzz = /^-?((\d+)|(\d+.\d+))$/;

/**
 * 只为正整数数字
 * 格式为：必须为数字
 */
var numberzzs = /^\d+$/;
/**
 * IP
 * 格式为：000.000.000.000
 */
var ipzz = /^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}$/;
/**
 * 版本号
 * 格式为：0.0.0
 */
var bbhzz = /^\d+.\d+.\d+$/;
/**
 * 身份证号
 * 格式为：18位
 */
var sfz = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/;

/**失去焦点验证
*@param inputId,imgId,verificationType,str1,str2,str3 
*参数说明：
*inputId为控件id；imgId为提示图片的位置Id;
*verificationType为验证类型(length，password，zzbds)；
*str1(长度验证代表最小长度，正则表达式验证代表正则表达式名称);
*str2(长度验证代表最大长度，正则表达式验证代表正则表达式的格式);
*str3(被验证的控件的label名)
**/
var alertObject;
var alertMessage;

function onblurVerification2(inputId,imgId,verificationType,str1,str2,str3){
	var o = document.getElementById(inputId);
	if(o.value!=""&&verificationType=="zzbds"){
		if(str1.test(o.value)){ 
			document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\"你输入的内容符合要求！\"  src=\"../assets/images/drop-yes.gif\"  />";
			if(o==alertObject){
				alertObject=undefined
			}
		}else{ 
			if(alertObject==undefined){
				alertObject = o;
				alertMessage = "格式应为"+str2;
			}
			document.getElementById(imgId).innerHTML="<img style=\"vertical-align:text-bottom;\"  title=\"请输入正确的"+str3+"格式。格式为"+str2+"\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >格式应为"+str2+"</strong>";
		}
	}
}


function onblurVerification(inputId,imgId,verificationType,str1,str2,str3){
		var o = document.getElementById(inputId);
		if(o.value=="" || o.value==-1){
			if(alertObject==undefined){
				alertObject = o;
				alertMessage = str3+"不能为空！";
			}
			document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\""+str3+"不能为空！\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >"+str3+"不能为空！</strong>";
		}else if(o.value!=""&&verificationType=="length"){
			if(o.value.length<str1||o.value.length>str2){
				if(alertObject==undefined){
					alertObject = o;
					alertMessage = str3+"长度必须在"+str1+"至"+str2;
				}
				document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\""+str3+"长度必须在"+str1+"至"+str2+"\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >"+str3+"长度必须在"+str1+"至"+str2+"</strong>";
			}else{
				document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\"你输入的内容符合要求！\" src=\"../assets/images/drop-yes.gif\"  />";
				if(o==alertObject){
					alertObject=undefined
				}
			}
		}else if(o.value!=""&&verificationType=="password"&&document.getElementById("password").value!=o.value){
			if(alertObject==undefined){
				alertObject = o;
				alertMessage = "确认密码必须和原密码一致！";
			}
			document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\"确认密码必须和原密码一致！\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >确认密码必须和原密码一致！</strong>";
		}else if(o.value!=""&&verificationType=="zzbds"){
			if(str1.test(o.value)){ 
				document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\"你输入的内容符合要求！\"  src=\"../assets/images/drop-yes.gif\"  />";
				if(o==alertObject){
					alertObject=undefined
				}
			}else{ 
				if(alertObject==undefined){
					alertObject = o;
					alertMessage = "格式应为"+str2;
				}
				document.getElementById(imgId).innerHTML="<img style=\"vertical-align:text-bottom;\"  title=\"请输入正确的"+str3+"格式。格式为"+str2+"\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >格式应为"+str2+"</strong>";
			}
		}else if(o.value!="" && verificationType=="zzsex"){
			if(o.value=="男" || o.value=="女"){ 
				document.getElementById(imgId).innerHTML="<img  style=\"vertical-align:text-bottom;\" title=\"你输入的内容符合要求！\"  src=\"../assets/images/drop-yes.gif\"  />";
				if(o==alertObject){
					alertObject=undefined
				}
			}else{ 
				if(alertObject==undefined){
					alertObject = o;
					alertMessage = "格式应为"+str2;
				}
				document.getElementById(imgId).innerHTML="<img style=\"vertical-align:text-bottom;\"  title=\"请输入正确的"+str3+"格式。格式为"+str2+"\" src=\"../assets/images/drop-no.gif\"  /><strong style=\"color:red;font-size: 14px;\" >格式应为"+str2+"</strong>";
			}
		}else{
			document.getElementById(imgId).innerHTML="<img style=\"vertical-align:text-bottom;\"  title=\"你输入的内容符合要求！\"  src=\"../assets/images/drop-yes.gif\"  />";
			if(o==alertObject){
				alertObject=undefined
			}
		}
	}


/**
 * 提交验证
 * @returns {Boolean}
 */
function submitverification(){
	jQuery(":input").blur();
	if(alertObject==undefined){
		return true;
	}else{
		jQuery.dialog({ 
			icon: 'alert.gif',
			title:'警告',
		    content: alertMessage, 
		    width: "230px",
			height: "100px",
			max: false, 
		    min: false,
		    drag: false, //禁止拖动
		    resize: false, //禁止拖动
		    lock: "true", 
		    ok: function(){ 
		    	alertObject.focus();
		    	alertObject=undefined;
		    }
		});
		return false;
	}
}
/**
 * 弹框
 * @param title,mtop,width,height,url
 * tilte 弹出窗体的标题；mtop距离页面头部距离(50%百分比)；
 * width弹出窗体的宽(900px固定宽)；height弹出窗体的高(450px固定高)；
 * url 弹出窗体引用的页面地址
 */
function showDialog(title,mtop,width,height,url){
    var api = jQuery.dialog({
      title:title,
      drag: true, //禁止拖动
      resize: true, //禁止拖动
      fixed: true, //滑动滚动条时，弹出层的位置不变
      top: mtop, 
      max: true, 
	  min: false,
	  //autoSize:true,
      width:width,
	  height: height,
	  lock:true,
	  content: 'url:'+url
	});
}
 
/*
 * 禁止最大化最小化按钮 
 */
function showDialog1(title,mtop,width,height,url){
    var api = jQuery.dialog({
      title:title,
      drag: false, //禁止拖动
      resize: false, //禁止拖动
      fixed: true, //滑动滚动条时，弹出层的位置不变
      top: mtop, 
      max: false, 
	  min: false,
	  //autoSize:true,
      width:width,
	  height: height,
	  lock:true,
	  content: 'url:'+url
	});
}

/**
 * 自定义弹框
 * @param title,mtop,width,height,url
 * tilte 弹出窗体的标题；mtop距离页面头部距离(50%百分比)；
 * width弹出窗体的宽(900px固定宽)；height弹出窗体的高(450px固定高)；
 * str 弹出窗体的内容可以是自己写的html如：<img src="../_doc/images/android.jpg" width="600" height="404" />
 */
function showDialog_T(title,mtop,width,height,str){
    var api = jQuery.dialog({
      title:title,
      drag: false, //禁止拖动
      resize: false, //禁止拖动
      fixed: true, //滑动滚动条时，弹出层的位置不变
      top: mtop, 
      max: true, 
	  min: false,
      width:width,
	  height: height,
	  lock:true,
	  content: str
	});
}
/**
 * 删除提示弹框
 * @param url 要访问的后台删除地址
 */
function deleteDialog(url){
	var d = jQuery.dialog({ 
		title:'删除提示',
	    content: '您确认要删除该数据？', 
	    icon: 'prompt.gif',
		max: false, 
	    min: false,
	    drag: false, //禁止拖动
	    resize: false, //禁止拖动
	    top: "50%", 
	    width: "200px",
		height: "100px",
		lock: true, 
	    ok: function(){
	    	if(url == null || url == ""){
	    		jQuery.dialog({ 
					icon: 'success.gif',
					title:'提示',
				    content: '操作成功！', 
				    width: "200px",
	   				height: "100px",
	   				top: '50%', 
					max: false, 
				    min: false,
				    drag: false, //禁止拖动
				    resize: false, //禁止拖动
				    lock: "true", 
				    ok: function(){			
				    	if (window.currentUrl) {
				    		window.location.href = window.currentUrl.value;
				    		window.location.reload();
						} else if (window.queryForm) {
							window.queryForm.submit();
						} else {
							window.location.reload();
						}
					}
	    		});
	    	}else{
		    	jQuery.dialog.tips("数据加载中...",2,"loading.gif");
		    	jQuery.ajax({
						type : "post",//使用get方法访问后台
						dataType : "json",//返回json格式的数据
						url : url,//要访问的后台地址
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							jQuery.dialog({ 
								icon: 'alert.gif',
								title:'警告',
							    content: '系统出错，请稍后重试或联系管理员！ ', 
							    width: "250px",
				   				height: "100px",
				   				top: '50%', 
								max: false, 
							    min: false,
							    drag: false, //禁止拖动
							    resize: false, //禁止拖动
							    lock: "true", 
							    ok: function(){d.close();}
						});	
					},
						success : function(json) {
							if(json.success){
								jQuery.dialog({ 
											icon: 'success.gif',
											title:'提示',
										    content: '操作成功！', 
										    width: "200px",
							   				height: "100px",
							   				top: '50%', 
											max: false, 
										    min: false,
										    drag: false, //禁止拖动
										    resize: false, //禁止拖动
										    lock: "true", 
										    ok: function(){			
										    	if (window.currentUrl) {
										    		window.location.href = window.currentUrl.value;
										    		window.location.reload();
												} else if (window.queryForm) {
													window.queryForm.submit();
												} else {
													window.location.reload();
												}
											}
							       	});
							}else{
								jQuery.dialog({ 
									icon: 'alert.gif',
									title:'警告',
								    content: '删除失败，数据可能已被引用！ ', 
								    width: "230px",
					   				height: "100px",
					   				top: '50%', 
									max: false, 
								    min: false,
								    drag: false, //禁止拖动
								    resize: false, //禁止拖动
								    lock: "true", 
								    ok: function(){d.close();}
							});	
							}
						}
					});
	    		}
	        return false; 
	    }, 
	    cancelVal: '关闭', 
	    cancel: true /*为true等价于function(){}*/ 
	});
}
/**
 * 警告弹框
 * @param content 警告内容
 */
function alertDialog(content){
	jQuery.dialog({ 
		icon: 'alert.gif',
		title:'警告',
	    content: content, 
	    width: "230px",
		height: "100px",
	    top: "50%", 
		max: false, 
	    min: false,
	    drag: false, //禁止拖动
	    resize: false, //禁止拖动
	    lock: "true", 
	    ok: function(){}
	});	
}

/**
 * 成功弹框
 * @param content 成功内容
 * 2015-3-27加
 */
function successDialog(content,api){
	if(content == null || content == ""){
		content = "操作成功！";
	}
	var successD = jQuery.dialog({ 
		icon: 'success.gif',
		title:'提示',
	    content: content, 
	    width: "200px",
			height: "100px",
			top: '50%', 
		max: false, 
	    min: false,
	    drag: false, //禁止拖动
	    resize: false, //禁止拖动
	    lock: "true", 
	    ok: function(){
	    	if(api == null || api == ""){
	    		//successD.close();
	    		//window.location.reload();
	    		window.location.replace(document.referrer);
	    	}else if(api == "no"){
	    		successD.close();
	    	}else{
	    		api.close();
	    		
	    	}
		}
	});
}
/**
 * AJAX异步提交数据到后台用于添加和更新
 * @param frmId 需要提交的form的ID
 * @param url 要访问的后台地址
 * @param dialogObj 需要关闭的弹出窗体对象一般是api;(在页面写入一下代码 var api = frameElement.api, W = api.opener;)
 * @param iframeObj 需要刷新的iframe对象;(一般默认为 parent.QQQrightIframe)
 */
var isCommitted = false;//表单是否已经提交标识，默认为false
function addOrUpdate(frmId,url,dialogObj,iframeObj){
	 if(isCommitted==false){
		 isCommitted = true;//提交表单后，将表单是否已经提交标识设置为true
		 	jQuery.dialog.tips("数据加载中...",2,"loading.gif");
			jQuery.ajax({
						type : "post",//使用get方法访问后台
						dataType : "json",//返回json格式的数据
						data : jQuery('#'+frmId).serialize(),
						url : url,//要访问的后台地址
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							jQuery.dialog({ 
								icon: 'alert.gif',
								title:'警告',
							    content: '失败，请重新填写数据！ ', 
							    width: "200px",
				   				height: "100px",
				   				top: '50%', 
								max: false, 
							    min: false,
							    drag: false, //禁止拖动
							    resize: false, //禁止拖动
							    lock: "true", 
							    ok: function(){}
						});	
					},
						success : function(json) {
							jQuery.dialog({ 
											icon: 'success.gif',
											title:'提示',
										    content: '操作成功！', 
										    width: "200px",
							   				height: "100px",
							   				top: '50%', 
											max: false, 
										    min: false,
										    drag: false, //禁止拖动
										    resize: false, //禁止拖动
										    lock: "true", 
										    ok: function(){
													if(dialogObj!=null){
														if (iframeObj.currentUrl) {
															iframeObj.location.href = iframeObj.currentUrl.value;
														} else if (iframeObj.queryForm) {
															iframeObj.queryForm.submit();
														} else {
															iframeObj.location.reload();
														}
											            dialogObj.close();
												     }else{
												    	 window.location.reload();
												     }
											}
							       	});
							}
					});
	 }else{
		 alert("数据已提交，请不要多次点击提交按钮！");
		/* jQuery.dialog({
				icon: 'alert.gif',
				title:'警告',
			    content: '请不要多次点击提交按钮！ ', 
			    width: "200px",
				height: "100px",
				top: '50%', 
				max: false, 
			    min: false,
			    drag: false, //禁止拖动
			    resize: false, //禁止拖动
			    lock: "true", 
			    ok: function(){}
		});	*/
	 }
}

function addOrUpdate1(frmId,url,dialogObj,iframeObj){
	jQuery.dialog.tips("数据加载中...",2,"loading.gif");
	jQuery.ajax({
				type : "post",//使用get方法访问后台
				dataType : "json",//返回json格式的数据
				 data : jQuery('#'+frmId).serialize(),
				url : url,//要访问的后台地址
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					jQuery.dialog({ 
						icon: 'alert.gif',
						title:'警告',
					    content: '失败，请重新填写数据！ ', 
					    width: "200px",
		   				height: "100px",
		   				top: '50%', 
						max: false, 
					    min: false,
					    drag: false, //禁止拖动
					    resize: false, //禁止拖动
					    lock: "true", 
					    ok: function(){}
				});	
			},
				success : function(json) {
					var d = jQuery.dialog({ 
									icon: 'success.gif',
									title:'提示',
								    content: '操作成功！', 
								    width: "200px",
					   				height: "100px",
					   				top: '50%', 
									max: false, 
								    min: false,
								    drag: false, //禁止拖动
								    resize: false, //禁止拖动
								    lock: "true", 
								    ok: function(){
											if(dialogObj!=null){
												if(iframeObj == "no"){
													d.close();
												}else{
													iframeObj.location.reload();
													dialogObj.close();
												}
										     }else{
										    	 window.location.reload();
										     }
									}
					       	});
					}
			});
}
/**
 * 复选框全选和反全选
 * @param id
 */
function checkedall(id){
	var checkbox = document.getElementById(id);
	var checkboxall = document.getElementsByName("checkbox");
	if(checkbox. checked){
		for(var i = 0;i<checkboxall.length;i++){
			checkboxall[i].checked = true;
		}
	}else{
		for(var i = 0;i<checkboxall.length;i++){
			checkboxall[i].checked = false;
		}
	}
}


var c ;
/**
 * 省市县三级级联初始化，在添加页面调用onload="loads(true)"；
 * @param isLevel 是否有权限设定（1省市县都可以选，2可选市县，3只可选县）
 */
function loads(isLevel){
var codes=document.getElementById("code").value;
   c=codes.split(",");
if (c != null && c != "") {
		document.getElementById("province").value = c[0];
		change(1, true,isLevel);
	}else{
	 change(1,false,isLevel);
	}
}
/**
 * 省市县三级级联根据上级确定下级选项（change(1)或change(2)）
 * @param type 传入1是根据省确定市，传入2是根据市确定县
 * @param isUp 是否是更新页面调用，出入true或false（一般情况下无需传入）
 * @param isLevel 是否有权限设定（一般情况下无需传入；1省市县都可以选，2可选市县，3只可选县）
 */
function change(type,isUp,isLevel) {
	if (document.getElementById("province").value == -1) {
		document.getElementById("2s").innerHTML = "";
		var o = document.getElementById("2s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		document.getElementById("3s").innerHTML = "";
		var o = document.getElementById("3s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		return;
	}
	if (document.getElementById("2s").value == -1 && type == 2) {
		document.getElementById("3s").innerHTML = "";
		var o = document.getElementById("3s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		return;
	}

	var id;
	var grade;
	if (type == 1) {
		id = document.getElementById("province").value;
		document.getElementById("2s").innerHTML = "";
		var o = document.getElementById("2s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		document.getElementById("3s").innerHTML = "";
		var o = document.getElementById("3s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		grade = 0;
	}
	if (type == 2) {
		id = document.getElementById("2s").value;
		document.getElementById("3s").innerHTML = "";
		var o = document.getElementById("3s");
		var oo = document.createElement('option');
		oo.text = "请选择";
		oo.value = "-1";
		o.add(oo);
		grade = 1;
	}
	var o;
	jQuery.ajax({
		type : "post",//使用get方法访问后台
		dataType : "json",//返回json格式的数据
		data : 'entity.parentId='+id,
		url : paths+"/district/selectByParentid.action",//要访问的后台地址
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
		success : function(json) {
			jQuery.each(json, function(idx, item) {
				if (type == 1) {
					o = document.getElementById("2s");
				}else{
					o = document.getElementById("3s");
				}
				for (i = 0; i < json.list.length; i++) {
					var oo = document.createElement('option');
					oo.text = json.list[i].name;
					oo.value = json.list[i].id;
					o.add(oo);
					if (c != null && type == 1 && isUp == true) {
				      if(json.list[i].id== c[1]){
				      oo.selected=true;
				      disopt=json.list[i].id;
				      change(2,true,isLevel);
				      }
			    	 }
					if (c != null && type == 2 && isUp == true) {
					      if(json.list[i].id== c[2]){
					      oo.selected=true;
					      disopt=json.list[i].id;
					      }
				    	 }
				}
				if(isLevel)
					checkLevel(type,isUp);
			});
		}
	});

}
/**
 * 权限设定，本方法会根据初始化时传入的isLevel自动调用（1省市县都可以选，2可选市县，3只可选县）
 * @param type 传入1是根据省确定市，传入2是根据市确定县（一般情况下无需传入）
 * @param isUp 是否是更新页面调用，出入true或false（一般情况下无需传入）
 */
function checkLevel(type,isUp){
	var ss = document.getElementById("2s");
	var sss = document.getElementById("3s");
	if(level==2){
		for(j = 0; j < ss.length; j++){
			if(district==ss[j].value&&isUp==false&&type==1){
				var o = document.createElement('option');
				o.text = ss[j].text;
				o.value = ss[j].value;
			}else if(isUp==true&&ss[j].selected&&type==1){
				var o = document.createElement('option');
				o.text = ss[j].text;
				o.value = ss[j].value;
				if(ss[j].value!=-1){
					district = ss[j].value;
				}
			}else if(district==ss[j].value){
				var o = document.createElement('option');
				o.text = ss[j].text;
				o.value = ss[j].value;
			}
		}
		if(type==1){
			ss.options.length=0
			ss.add(o);
			
			jQuery.ajax({
			type : "post",//使用get方法访问后台
			dataType : "json",//返回json格式的数据
			data : 'entity.parentId='+district,
			url : paths+"/district/selectByParentid.action",//要访问的后台地址
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
			success : function(json) {
				var val = sss.value;
				sss.options.length=0;
				for (i = 0; i < json.list.length; i++) {
					var oo = document.createElement('option');
					oo.text = json.list[i].name;
					oo.value = json.list[i].id;
					if(val==json.list[i].id){
						oo.selected=true;
					}
					sss.add(oo);
				}
			}
		});
		}
	}else if(level==3){
		if(type==1){
			if(isUp)var val = ss.value;else var val = -1;
			jQuery.ajax({
				type : "post",//使用get方法访问后台
				dataType : "json",//返回json格式的数据
				data : 'entity.id='+district,
				url : paths+"/district/query.action?rt=json",//要访问的后台地址
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				},
				success : function(json) {
						var oo = document.createElement('option');
						if(isUp==false){
							oo.text = json.entity.name;
							oo.value = json.entity.id;
						}else{
							for(j = 0; j < sss.length; j++){
								if(sss[j].selected){
									oo.text = sss[j].text;
									oo.value = sss[j].value;
								}
							}
						}
						sss.options.length=0;
						sss.add(oo);
						if(json.entity.id==district){
							oo.selected=true;
							for(j = 0; j < ss.length; j++){
								if(json.entity.parentId==ss[j].value&&val==-1){
									var o = document.createElement('option');
									o.text = ss[j].text;
									o.value = ss[j].value;
								}else if(val!=-1&&ss[j].value==val){
									var o = document.createElement('option');
									o.text = ss[j].text;
									o.value = ss[j].value;
								}
							}
							ss.options.length=0
							ss.add(o);
						}
			}
			});
		}
	}
}


/**
* audioDstno被叫号 界面定义 一个隐藏域接收
* @param type 类型0音频1视频2短信
* @param messsage 短信内容（发短信使用）
*/
function audioFunction(type,messsage){
	var dstno =document.getElementById("audioDstno").value;
	if(dstno==null){
		return;
	}
	var url="";
	if(type==1 ||type==0){
		url="../audio/audioJson.action?rt=json&type="+type;
	}else{
		url="../audio/sendSipMessage.action?rt=json";
	}
	jQuery.ajax({
		type : "post",//使用get方法访问后台
		dataType : "json",//返回json格式的数据
		url : url+"&dstno="+dstno.value+"&messsage="+messsage,//要访问的后台地址
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		},
		success : function(json) {
			var jsonStr = json.json ;
			var obj = JSON.parse(jsonStr); 
			//var obj1 = eval('(' + jsonStr+ ')');
			if(obj.errno==0){
				alert(obj.errmsg);
			}else{
				alert("错误码："+obj.errno+"\n错误信息："+obj.errmsg);
			}
			
		}
	});
}

/**
 * 弹框最大化
 * @param title,mtop,width,height,url
 * tilte 弹出窗体的标题；mtop距离页面头部距离(50%百分比)；
 * width弹出窗体的宽(900px固定宽)；height弹出窗体的高(450px固定高)；
 * url 弹出窗体引用的页面地址
 */
function showDialogMax(title,mtop,width,height,url){
    var api = jQuery.dialog({
      title:title,
      drag: false, //禁止拖动
      resize: false, //禁止拖动
      fixed: true, //滑动滚动条时，弹出层的位置不变
      top: mtop, 
      max: true, 
	  min: false,
      width:width,
	  height: height,
	  lock:true,
	  content: 'url:'+url
	}).max();
}

/**
* @param dstno 接收号码
* 跳转页面使用
*/
function meassJsp(){
	var dstno =document.getElementById("audioDstno").value;
	if(dstno==null){
		return;
	}
	showDialog("发送短信","50%","600px","400px","../audio/messageJsp.action?rt=html&dstno="+dstno);
}
