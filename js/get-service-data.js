$(function() {
				$.ajax({
					type: "get",
					url: "PHP/news-content.php",
					dataType: "JSON",
					async: true,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						//通常情况下textStatus和errorThrown只有其中一个包含信息
						//调用本次ajax请求时传递的options参数
						alert(XMLHttpRequest.status + "数据请求失败");
					},
					success: function(data) {
						var isTrue = data.success;
						var resultList = new Array();
						if(isTrue == 'true') {
							resultList = data.result;
							//							alert(resultList.length);
							for(var i = 0; i < resultList.length; i++) {
								$(".model1").append($(".model-first").text());
								var _mode_item = $(".model-item").eq(i);
								var firstModeContent = resultList[i];
								$(".model-title").eq(i).html(firstModeContent.twoColumn);
								var secondModeList = new Array();
								secondModeList = firstModeContent.list;
								var secondModeContent = secondModeList[0];
								$(".big-title").eq(i).html("【" + secondModeContent.title + "】");
								var imgUrl=base_path+secondModeContent.magaImgurl.substring(1,secondModeContent.magaImgurl.length);
								$(".big-pic").eq(i).attr("src",imgUrl);
								$(".news-id").eq(i).html(secondModeContent.id);
								
//								$("#fup").attr("src",路径)
								
								$(".summary").eq(i).html(secondModeContent.summary);
								if(secondModeList.length >= 2) {
									for(var j = 1; j < secondModeList.length; j++) {
										_mode_item.find(".model2").append($(".model-second").text());
										var thirdModeContent = secondModeList[j];
//										alert(thirdModeContent.title);
										_mode_item.find(".model2 .small-title").eq(j - 1).html("【" + thirdModeContent.title + "】");
										_mode_item.find(".model2 .mui-ellipsis").eq(j - 1).html(thirdModeContent.summary);
										var small_img_url=base_path+thirdModeContent.magaImgurl.substring(1,thirdModeContent.magaImgurl.length);
										_mode_item.find(".model2 .mui-media-object").eq(j - 1).attr("src",small_img_url);
											_mode_item.find(".model2 .news-id2").eq(j - 1).html(thirdModeContent.id);
									}
								}
							}
						} else {
							alert("数据获取失败！")
						}
					}
				});
			})

//点击右上角更换内容
function getCurrentTopic(jsonUrl){
				$.ajax({
					type: "get",
					url: jsonUrl,
					dataType: "JSON",
					async: true,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						//通常情况下textStatus和errorThrown只有其中一个包含信息
						//调用本次ajax请求时传递的options参数
						alert(XMLHttpRequest.status + "不成功00");
					},
					success: function(data) {
						var isTrue = data.success;
						var resultList = new Array();
						if(isTrue == 'true') {
							resultList = data.result;
							//							alert(resultList.length);
							for(var i = 0; i < resultList.length; i++) {
								$(".model1").append($(".model-first").text());
								var _mode_item = $(".model-item").eq(i);
								var firstModeContent = resultList[i];
								$(".model-title").eq(i).html(firstModeContent.twoColumn);
								var secondModeList = new Array();
								secondModeList = firstModeContent.list;
								var secondModeContent = secondModeList[0];
								$(".big-title").eq(i).html("【" + secondModeContent.title + "】");
								var imgUrl=base_path+secondModeContent.magaImgurl.substring(1,secondModeContent.magaImgurl.length);
								$(".big-pic").eq(i).attr("src",imgUrl);
								$(".news-id").eq(i).html(secondModeContent.id);
								
//								$("#fup").attr("src",路径)
								
								$(".summary").eq(i).html(secondModeContent.summary);
								if(secondModeList.length >= 2) {
									for(var j = 1; j < secondModeList.length; j++) {
										_mode_item.find(".model2").append($(".model-second").text());
										var thirdModeContent = secondModeList[j];
//										alert(thirdModeContent.title);
										_mode_item.find(".model2 .small-title").eq(j - 1).html("【" + thirdModeContent.title + "】");
										_mode_item.find(".model2 .mui-ellipsis").eq(j - 1).html(thirdModeContent.summary);
										var small_img_url=base_path+thirdModeContent.magaImgurl.substring(1,thirdModeContent.magaImgurl.length);
										_mode_item.find(".model2 .mui-media-object").eq(j - 1).attr("src",small_img_url);
											_mode_item.find(".model2 .news-id2").eq(j - 1).html(thirdModeContent.id);
									}
								}
							}
						} else {
							alert("数据获取失败！")
						}
					}
				});
			}