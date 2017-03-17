app.controller('ApplicationController', function ($scope, $rootScope, $routeParams, $location, $http, 
                                              $modal, $filter,Data) {

	
    $scope.login            = {};
    $scope.newProductToAdd  = "";
    $scope.productDatalist  = {};
	$scope.newSubProductToAdd = "";
    $scope.subProductDatalist  = {};
	$scope.userDataList		= {};
	$scope.newUsrCatToAdd	="";
	$scope.usrCatDataList	= {};
	$scope.newProfessionToAdd="";
	$scope.professionDatalist={};
	$scope.usrPostDetails	= {};
	$scope.exportDataType	= "";
	$scope.newMarketingPostToAdd="";
	$scope.marketingPostDetails	= {};
	$scope.commonAddNewItem = "";
	$scope.commonArrayList	= {};
	
	

	$scope.userLogout = function(){
		if( $rootScope.showmenuitem == false ){
			$("#wrapper").toggleClass("toggled");
		}
		$rootScope.showmenuitem 	= false;
		$rootScope.showsubmenuitem  = false;

		$location.path('/');
	};
	
    $scope.doLogin = function (user) {
        Data.post('action=validateUser', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
				$rootScope.showmenuitem = true;
				$rootScope.showsubmenuitem = true;
				
				$location.path('productdetails');
				
            }
        });
    };
//-----------User Details--------------
	$scope.GetUserDetails = function(){
		$scope.exportDataType = "USER";
        Data.get('action=get_userdetails').then(function (results) {
            Data.toast(results);
			$scope.userDataList = new Array();
            if (results.status == "success") {
                $scope.userDataList = results.tablesDetails;
            }
        });
    };
	
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
	
	$scope.setActiveFlag = function(userData){
		if ( userData.isactive == 1 ) {
			userData.isactive = 0 ;
		}else{
			userData.isactive = 1;
		}
		userData.tablename = "registeruser";
		Data.put('action=updt_ActiveFlag', userData).then(function (result) {
			Data.toast(result);
			if(result.status != 'error'){
				/*for( var i = 0 ;i < $scope.productDatalist.length;i++  ){
					if ( $scope.productDatalist[i].productid == objProductData.productid ) {
						$scope.productDatalist[i].isactive = objProductData.isactive;
						break;
					}
				}*/
			}
		});				
	}
	
	$scope.deleteUser = function(objUserData){
        if(confirm("Are you sure to remove the User ( " + objUserData.fname + " )"))
        {
			var delSqlStatement = "action=delete_user&userid=" +objUserData.userid; 
            Data.delete(delSqlStatement).then(function(results){
				Data.toast(results);
                if (results.status == "success") {
                    $scope.userDataList = _.without($scope.userDataList, objUserData);
                    $scope.userDataList = $filter('orderBy')($scope.userDataList, 'usertype','0');
                }
            });
        }
	}
	
    $scope.ediUserData = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/ediUserData.html',
          controller: 'ediUserDataCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			if(selectedObject.save == "update"){
                p.creditpoints    = selectedObject.creditpoints;
            }
        });
    };	
	
//-----------End of User Details--------------
	

//----------User Category ------------------
	
	$scope.GetUserCategoryDetails = function(){
        Data.get('action=get_UsrCatDetails').then(function (results) {
            Data.toast(results);
			$scope.usrCatDataList = new Array();
            if (results.status == "success") {
                $scope.usrCatDataList = results.tablesDetails;
            }
        });
    };
    $scope.sort = {       
                sortingOrder : 'id',
                reverse : false
    };
	
	
    $scope.addEditUserCategory = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addEditUserCategory.html',
          controller: 'addEditUserCategoryCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			if(selectedObject.save == "update"){
                p.usercategoryname  = selectedObject.usercategoryname;
                p.defaultcategory   = selectedObject.defaultcategory;
				p.creditpoints		= selectedObject.creditpoints;
				p.noofnotification	= selectedObject.noofnotification;
				p.unlimited		 	= selectedObject.unlimited;
            }
			if(selectedObject.save == "insert"){
               $scope.usrCatDataList.push(selectedObject);
               $scope.usrCatDataList = $filter('orderBy')($scope.usrCatDataList, 'defaultcategory','0');
            }
			
        });
    };

