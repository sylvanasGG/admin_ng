/**
 * Created by 77849 on 2015/9/24.
 *
 */
app.factory('getGroupList',function($rootScope,$http){
    var url = $rootScope.baseUrl+'getGroupList.php';
    var data= [{'group_name':1},{'group_name':2}];
    var listF = function(){
        //return $http({method: 'GET', url: url});
        //return data;
        //$http.get(url).success(function(result){
        //    console.log(result.data);
        //    data=  result.data;
        //});
        return data;
    };
    return {
        groupList :function(){
            return listF();
        }
    }
});

//var baseUrl = 'http://localhost/Anjs/app/php/';
//用户列表控制器
app.controller('userListController', function($rootScope,$scope,$http,$stateParams){
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
        password:'',
        group:''
    };
    //var url2 = $rootScope.baseUrl+'getUserList.php';
    //$http.get(url2).success(function(result){
    //    if(result.success == true) {
    //        $scope.list = result.data;
    //    }
    //});
    $scope.addUser = function(){
        var url = $rootScope.baseUrl+'addUser.php';
        $http.post(url,$scope.data).success(function(result){
            if(result.success == true) {
                $state.go('app.userList');
            }
        });
    };
});

app.controller('groupListController', function($rootScope,$scope,$http){
    var url = $rootScope.baseUrl+'getGroupList.php';
    $http.get(url).success(function(result){
        if(result.success == true) {
            $scope.list = result.data;
        }
    });
    $scope.delete = function(index,id){
        if (!confirm('确定删除吗？')) return false;
        var url = $rootScope.baseUrl+'deleteGroup.php?id='+id;
        $http.get(url).success(function(result){
            if(result.success == true) {
                $scope.list.splice(index,1);
            }
        });
    };
});

//增加管理组控制器
app.controller('groupAddController', function($rootScope,$scope, $http,$state){
    $scope.error    ='';
    $scope.data = {
        adminGroup:''
    };

    $scope.addGroup = function(){
        var url = $rootScope.baseUrl+'addGroup.php';
        $http.post(url,$scope.data).success(function(result){
            if(result.success == true) {
                $state.go('app.groupList');
            }
        });
    };
});

//管理组权限编辑
app.controller('accessEditController', function($rootScope,$scope,$http,$stateParams,$state){
    $scope.access = {
        userList:false,
        userAdd :false,
        groupList:false
    };
    var id =$stateParams.id;

    //获取管理员的权限并使其在页面被选中
    var url2 = $rootScope.baseUrl+'groupAccess.php?id='+id;
    $http.get(url2).success(function(result){
        if(result.success == true) {
                var res = result.data;
            for (var i=0;i<res.length;i++){
                var checked = res[i].access;
                if ($scope.access.hasOwnProperty(checked)){
                    $scope.access[checked] = true;
                }
            }
        }
    });


    $scope.subAccess = function(){
        var url = $rootScope.baseUrl+'accessEdit.php?id='+id;
        $http.post(url,$scope.access).success(function(result){
            if(result.success == true) {
                $state.go('app.groupList');
            }
        });
    }
});


