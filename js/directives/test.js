
app.controller('testController',function($scope){
	$scope.loading = function(){
		console.log('数据加载中...');
	}
});

app.controller('testController2',function($scope){
	$scope.loading2 = function(){
		console.log('数据加载中...22222');
	}
});


app.directive('test',function(){
	return {
		restrict: 'E',
		//template:'<button class="btn btn-default">123</button>'
		templateUrl: 'tpl/directive/btn.html'
	}
});

app.directive('dform',function(){
	return {
		restrict: 'E',
		//template:'<button class="btn btn-default">123</button>'
		templateUrl: 'tpl/directive/form.html'
	}
});

app.directive('loader',function(){
	return {
		restrict: 'AE',
		link:function(scope,element,attrs) {
			element.bind('mouseenter',function(){
				
				scope.$apply(attrs.howtoload);//howToload会被转成小写
			})
		}
	}
});