//----------End of User Category ------------------
	
// -------- PROFESSION --------------
	
	$scope.GetPROFESSIONDetails = function(){
		$scope.exportDataType = "PROFESSION";
        Data.get('action=get_professiondetails').then(function (results) {
            Data.toast(results);
			$scope.professionDatalist = new Array();
            if (results.status == "success") {
                $scope.professionDatalist = results.tablesDetails;
            }
        });
    };
	
	
    $scope.addEditProfession = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addeditProfession.html',
          controller: 'professionAddEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
               $scope.professionDatalist.push(selectedObject);
               $scope.professionDatalist = $filter('orderBy')($scope.professionDatalist, 'professionname','0');
            }else if(selectedObject.save == "update"){
                p.professionname    = selectedObject.professionname;
            }
        });
    };	
	
	$scope.deletePROFESSION = function(objToDelete){
        if(confirm("Are you sure to remove the Profession ( " + objToDelete.professionname + " )"))
        {
			var delSqlStatement = "action=delete_profesion&professionid=" +objToDelete.professionid; 
            Data.delete(delSqlStatement).then(function(results){
				Data.toast(results);
                if (results.status == "success") {
                    $scope.professionDatalist = _.without($scope.professionDatalist, objToDelete);
                    $scope.professionDatalist = $filter('orderBy')($scope.professionDatalist, 'usertype','0');
                }
            });
        }
	}
	
// --------End of PROFESSION --------------

//---- PRODUCT ------------------	
	
    $scope.GetPRODUCTDetails = function(){
		$scope.exportDataType = "PRODUCT";
        Data.get('action=get_product').then(function (results) {
            Data.toast(results);
			$scope.productDatalist = new Array();
            if (results.status == "success") {
                $scope.productDatalist = results.tablesDetails;
            }
        });
    };
	
	$scope.exportProductData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportProductDataInExcel.html',
          controller: 'exportProductDataInExcelCtrl',
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
	
	
	$scope.activeInActivePRODUCT = function(objProductData){
		if ( objProductData.isactive == 1 ) {
			objProductData.isactive = 0 ;
		}else{
			objProductData.isactive = 1;
		}
		objProductData.tablename = "product";
		Data.put('action=updt_ActiveFlag', objProductData).then(function (result) {
			Data.toast(result);
			/*if(result.status != 'error'){
				for( var i = 0 ;i < $scope.productDatalist.length;i++  ){
					if ( $scope.productDatalist[i].productid == objProductData.productid ) {
						$scope.productDatalist[i].isactive = objProductData.isactive;
						break;
					}
				}
			}*/
		});				
		
	}
    
    $scope.addEditProduct = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addeditProduct.html',
          controller: 'productAddEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.productDatalist.push(selectedObject);
                $scope.productDatalist = $filter('orderBy')($scope.productDatalist,											'creationdate','0');
            }else if(selectedObject.save == "update"){
                p.productname   = selectedObject.productname;
                p.productdescr  = selectedObject.productdescr;
				p.productImg	= selectedObject.productImg;
            }
        });
    };

//-------------End of Product -----------------

//-------------Sub Product -----------------
	
    $scope.GetSUBPRODUCTDetails = function(){
		$scope.exportDataType = "SUBPRODUCT";
        Data.get('action=get_subproduct').then(function (results) {
            Data.toast(results);
			$scope.subProductDatalist = new Array();
            if (results.status == "success") {
                $scope.subProductDatalist = results.tablesDetails;
            }
        });
    };
	
	$scope.exportSubProductData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportSubProductDataInExcel.html',
          controller: 'exportSubProductDataInExcelCtrl',
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
	

    $scope.addEditSubProduct = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addeditSubProduct.html',
          controller: 'subProductAddEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.subProductDatalist.push(selectedObject);
                //$scope.subProductDatalist = $filter('orderBy')($scope.subProductDatalist, 'isactive','0');
            }else if(selectedObject.save == "update"){
                p.subproductname    = selectedObject.subproductname;
                p.subproductdescr   = selectedObject.subproductdescr;
            }
        });
    };
	
	$scope.activeInActiveSUBPRODUCT = function(objProductData){
		if ( objProductData.isactive == 1 ) {
			objProductData.isactive = 0 ;
		}else{
			objProductData.isactive = 1;
		}
		objProductData.tablename = "subproduct";
		
		Data.put('action=updt_ActiveFlag', objProductData).then(function (result) {
			Data.toast(result);
			/*
			if(result.status != 'error'){
				for( var i = 0 ;i < $scope.subProductDatalist.length;i++  ){
					if ( $scope.subProductDatalist[i].subproductid == objProductData.subproductid ) {
						$scope.subProductDatalist[i].isactive = objProductData.isactive;
						break;
					}
				}
			}*/
		});				
		
	}
	
