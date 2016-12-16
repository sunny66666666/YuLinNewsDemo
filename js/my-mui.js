mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//实现顶部标题的触发事件
(function($, doc) {
				$.init();
				$.ready(function() {
					//普通示例
					var userPicker = new $.PopPicker();
					userPicker.setData([{
						value: 'ywj',
						text: '2016年08月总第103期'
					}, {
						value: 'aaa',
						text: '2016年06月总第102期'
					}, {
						value: 'ymt',
						text: '2016年04月总第101期'
					}, {
						value: 'shq',
						text: '2016年02月总第10期'
					}, {
						value: 'zhbh',
						text: '2015年10月总第97期'
					}, {
						value: 'zhy',
						text: '2015年09月总第96期'
					}]);
					var showUserPickerButton = doc.getElementById('showUserPicker');
					var userResult = doc.getElementById('userResult');
					showUserPickerButton.addEventListener('tap', function(event) {
						userPicker.show(function(items) {
							userResult.innerText = JSON.stringify(items[0]);
							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
					//-----------------------------------------

				});
			})(mui, document);
			
//点击侧滑的导航页面
document.getElementById('user-guide').addEventListener('tap', function() {
				//打开关于页面
				var newsid=$(this).find(".news-id").html();
				mui.openWindow({
					url: 'use-guide.html',
					id: 'use-guide'
				});
			});
//点击版本更新
document.getElementById('update').addEventListener('tap', function() {
				//打开关于页面
				mui.toast("当前为最新版本！")
			});
			
//点击大模块的跳转事件
mui("body").on('tap',"#detail-news", function() {
				//打开关于页面
				var newsid=$(this).find(".news-id").html();
				console.log("newsid");
				mui.openWindow({
					url: 'detail-news.html?'+newsid,
					id: 'detail-news'
				});
			});
			
//点击小模块的点击事件
mui("body").on('tap',"#detail-news2", function() {
				//打开关于页面
				var newsid2=$(this).find(".news-id2").html();
				console.log("newsid");
				mui.openWindow({
					url: 'detail-news.html?'+newsid2,
					id: 'detail-news2'
				});
			});
			
//点击右上角的更换内容事件
var btn = document.getElementById("type1");
				//监听点击事件
				btn.addEventListener("tap",function () {
					initHtml();
					mui('#popover').popover('hide');
					jQuery(".first-title").text("青春在线 QING CHUN ZAI XIAN");
				 	getCurrentTopic("PHP/news-content.php");
				});
				var btn = document.getElementById("type2");
				//监听点击事件
				btn.addEventListener("tap",function () {
					initHtml();
					mui('#popover').popover('hide');
					jQuery(".first-title").text("本期专题 BEN QI ZHUAN TI");
				 	getCurrentTopic("PHP/current-topic.php");
				});
				var btn = document.getElementById("type3");
				//监听点击事件
				btn.addEventListener("tap",function () {
					initHtml();
					mui('#popover').popover('hide');
					jQuery(".first-title").text("大美榆林 DAI MEI YU LIN");
				 	getCurrentTopic("PHP/beautiful-yulin.php");
				});
				
//更换内容前清空页面
function initHtml(){
					$(".model1").html("");
			}