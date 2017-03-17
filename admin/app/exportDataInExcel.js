/*app.controller('ApplicationController', function ($scope, $rootScope, $routeParams, $location, $http, 
                                              $modal, $filter,Data) {


	$scope.exportUserData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportUserDataInExcel.html',
          controller: 'exportUserDataInExcelCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			;
        });
	}	
});*/


app.controller('exportUserDataInExcelCtrl', function ($scope, $modalInstance, item, Data) {
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
	$scope.tableDetailtxt = "";
	$scope.exportDataList = new Array();
	if (item  == "USER"){
		$scope.exportDataList = Data.getMasterTableData("USER");
		$scope.tableDetailtxt = "User Details";
	}
	
    $scope.buttonText = 'Export To Excel';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.exportToExcel = function () {
		var d = new Date();
		var dd = d.getDate();
		var mm = d.getMonth();
		var yy = d.getFullYear();
 		var filename= "AllUsers" + dd.toString() + "_" + mm.toString() + "_" + yy.toString() + ".xls";
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, filename);
		$modalInstance.close(x);
    };
        
});


app.controller('exportProductDataInExcelCtrl', function ($scope, $modalInstance, item, Data) {
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
	$scope.tableDetailtxt = "";
	$scope.exportDataList = new Array();
	if( item  == "PRODUCT" ){
		$scope.exportProductList = Data.getMasterTableData("PRODUCT");
		$scope.tableDetailtxt = "Product Details";
	}
	
    $scope.buttonText = 'Export To Excel';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.exportToExcel = function () {
		var d = new Date();
		var dd = d.getDate();
		var mm = d.getMonth();
		var yy = d.getFullYear();
 		var filename= "AllProducts_" + dd.toString() + "_" + mm.toString() + "_" + yy.toString() + ".xls";
 		var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, filename);
		
		$modalInstance.close(x);
    };
        
});


app.controller('exportSubProductDataInExcelCtrl', function ($scope, $modalInstance, item, Data) {
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
	$scope.tableDetailtxt = "";
	$scope.exportDataList = new Array();
	$scope.exportDataList = Data.getMasterTableData("SUBPRODUCT");
	$scope.tableDetailtxt = "Sub Product Details";
	
    $scope.buttonText = 'Export To Excel';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.exportToExcel = function () {
		var d = new Date();
		var dd = d.getDate();
		var mm = d.getMonth();
		var yy = d.getFullYear();
 		var filename= "AllSubProducts_" + dd.toString() + "_" + mm.toString() + "_" + yy.toString() + ".xls";
 		var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, filename);
		
		$modalInstance.close(x);
    };
        
});


app.controller('exportPostedDataInExcelCtrl', function ($scope, $modalInstance, item, Data) {
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
	$scope.tableDetailtxt = "";
	$scope.exportDataList = new Array();
	$scope.exportDataList = Data.getMasterTableData("ALLPOSTEDDATA");
	$scope.tableDetailtxt = "Posted Data Details";
	
    $scope.buttonText = 'Export To Excel';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.exportToExcel = function () {
		var d = new Date();
		var dd = d.getDate();
		var mm = d.getMonth();
		var yy = d.getFullYear();
 		var filename= "PostedDataDetails_" +dd.toString() + "_" + mm.toString() + "_" + yy.toString() + ".xls";
 		var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, filename);
		
		$modalInstance.close(x);
    };
        
});