//-------------End of Sub Product -----------------
	
	
//---------------Authenticate POST Details --------------------
	
	$scope.GetPOSTDetails = function(){
        Data.get('action=get_UsrPostDetails').then(function (results) {
            Data.toast(results);
			$scope.usrPostDetails = new Array();
            if (results.status == "success") {
                $scope.usrPostDetails = results.tablesDetails;
            }
        });
    };
	
	$scope.exportPostedData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportPostedDataInExcel.html',
          controller: 'exportPostedDataInExcelCtrl',
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
	
	
	$scope.approvePost = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/sendNotification.html',
          controller: 'sendNotificationCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			$scope.usrPostDetails = _.without($scope.usrPostDetails, selectedObject);
			$scope.usrPostDetails = $filter('orderBy')($scope.usrPostDetails, 'creationdate','0');
        });
		
		/*var sqlStatement = "action=approvePost&postexploreid=" +objToApprove.postexploreid; 
		Data.put(sqlStatement).then(function(results){
			Data.toast(results);
			if (results.status == "success") {
				$scope.usrPostDetails = _.without($scope.usrPostDetails, objToApprove);
				$scope.usrPostDetails = $filter('orderBy')($scope.usrPostDetails, 'creationdate','0');
			}
		});
		*/
	}
	
	$scope.viewPostDetails  = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/viewPostDetail.html',
          controller: 'viewPostDetailsCtrl',
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
    };
	

	$scope.deletePost = function(objUserData){
        if(confirm("Are you sure to remove the User Post ( " + objUserData.posttitle + " )"))
        {
			var delSqlStatement = "action=deletePost&postexploreid=" +objUserData.postexploreid; 
            Data.post(delSqlStatement).then(function(results){
				Data.toast(results);
                if (results.status == "success") {
                    $scope.usrPostDetails = _.without($scope.usrPostDetails, objUserData);
                    $scope.usrPostDetails = $filter('orderBy')($scope.usrPostDetails, 'creationdate','0');
                }
            });
        }
	}
	
//---------------End of Authenticate POST Details --------------------
	
//-------------- All Approved Post Details ----------------
		
	$scope.GetApprovedPOSTDetails = function(){
        Data.get('action=get_approvedPostDetails').then(function (results) {
            Data.toast(results);
			$scope.usrPostDetails = new Array();
            if (results.status == "success") {
                $scope.usrPostDetails = results.tablesDetails;
            }
        });
    };
	
	$scope.exportApprovedPostData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportPostedDataInExcel.html',
          controller: 'exportPostedDataInExcelCtrl',
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
//-------------- End of All Approved Post Details ----------------
	
	
//-------------- All Deleted Post Details ----------------
	$scope.GetDeletedPOSTDetails = function(){
        Data.get('action=get_deletedPostDetails').then(function (results) {
            Data.toast(results);
			$scope.usrPostDetails = new Array();
            if (results.status == "success") {
                $scope.usrPostDetails = results.tablesDetails;
            }
        });
    };
	
	$scope.exportDeletedPostData = function(p,size){
        var modalInstance = $modal.open({
          templateUrl: 'partials/exportPostedDataInExcel.html',
          controller: 'exportPostedDataInExcelCtrl',
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
	
//-------------- End Of All Deleted Post Details ----------------
	
//-------------- Markerting Post Details ----------------
	$scope.GetMarketingPOSTDetails = function(){
		$scope.exportDataType = "MARKETING";
        Data.get('action=get_MarketingPostDetails').then(function (results) {
            Data.toast(results);
			$scope.marketingPostDetails = new Array();
            if (results.status == "success") {
                $scope.marketingPostDetails = results.tablesDetails;
            }
        });
    };
	
	
    $scope.addMarkertingPost = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addMarkingPost.html',
          controller: 'addMarkingPostCtrl',
          size: "lg",
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			if(selectedObject.save == "insert"){
               $scope.marketingPostDetails.push(selectedObject);
            }
			
        });
    };
	
