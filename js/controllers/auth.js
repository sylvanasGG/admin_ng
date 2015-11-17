/**
 * Created by 77849 on 2015/11/6.
 */


app.controller('loginController',function($rootScope,$scope,$state,$http){
    $scope.adminInfo = {
        'name':'AngularJs后台系统'
    }
    $scope.error    ='';
    $scope.username = window.localStorage.getItem('admin');
    $scope.loginInfo = {
        'email':'',
        'password':''
    };

    $scope.login = function(){

        var url = $rootScope.baseUrl+'login.php';
        $http.post(url,$scope.loginInfo).success(function(result){
            if(result.success == true) {
                window.localStorage.setItem('admin',result.data.username);
                if ( window.localStorage.getItem('admin')) {
                    //$scope.username = window.localStorage.getItem('admin');
                    $state.go('app');
                }
            } else {
                $scope.error = '用户名或密码错误';
            }
        });
    };

    $scope.loginOut = function(){
        window.localStorage.removeItem('admin');
        $state.go('loginOut');
    }
});