MUI尝过的坑和重要知识点总结

1：自带的各种标签的 样式权重过高，重写不方便（和BootStrap比较来说，BootStrap更加灵活）<br>
2：链接跳转。常规的a标签 加href是无法跳转的，浏览器有效，但是在手机上运行是无效的
   需要添加mui的定义的点击事件。<br>分两种
(1)：页面已存在的跳转标签<br>
```javascript
   <script>
			document.getElementById('user-guide').addEventListener('tap', function() {
				//打开关于页面
				var newsid=$(this).find(".news-id").html();
				mui.openWindow({
					url: 'use-guide.html',
					id: 'use-guide'
				});
			});
		</script>
```

(2):页面不存在的跳转标签（还可以在链接跳转过程中 添加传递的参数）<br>
```javascript
<script>
			mui("body").on('tap',"#detail-news", function() {
				//打开关于页面
				var newsid=$(this).find(".news-id").html();
				console.log("newsid");
				mui.openWindow({
					url: 'detail-news.html?'+newsid,
					id: 'detail-news'
				});
			});
		</script>

```
接受页面的处理：
```javascript
var newsid = window.location.href.split('?')[1];
```

3：页面过长，滑动没有效果
关键类：mui-scroll-wrapper
添加一个js就可以实现 页面滑动
```javascript
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
4：第三方  分享实现

在HBuilder中新创建新webapp项目 勾选 带登陆和设置的模板

里面包含 
第三方登陆<br>
分享<br>
图案锁屏<br>
5：关于模态框
模态框尽量放在根节点的子目录下（不要放在嵌套层），防止最外层的遮罩层的级别过高，覆盖模态框，导致点击事件无法触发响应<br>
6:MUI修改手机物理back的方法
首页的退出修改：
```javascript
<script> 
		     document.addEventListener("plusready", function() { 
		         // 注册返回按键事件 
		         plus.key.addEventListener('backbutton', function() { 
		         // 事件处理 
		             plus.nativeUI.confirm("退出程序？", function(event) { 
		                 if (event.index) { 
		                     plus.runtime.quit(); 
		                 } 
		             }, null, ["取消", "确定"]); 
		         }, false); 
		     }); 
		 </script> 
		 
		 //方法二
		 <script>
			var back_first = null;
			mui.back = function() {
				if(!back_first) {
					back_first = new Date().getTime();
					mui.toast('再按一次退出应用');
					setTimeout(function() {
						back_first = null;
					}, 2000);
				} else {
					if(new Date().getTime() - back_first < 2000) {
						plus.runtime.quit();
					}
				}
				return false;
			}
		</script>

```
首页进入子页面后 返回上一层的返回按钮注册
```javaccript
 <script> 
	     document.addEventListener("plusready", function() { 
	         // 注册返回按键事件 
	         plus.key.addEventListener('backbutton', function() { 
	             // 事件处理 
	             window.history.back(); 
	         }, false); 
	     }); 
	 </script> 
```
屏蔽返回按钮
```javascript
			var old_back = mui.back;
		    mui.back = function(){
		        return false;
		    }
```		   
7:实现原生APP里的进入导航实现，还可以，对进入的次数做监听
首次进入显示导航，以后进入都不需要导航
首页需要添加的事件
```javascript
		// 设置启动时的轮播页
	function launchScreen() {
		//读取本地存储，检查是否为首次启动
		var showGuide = plus.storage.getItem("lauchFlag");
		
//		if(showGuide){ 
//			//有值，说明已经显示过了，无需显示；
//			//关闭splash页面；
//			plus.navigator.closeSplashscreen();
//			plus.navigator.setFullscreen(false);
//		}else{
//			//显示启动导航
//			mui.openWindow({
//				id:'guide',
//				url:'guide.html',
//				show:{
//					aniShow:'none'
//				},
//				waiting:{
//					autoShow:false
//				}
//			});
//		}
//测试期间，为了让导航页每次显示，就不做以上判断
//显示启动导航
			mui.openWindow({
				id:'guide',
				url:'guide.html',
				show:{
					aniShow:'none'
				},
				waiting:{
					autoShow:false
				}
			});
	}
		</script>

```
调用方法
```javascript

<script type="text/javascript">
//只要是MUI都会有初始化的过程
			mui.init()
			 //创建子页面 初始化导航
			mui.plusReady(function() {
				launchScreen();
			});
		</script>

```
guide.html页面的实现
```javascript
<body>
		<div id="slider" class="mui-slider mui-fullscreen" style="background-color: black;">
			<div class="mui-slider-group">
				
				<!-- 第1张 -->
				<div class="mui-slider-item">
					<img src="img/leader1.jpg">
				</div>
				<!-- 第2张 -->
				<div class="mui-slider-item">
					<img src="img/leader2.jpg">
				</div>
				<!-- 第3张 -->
				<div class="mui-slider-item">
					<img src="img/leader3.jpg">
					<button id='close' class="mui-btn mui-btn-warning mui-btn-outlined"></button>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
		<script type="text/javascript" src="js/mui.min.js" ></script>
		<script>
			mui.back = function() {};
			mui.plusReady(function() {
				plus.navigator.setFullscreen(true);
				plus.navigator.closeSplashscreen();
			});
			//立即体验按钮点击事件
			document.getElementById("close").addEventListener('tap', function(event) {
				plus.storage.setItem("lauchFlag", "true"); 
				plus.navigator.setFullscreen(false);
				plus.webview.currentWebview().close();
			}, false);
			
			
		</script>
	</body>
```


MUI版扫码下载<br>
![ͼʾ 1](http://i.niupic.com/images/2017/01/13/bTLLwO.png)<br>
原生版下载二维码<br>
![ͼʾ 1](https://i.niupic.com/images/2017/02/07/i8GfVw.png)<br>
[APP下载地址](http://fir.im/nbx8)<br>
![ͼʾ 1](https://i.niupic.com/images/2016/12/12/Z4pu9p.jpg)
![ͼʾ 2](https://i.niupic.com/images/2016/12/12/Flttxd.jpg)
![ͼʾ 3](https://i.niupic.com/images/2016/12/12/L8krcb.jpg)
![ͼʾ 4](https://i.niupic.com/images/2016/12/12/abuwXk.jpg)
![ͼʾ 5](https://i.niupic.com/images/2016/12/12/gn9gXG.jpg)