//-------------- End of Markerting Post Details ----------------
	
//-------------- State Wise Details ----------------
	
	
	$scope.GetSTATEDetails = function(){
		$scope.exportDataType = "STATE";
        Data.get('action=get_StateWiseDetails').then(function (results) {
            Data.toast(results);
			$scope.commonArrayList = new Array();
            if (results.status == "success") {
                $scope.commonArrayList = results.tablesDetails;
            }
        });
    };
	
	
    $scope.addEditState = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/addeditState.html',
          controller: 'addEditStateCtrl',
          size: "lg",
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
			if(selectedObject.save == "insert"){
               $scope.commonArrayList.push(selectedObject);
            }else if(selectedObject.save == "update"){
                p.statename    = selectedObject.statename;
            }				
        });
    };
	
	
//-------------- End of State Wise  Details ----------------

//-------------- State n City Wise Details ----------------

	$scope.GetSTATEnCITYDetails = function(){
		$scope.exportDataType = "STATENCITY";
        Data.get('action=get_StatenCityWiseDetails').then(function (results) {
            Data.toast(results);
			$scope.commonArrayList = new Array();
            if (results.status == "success") {
                $scope.commonArrayList = results.tablesDetails;
            }
        });
    };

	
//-------------- End of State n City  Wise  Details ----------------
	
// ----------------------- Send Notificaiton to All -----------------------
    $scope.initNotification = function(){
        $scope.objSendNotificationData = {};
    }
    $scope.sendNotificationToAll = function(objDataToSave){
        
        Data.post('action=sendNotificationToAll', objDataToSave).then(function (result) {
            Data.toast(result);
            console.log(result);
            $scope.objSendNotificationData.heading = "";
            $scope.objSendNotificationData.content = "";
            
        });

    }
// ----------------------- End of Send Notificaiton to All -----------------------

    $scope.initUserNotification = function(){
        $scope.objSendNotificationDataToUsers = {};
    }
    
    $scope.sendNotificationToUserCat = function(objDataToSave){
        objDataToSave.usercatid =3;
        Data.post('action=sendNotificationToUserCat', objDataToSave).then(function (result) {
            Data.toast(result);
            console.log(result);
        });
    }
    
    
    
});


app.controller('addEditStateCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.stateid != null){
		$scope.objAddEditData = angular.copy(item);
	}
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = (item.stateid  != null) ? 'Update STATE' : 'Add New STATE';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.saveSTATE = function (objDataToSave) {
		if(objDataToSave.stateid  != null){
			Data.post('action=update_state', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'update';
					$modalInstance.close(x);
				}
			});
        }else{
			Data.post('action=add_state', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'insert';
					x.stateid = result.stateid;
					$modalInstance.close(x);
				}
			});
        }
    };
        
});

app.controller('addMarkingPostCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.professionid != null){
		$scope.objAddEditData = angular.copy(item);
	}
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = 'Add New POST';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }

    $scope.userCatList 	= new Array();
	$scope.userCatList 	= Data.getMasterTableData("USERCATEGORY");
    $scope.userProList 	= new Array();
	$scope.userProList 	= Data.getMasterTableData("PROFESSION"); 
    $scope.userTypeList = new Array();
	$scope.userTypeList = Data.getMasterTableData("USERTYPE");
	
	$scope.selectedUsrPro = 0 ;
	$scope.selectedUserCat = 0;
	$scope.selectedUsrType = 'z';

	$scope.selectedSellerList = new Array();
	$scope.getSellerList = function(){
		$scope.sellerUserList = new Array();
		$scope.selectedSellerList = new Array();
		$scope.sellerUserList = Data.getSellerUserList($scope.selectedUserCat,$scope.selectedUsrPro,
													   $scope.selectedUsrType);
	}
	
	$scope.setUserCategory = function(selectedCategory){
		$scope.sellerUserList = new Array();
		$scope.selectedUserCat = 	selectedCategory;
	}
	
	$scope.setUserProfession = function(selectedUserProfession){
		$scope.sellerUserList = new Array();
		$scope.selectedUsrPro = 	selectedUserProfession;
	}
	
	$scope.setUserType= function(selectedUserType){
		$scope.sellerUserList = new Array();
		$scope.selectedUsrType = selectedUserType;
	}
	
    $scope.savePROFESSION = function (objDataToSave) {
		if(objDataToSave.professionid  != null){
			Data.post('action=update_profession', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'update';
					$modalInstance.close(x);
				}
			});
        }else{
			Data.post('action=add_profession', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'insert';
					x.professionid = result.professionid;
					$modalInstance.close(x);
				}
			});
        }
    };
        
});


