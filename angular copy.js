var myapp = angular.module('myapp', []);

myapp.controller('myctrl', ['$scope', '$http', '$filter', '$timeout', '$window', function ($scope, $http, $filter, $timeout, $window) {

    var defaultHeader = function () {

        /* 	this.LanguageId = getCookie("LanguageId");
            this.Token = getCookie("Token");
            this.DeviceId = getCookie("DeviceId");
            this.CommunityId = getCookie("CommunityId");
            this.BehaviorCode = 0; */

    };

    $scope.isLoading = true;

    var option = {
        method: "",
        url: "",
        headers: new defaultHeader()
    };

    $scope.createCall = function (baseUrl) {
        option.url = baseUrl + "tasks.json";
        option.method = "GET";
        option.headers = new defaultHeader();
        return $http(option);
    };


    $scope.init = function () {

        $scope.isLoading = true;

        $scope.createCall("")
            .then(function (response) {

                $scope.tasks = response.data;
                $scope.isLoading = false;

               

            },
                function (error) {
                    console.log(error);
                    $scope.hasAdmPermission = false;
                });
            
            

        //$scope.isLoading = false;		<= nasconde subito
    };


    $scope.init();

    var localYears = [];
  response.data.forEach(function (tasks) {
	
	if(years.length == 0)
	{
		$scope.currentYear = tasks.anno;
		years.push(tasks.anno);
	} else {
	
		for(var i=0;i<years.length;i++)
		{
			var found = false;
			
			var monthYear = tasks.anno + '/' + tasks.mese;			//		2021/8
			
			if(years[i]==monthYear)
			{
				found = true;
			}
			
			if(!found)
			{
				years.push(monthYear);
			}
		}
		return false;
		
	}
	years.push(tasks.anno);
  }
  $scope.years = localYears;
/*
	$scope.filtra = function (selAnno) {
	
		var my = selAnno.split("/");				
		//   vr arrString = "12,15,20";
		//	var arrreal = arrString.split(",");			// [12,15,20]
		
		
		$scope.currentYear = my[0];
		$scope.currentMonth = my[1];
		
		
		...
	};
*/
}]);



