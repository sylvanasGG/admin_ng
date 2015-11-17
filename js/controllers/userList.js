/**
 * Created by 77849 on 2015/9/24.
 *
 */
app.factory('loginUserService',function($rootScope,$http){
    
    return {
        loginUser :window.localStorage.getItem('admin')
    }
});

//var baseUrl = 'http://localhost/Anjs/app/php/';
//用户列表控制器
app.controller('userListController', function($rootScope,$scope,$http,$stateParams){
    console.log(123);
    var url = $rootScope.baseUrl+'getUserList.php';
    $http.get(url).success(function(result){
        if(result.success == true) {
            $scope.list = result.data;
        }
    });
    $scope.delete = function(index,id){
        if (!confirm('确定删除吗？')) return false;
        var url = $rootScope.baseUrl+'deleteUser.php?id='+id;
        $http.get(url).success(function(result){
            if(result.success == true) {
                $scope.list.splice(index,1);
            }
        });
    };
});

//用户编辑
app.controller('userEditController', function($rootScope,$scope,$http,$stateParams,$state){
    
    var url = $rootScope.baseUrl+'getUserById.php?id='+$stateParams.id;
    $http.get(url).success(function(result){
        if(result.success == true) {
            $scope.data = result.data;
        }
    });
    $scope.error    ='';

    $scope.subEdit = function(){
        var url = $rootScope.baseUrl+'editUser.php';
        $http.put(url,$scope.data).success(function(result){
            //console.log(result);
            if(result.success == true) {
                $state.go('app.userList');
            }
        });
    };
});

//增加用户控制器
app.controller('userAddController', function($rootScope,$scope, $http,$state){
    $scope.error    ='';
    $scope.data = {
        username:'',
        email:'',
        password:''
    };
    
    $scope.addUser = function(){
        var url = $rootScope.baseUrl+'addUser.php';
        $http.post(url,$scope.data).success(function(result){
            if(result.success == true) {
                $state.go('app.userList',{code:1,msg:'添加成功'});
            }
        });
    };
});