app.controller('sendNotificationCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.postexploreid != null){
		$scope.objAddEditData = angular.copy(item);
	}
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
	
    $scope.userCatList 	= new Array();
	$scope.userCatList 	= Data.getMasterTableData("USERCATEGORY");
    $scope.userProList 	= new Array();
	$scope.userProList 	= Data.getMasterTableData("PROFESSION"); 
    $scope.userTypeList = new Array();
	$scope.userTypeList = Data.getMasterTableData("USERTYPE");
	
	$scope.selectedUsrPro = 0 ;
	$scope.selectedUserCat = 0;
	$scope.selectedUsrType = 'z';

	$scope.selectedSellerList = new Array();
	$scope.getSellerList = function(){
		$scope.sellerUserList = new Array();
		$scope.selectedSellerList = new Array();
		$scope.sellerUserList = Data.getSellerUserList($scope.selectedUserCat,$scope.selectedUsrPro,
													   $scope.selectedUsrType);
	}
	
	$scope.setUserCategory = function(selectedCategory){
		$scope.sellerUserList = new Array();
		$scope.selectedUserCat = 	selectedCategory;
	}
	
	$scope.setUserProfession = function(selectedUserProfession){
		$scope.sellerUserList = new Array();
		$scope.selectedUsrPro = 	selectedUserProfession;
	}
	
	$scope.setUserType= function(selectedUserType){
		$scope.sellerUserList = new Array();
		$scope.selectedUsrType = selectedUserType;
	}
	
	
    $scope.buttonText = 'Notification To Selected Users';
    $scope.buttonText1 = 'Notification To Users Group';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
	
	$scope.selectedUsers = function(objSelectedUser,checkedValue){
		if ( checkedValue == 1 ) {
			$scope.selectedSellerList.push(objSelectedUser.userid);
		}else{
			$scope.selectedSellerList = _.without($scope.selectedSellerList, objSelectedUser.userid);
		}
	}
    $scope.sendNotificationToUsersCat = function(objData){
        objData.usercatid =3;
        objData.heading = "Hello";
        objData.heading = "Testing";
        Data.post('action=sendNotificationToUserCat', objData).then(function (result) {
            Data.toast(result);
            console.log(result);
        });
        
    }
        
});

app.controller('viewPostDetailsCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.postexploreid != null){
		$scope.objAddEditData = angular.copy(item);
	}
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = 'Approve Post';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
        
});


app.controller('professionAddEditCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.professionid != null){
		$scope.objAddEditData = angular.copy(item);
	}
	
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = (item.professionid  != null) ? 'Update PROFESSION' : 'Add New PROFESSION';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.savePROFESSION = function (objDataToSave) {
		if(objDataToSave.professionid  != null){
			Data.post('action=update_profession', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'update';
					$modalInstance.close(x);
				}
			});
        }else{
			Data.post('action=add_profession', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'insert';
					x.professionid = result.subproductid;
					$modalInstance.close(x);
				}
			});
        }
    };
        
});


app.controller('ediUserDataCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();

	if(item.userid != null){
		$scope.objAddEditData = angular.copy(item);
	}
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText =  'Update User Details';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.updateUserDetails = function (objDataToSave) {
		Data.post('action=updt_UserDetails', objDataToSave).then(function (result) {
			Data.toast(result);
			if(result.status == 'success'){
				var x = angular.copy(objDataToSave);
				x.save = 'update';
				$modalInstance.close(x);
			}
		});
    };
        
});



