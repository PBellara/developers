app.factory("Data", ['$http', 'toaster',
    function ($http, toaster) { // This service connects to our REST API

        var serviceBase = 'data/backendService.php?';
		var productMasterTableData 	= {};
		var userCategoryList 		= {};
		var professionList	 		= {};
		var allSellerUserList 		= {};
		var userType 				= {};
		var anyTableData			= {};

        var obj = {};
        obj.toast = function (data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
        }
		
		obj.getProductList = function(){
			return productList;
		}
		
        obj.getMasterTableData = function(tableDataToFetch){
            if(tableDataToFetch == "PRODUCT"){
                return productMasterTableData;
            }else if(tableDataToFetch == "USER"){
                return allSellerUserList;
            }else if(tableDataToFetch == "PROFESSION"){
                return professionList;
            }else if(tableDataToFetch == "USERCATEGORY"){
                return userCategoryList;
            }else if(tableDataToFetch == "USERTYPE"){
                return userType;
            }else if(tableDataToFetch == "SUBPRODUCT"){
				return anyTableData;
			}else if(tableDataToFetch == "ALLPOSTEDDATA"){
				return anyTableData;
			}
        };
		
		
		obj.getSellerUserList = function(usercatID,userPro,usertype){
			if ( userPro == 0  &&  usercatID ==0 &&  usertype =='z' ) {
				return allSellerUserList;
			}
			var tmpArr = new Array();
			var bProChanged = false;
			var bCatChanged = false;
			var bTypeChanged = false;
			if ( userPro != null &&  usercatID !==null ) {
				for (var i = 0 ; i < allSellerUserList.length ;i++ ) {
					if ( userPro == 0  && usertype =='z' ) {
						if ( allSellerUserList[i].usercatid == usercatID  ){
							tmpArr.push(allSellerUserList[i]);	
						}
						
					}else if ( usercatID == 0  && usertype =='z' ){
						if ( allSellerUserList[i].professionid == userPro  ){
							tmpArr.push(allSellerUserList[i]);	
						}
					}else if ( usercatID == 0  && userPro == 0 ){
						if ( allSellerUserList[i].usertype == usertype  ){
							tmpArr.push(allSellerUserList[i]);	
						}
					}else{
						if( userPro == 0 ){
							userPro = allSellerUserList[i].professionid;
							bProChanged = true;
						}
						if( usercatID == 0 ){
							usercatID = allSellerUserList[i].usercatid;
							bCatChanged = true;
						}
						if( usertype == 'z'){
							usertype = allSellerUserList[i].usertype; 
							bTypeChanged = true;
						}
						if ( allSellerUserList[i].professionid == userPro  
							&& allSellerUserList[i].usercatid == usercatID  
						    && allSellerUserList[i].usertype == usertype){
							tmpArr.push(allSellerUserList[i]);	
						}
						if ( bProChanged  ){
							userPro = 0;
						}
						if( bCatChanged ){
							usercatID = 0;
						}
						if(bTypeChanged){
							usertype = 'z';
						}
						
					}
				}
				
			}
			return tmpArr;
		}

        obj.get = function (q) {
            return $http.get(serviceBase + q ).then(function (results) {
                var myString =  "";
				myString = q.substring(q.lastIndexOf("=")+1, q.length);
                switch(myString) 
                {
                    case "get_subproduct":
					{
						productMasterTableData 	= new Array();
                        productMasterTableData 	= results.data.productlist;
						anyTableData			= new Array();
						anyTableData			= results.data.tablesDetails;
                        break;
					}
					case "get_product":{
						productMasterTableData	= new Array();
                        productMasterTableData	= results.data.tablesDetails;
						break;
					}
					case "get_userdetails":{
						allSellerUserList	= new Array();
                        allSellerUserList	= results.data.tablesDetails;
						break;
					}
					case  "get_deletedPostDetails":	
					case  "get_approvedPostDetails":{
						anyTableData			= new Array();
						anyTableData			= results.data.tablesDetails;
						break;
					}
					case "get_UsrPostDetails":
					case "get_MarketingPostDetails":
					{
						anyTableData			= new Array();
						anyTableData			= results.data.tablesDetails;
						userCategoryList 	= new Array();
                        userCategoryList 	= results.data.userCatlist;
						var obj = new Object();
						obj.usercatid = 0 ;
						obj.usercategoryname = "All" ;
						userCategoryList.push(obj);
						userCategoryList.sort();
						allSellerUserList	= new Array();
                        allSellerUserList	= results.data.userList;
						professionList		= new Array();
						professionList		= results.data.professionList;
                        obj = new Object();
						obj.professionid = 0 ;
						obj.professionname = "All" ;
						professionList.push(obj);
						
						userType = new Array();
						obj = new Object();
						obj.usertype = 'z' ;
						obj.username = "All" ;
						userType.push(obj);
						
						obj = new Object();
						obj.usertype = 'b' ;
						obj.username = "Buyer" ;
						userType.push(obj);
						
                        obj = new Object();
						obj.usertype = 's' ;
						obj.username = "Seller" ;
						userType.push(obj);
						
						break;
					}
                    default:{
						break;
					}
                }
                return results.data;
            });
        };
        
        obj.post = function (q, object) {
            return $http.post(serviceBase + q , object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };

        return obj;
}]);