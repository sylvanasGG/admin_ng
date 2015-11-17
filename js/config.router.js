'use strict';


angular.module('app')
    .run(
            [          '$rootScope', '$state', '$stateParams',
                function ($rootScope,   $state,   $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.baseUrl = 'http://localhost/Anjs/app/php/';
                    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
                        $rootScope.menuActive = toState.name;
                        if(toState.name=='login')return;// 如果是进入登录界面则允许
                        // 如果用户不存在
                        if(!window.localStorage.getItem('admin')){
                            event.preventDefault();// 取消默认跳转行为
                            $state.go("login");//跳转到登录界面
                        }
                    });
                }
            ]
        )
    .config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
        .state('app', {
            url: "/app",
            views:{
                "":{
                    templateUrl: "tpl/index.html"
                },
                "header@app":{
                    templateUrl:'tpl/layout/header.html',
                    //controller:'loginController'
                },
                "main@app":{
                    templateUrl:'tpl/layout/main.html'
                },
                "sidebar@app":{
                    templateUrl:'tpl/layout/sidebar.html',
                    controller:''
                }
            }
        })
        .state('app.userList', {
            url: "/userList",
            views:{
                "main": {
                    templateUrl: "tpl/user/userList.html"
                }
            }
             ,
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 userList: ['$ocLazyLoad', function($ocLazyLoad) {
                 // you can lazy load files for an existing module
                 return $ocLazyLoad.load('js/controllers/user.js');
               }]
             }

        })
        .state('app.userAdd', {
            url: "/userAdd",
            views:{
                "main": {
                    templateUrl: "tpl/user/userAdd.html",
                    //controller: 'userAddController'
                }
            }
        })
        .state('app.editUser', {
            url: "/editUser/:id",
            views:{
                "main": {
                    templateUrl: "tpl/user/userEdit.html",
                    //controller: 'userEditController'
                }
            }
        })
        .state('app.groupList', {
            url: "/groupList",
            views:{
                "main": {
                    templateUrl: "tpl/user/groupList.html"
                }
            }
        })
        .state('app.addGroup', {
            url: "/addGroup",
            views:{
                "main": {
                    templateUrl: "tpl/user/addGroup.html"
                }
            }
        })
        .state('app.groupAccess', {
            url: "/groupAccess/:id",
            views:{
                "main": {
                    templateUrl: "tpl/user/groupAccess.html"
                }
            }
        })
        .state('app.imgUpload', {
            url: "/imgUpload",
            views:{
                "main": {
                    templateUrl: "tpl/img/index.html",
                    //controller: 'userEditController'
                }
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: "tpl/auth/signin.html"
        })
        .state('loginOut', {
            url: "/loginOut",
            templateUrl: "tpl/auth/signin.html"
        })
        .state('app.test', {
            url: "/test",
            views:{
                "main": {
                    templateUrl: "tpl/test.html"
                }
            }
        })
        .state('app.page', {
            url: "/page",
            views:{
                "main": {
                    templateUrl: "tpl/page/demo.html"
                }
            }
        });
});