app.controller('addEditUserCategoryCtrl', function ($scope, $modalInstance, item, Data) {
	$scope.objAddEditData = new Object();
	$scope.objAddEditData.unlimited = 0 ;
	$scope.objAddEditData.defaultcategory = 0 ;
	$scope.canEdit = false;
	$scope.unlimtedChecked =false;
	$scope.defaultChecked  =false;

	if(item.usercatid != null){
		$scope.objAddEditData = angular.copy(item);
		$scope.unlimtedChecked =false;
		if ( $scope.objAddEditData.unlimited == 1 ) {
			$scope.unlimtedChecked =true;
			$scope.canEdit = true;
			$scope.objAddEditData.creditpoints="";
			$scope.objAddEditData.noofnotification="";
		}
		if ( $scope.objAddEditData.defaultcategory == 1 ) {
			$scope.defaultChecked  =true;
		}
	}
	$scope.unlimitedoptionChanged = function(changeValue){
		if ( changeValue == 1 ){
			$scope.canEdit=true;
			$scope.objAddEditData.creditpoints="";
			$scope.objAddEditData.noofnotification="";
		}
		else{
			$scope.canEdit=false;
		}
	}
									  
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText =  'Add / Update Category';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
    $scope.addEditUsrCategory = function (objDataToSave) {
		if ( objDataToSave.unlimited == 1 ) {
			objDataToSave.creditpoints = 0 ;
			objDataToSave.noofnotification = 0;
		}
		if(objDataToSave.usercatid  != null){
			Data.post('action=updt_UsrCat', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.save = 'update';
					$modalInstance.close(x);
				}
			});
			
		}else{
			Data.post('action=add_UsrCat', objDataToSave).then(function (result) {
				Data.toast(result);
				if(result.status == 'success'){
					var x = angular.copy(objDataToSave);
					x.usercatid = result.usercatid;
					x.save = 'insert';
					$modalInstance.close(x);
				}
			});
		}
		
		
    };
        
});


app.controller('subProductAddEditCtrl', function ($scope, $modalInstance, item, Data,Upload) {
	$scope.objAddEditData = new Object();
	$scope.editMode = false;

	if(item.subproductid != null){
		$scope.objAddEditData = angular.copy(item);
		$scope.editMode = true;
		$scope.selectedproduct = new Object();
		$scope.selectedproduct.productid = item.productid;
		$scope.selectedproduct.productname = item.productname;
	}else{
		$scope.productDataList = Data.getMasterTableData("PRODUCT");
	}
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = (item.subproductid  != null) ? 'Update SUB PRODUCT' : 'Add New SUB PRODUCT';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }

	$scope.onFileSelect = function(element) {
		$scope.currentFile = element.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
			$scope.objAddEditData.subproductimg = event.target.result
			$scope.$apply()

		}
		reader.readAsDataURL(element.files[0]);		
	}	
	
    $scope.saveSubPRODUCT = function (selectedproduct,objDataToSave) {
		objDataToSave.productid = selectedproduct.productid;
		var f = document.getElementById('productImg').files[0];
		var bUpdateProductOnly = false;
		if(objDataToSave.subproductid  != null){
			if ( f == null  ){
				 bUpdateProductOnly = true;
			}
			if( bUpdateProductOnly ){
				Data.put('action=updt_SubPrdOnly', objDataToSave).then(function (result) {
					Data.toast(result);
					if(result.status != 'error'){
						var x = angular.copy(objDataToSave);
						x.save = 'update';
						$modalInstance.close(x);
					}
				});				
			}else{
				//var url = 'http://localhost:3030/Harsh/Admin/data/upload.php'; 
				var url = 'http://pinakininfo.co.in/bargainadmin/data/upload.php';

				Upload.upload({
					url: url,
					method: 'POST',
					file: f,
					data: {file: f}
				}).then(function (resp) {

					objDataToSave.filename = resp.data.filename;

					Data.post('action=updt_SubPrdWithFlName', objDataToSave).then(function (result) {
						Data.toast(result);
						if(result.status == 'success'){
							var x = angular.copy(objDataToSave);
							x.save = 'update';
							$modalInstance.close(x);
						}
					});
				}, function (resp) {
					$scope.errorMsg = resp.data.message;
					$scope.showAlert($scope.errorMsg);
					return false;

				});
				
			}
        }else{
			if (f =='undefined' ){
				$scope.showAlert('Please Select Product Sub Image to upload');	
				return false;
			}
			//var url = 'http://localhost:3030/Harsh/Admin/data/upload.php'; 
			var url = 'http://pinakininfo.co.in/bargainadmin/data/upload.php';
			
			Upload.upload({
				url: url,
				method: 'POST',
				file: f,
				data: {file: f}
			}).then(function (resp) {
				
				objDataToSave.filename = resp.data.filename;
				objDataToSave.productname = selectedproduct.productname;
				objDataToSave.isactive = 1;
				
				Data.post('action=add_SubProduct', objDataToSave).then(function (result) {
					Data.toast(result);
					if(result.status == 'success'){
						var x = angular.copy(objDataToSave);
						x.save = 'insert';
						x.subproductid = result.subproductid;
						x.isactive = 0;
						$modalInstance.close(x);
					}
				});
			}, function (resp) {
				$scope.errorMsg = resp.data.message;
				$scope.showAlert($scope.errorMsg);
				return false;
				
			});
        }
    };
        
});

