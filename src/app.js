"use strict";
let h5Express = angular.module("h5Express", ['ui.router', 'oc.lazyLoad', 'app.servers', 'app.directives']);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
h5Express.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
        debug: true,
        events: true
    });
}]);

h5Express.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/demo/5555"); // 1.当没有后缀，强制定向；2.不在配置之列的路由参数强制定向。
    $urlRouterProvider.otherwise('/demo/5555'); // 未认证链接跳转到/

    $stateProvider
        .state('didiCollect', {
            name: 'didiCollect',
            url: '/didiCollect',
            cache: false,
            reload: true,
            data: {
                pageTitle: '我的收集'
            },
            templateUrl: './template/didiCollect/didiCollect.html',
            controller: 'didiCollectController'
        })
        .state('didiRanking', {
            name: 'didiRanking',
            url: '/didiRanking',
            cache: false,
            reload: true,
            data: {
                pageTitle: '排行榜'
            },
            templateUrl: './template/didiRanking/didiRanking.html',
            controller: 'didiRankingController'
        })
        .state('didiGiftList', {
            name: 'didiGiftList',
            url: '/didiGiftList',
            cache: false,
            reload: true,
            data: {
                pageTitle: '礼品列表'
            },
            templateUrl: './template/didiGiftList/didiGiftList.html',
            controller: 'didiGiftListController'
        })
        .state('didiIndex', {
            name: 'didiIndex',
            url: '/didiIndex',
            cache: false,
            reload: true,
            data: {
                pageTitle: '滴滴校园活动'
            },
            templateUrl: './template/didiIndex/didiIndex.html',
            controller: 'didiIndexController'
        })
        .state('demo', {
            name: 'demo',
            url: '/demo/:id',
            cache: false,
            reload: true,
            data: {
                pageTitle: '演示页面'
            },
            templateUrl: './template/demo/demo.html',
            controller: 'demoController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'zepto.js',
                        serie: true,
                        cache: false,
                        files: [
                            './lib/zepto/zepto.js'
                        ]
                    }).then(function() {
                        // 初始化方法
                        console.log('zepto.min.js 加载完毕');
                    });
                }]
            }
        });
}]);

h5Express.controller('rootController', ['$rootScope', '$scope', function($rootScope, $scope) {
    return rootController($rootScope, $scope);
}]);

function rootController($rootScope, $scope) {
    $rootScope.appLog('rootController init');
    $rootScope.bodyclass = 'index';
}

/* Init global settings and run the app */
h5Express.run(["$rootScope", "$state", '$ocLazyLoad', function($rootScope, $state, $ocLazyLoad) {
    $rootScope.__state = $state;
    $rootScope.appLog = function(msg) {
        return console.info("%c angular-log=>" + msg + "", "background: rgba(255, 255, 255, 1);font-size: 1rem;color: #000")
    }; // 全局注册一个log方法

    $rootScope.appLog('app run');

    // 弹窗插件
    $ocLazyLoad.load([
        './lib/layer-v3.0.3/layer/skin/default/layer.css',
        './lib/animate/animate.min.css'
    ]).then(function(res) {
        console.log('layer弹窗插件css animate.min.css 资源 加载完毕');
    });

}]);