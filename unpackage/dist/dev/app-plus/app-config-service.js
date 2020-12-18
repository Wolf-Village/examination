
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/examination/examination","pages/practice/practice","pages/search/search","pages/my/my","pages/examination/index","pages/practice/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","background":"#efeff4"},"tabBar":{"color":"#554D53","selectedColor":"#1296db","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/iconimg/home.png","selectedIconPath":"static/iconimg/home_S.png","text":"首页"},{"pagePath":"pages/examination/index","iconPath":"static/iconimg/exam.png","selectedIconPath":"static/iconimg/exam_S.png","text":"考试页面"},{"pagePath":"pages/practice/index","iconPath":"static/iconimg/practice.png","selectedIconPath":"static/iconimg/practice_S.png","text":"练习页面"},{"pagePath":"pages/search/search","iconPath":"static/iconimg/search.png","selectedIconPath":"static/iconimg/search_S.png","text":"搜索页面"},{"pagePath":"pages/my/my","iconPath":"static/iconimg/my.png","selectedIconPath":"static/iconimg/my_S.png","text":"我的页面"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"examination","compilerVersion":"2.9.8","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/examination/examination","meta":{},"window":{"navigationBarTitleText":"考试页面"}},{"path":"/pages/practice/practice","meta":{},"window":{"navigationBarTitleText":"练习页面"}},{"path":"/pages/search/search","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"搜索页面"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的页面"}},{"path":"/pages/examination/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"前端考试"}},{"path":"/pages/practice/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"前端练习"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