app.controller('productAddEditCtrl', function ($scope, $modalInstance, item, Data,Upload) {
	$scope.objAddEditData = new Object();
	if(item.productid != null){
		$scope.objAddEditData = angular.copy(item);
	}
    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
        return;
    };
    
    $scope.buttonText = (item.productid  != null) ? 'Update PRODUCT' : 'Add New PRODUCT';
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.objAddEditData);
    }
	
	$scope.onFileSelect = function(element) {
		$scope.currentFile = element.files[0];
		var reader = new FileReader();

		reader.onload = function(event) {
			$scope.objAddEditData.productImg = event.target.result
			$scope.$apply()
		}
		reader.readAsDataURL(element.files[0]);		
	}	
	
    $scope.savePRODUCT = function (objDataToSave) {
		var f = document.getElementById('productImg').files[0];
		var bUpdateProductOnly = false;
		if(objDataToSave.productid  != null){
			if ( f == null  ){
				 bUpdateProductOnly = true;
			}
			if( bUpdateProductOnly ){
				Data.put('action=updt_PrdOnly', objDataToSave).then(function (result) {
					Data.toast(result);
					if(result.status != 'error'){
						var x = angular.copy(objDataToSave);
						x.save = 'update';
						$modalInstance.close(x);
					}
				});				
			}else{
				//var url = 'http://localhost:3030/Harsh/Admin/data/upload.php'; 
				var url = 'http://pinakininfo.co.in/bargainadmin/data/upload.php';
				Upload.upload({
					url: url,
					method: 'POST',
					file: f,
					data: {file: f}
				}).then(function (resp) {

					objDataToSave.filename = resp.data.filename;

					Data.post('action=updt_PrdWithFlName', objDataToSave).then(function (result) {
						Data.toast(result);
						if(result.status == 'success'){
							var x = angular.copy(objDataToSave);
							x.save = 'update';
							x.productImg = result.productImg;
							$modalInstance.close(x);
						}
					});
				}, function (resp) {
					$scope.errorMsg = resp.data.message;
					$scope.showAlert($scope.errorMsg);
					return false;

				});
				
			}
        }else{
			if (f =='undefined' ){
				$scope.showAlert('Please Select Product Image to upload');	
				return false;
			}
			//var url = 'http://localhost:3030/Harsh/Admin/data/upload.php'; 
			var url = 'http://pinakininfo.co.in/bargainadmin/data/upload.php';


			Upload.upload({
				url: url,
				method: 'POST',
				file: f,
				data: {file: f}
			}).then(function (resp) {
				
				objDataToSave.filename = resp.data.filename;
				
				Data.post('action=add_Product', objDataToSave).then(function (result) {
					Data.toast(result);
					if(result.status == 'success'){
						var x = angular.copy(objDataToSave);
						x.save = 'insert';
						x.productid = result.productid;
						x.creationdate =  new Date();
						$modalInstance.close(x);
					}
				});
			}, function (resp) {
				$scope.errorMsg = resp.data.message;
				$scope.showAlert($scope.errorMsg);
				return false;
				
			});
        }
    };
        
});
