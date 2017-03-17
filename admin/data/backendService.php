<?php 

    require_once 'dbConnect.php';
    //$GLOBALS['urlPath'] 	= "http://localhost:3030/Harsh/Admin/data/temp/";
    $GLOBALS['urlPath'] 	= "http://pinakininfo.co.in/bargainadmin/data/temp/";


    switch($_GET['action']) 
    {
		case 'get_userdetails':{
			$sql  = "select R.*,P.professionname, U.usercategoryname from registeruser R ";
			$sql .= " join professionmaster_tbl P on R.professionid = P.professionid ";
			$sql .= " join usercategory U on  R.usercatid = U.usercatid  ";
			$sql .= " where R.usertype !='a' order by R.usertype,R.usercatid asc";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
        	break;
		}
			
		case 'delete_user':{
			$whereCondition= "userid =". $_GET['userid'];
            $response = executeDeleteStatement("registeruser",$whereCondition);
			echo json_encode($response);
			break;
		}
			
		case 'updt_UserDetails':{
			updateUserDetails();
			break;
		}
			
		case 'get_UsrCatDetails':{
			$sql = "select * from usercategory order by defaultcategory";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
        	break;
		}
		case 'add_UsrCat':{
			addUserCategory();
			break;
		}
			
		case 'updt_UsrCat':{
			updateUserCategory();
			break;
		}
			
		case 'get_professiondetails':{
			$sql = "select * from professionmaster_tbl order by professionname";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
        	break;
		}
		
		case 'add_profession':{
			addProfession();
			break;
		} 
		
		case 'update_profession' :{
			updateProfession();
			break;
		}
			
		case 'delete_profesion':{
			$whereCondition= "professionid =". $_GET['professionid'];
            $response = executeDeleteStatement("professionmaster_tbl",$whereCondition);
			echo json_encode($response);
			break;
		}			
			
        case 'add_Product':{
            addProduct();
        	break;
		}
			
		
        case 'get_product':{
			getProducts();
        	break;
		}
			
		case 'updt_PrdWithFlName':{
			updateProductFileName();
			break;
		}
		case 'updt_PrdOnly':{
			updateProductOnly();
			break;
		}
		case 'updt_ActiveFlag':{
			updateActiveFlag();
			break;
			
		}    
        
        case 'get_subproduct':{
			getSubProducts();
			
			/*$sql  = "select S.*,P.productname from subproduct_tbl S ";
			$sql .= "join product_tbl P on S.productid = P.productid  order by S.subproductname";
			$response = executeSQLStatement($sql);
			$sql = "select * from product_tbl order by isactive desc";
			$productList = executeSQLStatement($sql);
			$response['productlist'] = $productList['tablesDetails'];  
			echo json_encode($response);*/
			break;
		}
			
		case 'add_SubProduct':{
			addSubProduct();
			break;
		}
			
		case 'updt_SubPrdOnly':{
			updateSubProductOnly();
			break;
		}
		case 'updt_SubPrdWithFlName':{
			updateSubProductFileName();
			break;
		}
		
		case 'addCredit':{
			addCredit();
			break;
		}
		case 'validateUser':{
			login();
			break;
		}
		case 'get_UsrPostDetails':{
			
			$sql  = "select PE.*,P.productname,S.subproductname from postexplore_tbl PE join product_tbl P";
			$sql .= " on PE.productid = P.productid join subproduct_tbl S on ";
			$sql .= "PE.subproductid = S.subproductid and PE.postdeleted=0 ";
			$sql .= "and PE.postauthenticated=0 order by PE.creationdate asc";
			$response = getUserPostedDetails($sql);

			
			$sql = "select * from usercategory order by defaultcategory desc";
			$userCatlist = executeSQLStatement($sql);
			$response['userCatlist'] = $userCatlist['tablesDetails'];
			
			$sql  = "select R.*,P.*, U.usercategoryname from registeruser R ";
			$sql .= " join professionmaster_tbl P on R.professionid = P.professionid ";
			$sql .= " join usercategory U on  R.usercatid = U.usercatid  ";
			$sql .= " where  R.usertype !='a' order by R.usertype asc";
			$userList = executeSQLStatement($sql);
			$response['userList'] = $userList['tablesDetails'];
			
			$sql  = "Select * from professionmaster_tbl order by professionname";
			$professionList = executeSQLStatement($sql);
			$response['professionList'] = $professionList['tablesDetails'];
			

			echo json_encode($response);
			break;
		}
			
		case 'approvePost':{
			approvePost();
			break;
		}
		case 'deletePost':{
			$sql = "update postexplore_tbl set postdeleted = 1 where postexploreid =" . $_GET['postexploreid'];
			$response = executeSQLStatement($sql);
			echo json_encode($response);
			break;
		} 
			
		case 'get_approvedPostDetails':{
			$sql  = "select PE.*,P.productname,S.subproductname from postexplore_tbl PE join product_tbl P";
			$sql .= " on PE.productid = P.productid join subproduct_tbl S on ";
			$sql .= " PE.subproductid = S.subproductid and PE.postauthenticated=1 and PE.postdeleted = 0";
			$sql .= " order by PE.creationdate asc";
			//$response = executeSQLStatement($sql);
			$response = getUserPostedDetails($sql);
			echo json_encode($response);
			break;
		}	
			
		case 'get_deletedPostDetails':{
			$sql  = "select PE.*,P.productname,S.subproductname from postexplore_tbl PE join product_tbl P";
			$sql .= " on PE.productid = P.productid join subproduct_tbl S on ";
			$sql .= " PE.subproductid = S.subproductid and PE.postdeleted = 1";
			$sql .= " order by PE.creationdate asc";
			//$response = executeSQLStatement($sql);
			$response = getUserPostedDetails($sql);
			echo json_encode($response);
			break;
		}
			
			
		case 'get_MarketingPostDetails':{
			$sql = "select * from marketingpost_tbl order by creationdate desc";
			$response = executeSQLStatement($sql);
			
			$sql = "select * from usercategory order by defaultcategory desc";
			$userCatlist = executeSQLStatement($sql);
			$response['userCatlist'] = $userCatlist['tablesDetails'];
			
			$sql  = "select R.*,P.*, U.usercategoryname from registeruser R ";
			$sql .= " join professionmaster_tbl P on R.professionid = P.professionid ";
			$sql .= " join usercategory U on  R.usercatid = U.usercatid  ";
			$sql .= " order by R.usertype asc";
			$userList = executeSQLStatement($sql);
			$response['userList'] = $userList['tablesDetails'];
			
			$sql  = "Select * from professionmaster_tbl order by professionname";
			$professionList = executeSQLStatement($sql);
			$response['professionList'] = $professionList['tablesDetails'];
			echo json_encode($response);
			break;
		}
			
		case 'get_StateWiseDetails':{
			$sql = "select * from statemaster_tbl order by statename asc";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
			break;
		}
		case 'add_state':{
			addState();
			break;
		}
			
		case 'update_state':{
			updateState();
			break;
		}

		case 'delete_state':{
			$whereCondition= "stateid =". $_GET['stateid'];
            $response = executeDeleteStatement("statemaster_tbl",$whereCondition);
			echo json_encode($response);
			break;
		}
			
		case 'get_StatenCityWiseDetails':{
			$sql  = "select * from city_tbl C join statemaster_tbl S on S.stateid = C.stateid ";
			$sql .= "order by S.statename,C.cityname";
			$response = executeSQLStatement($sql);
			$sql = "select * from statemaster_tbl order by statename asc";
			$statelist = executeSQLStatement($sql);
			$response['statelist'] = $statelist['tablesDetails'];
			echo json_encode($response);
			break;
		}
		
		case 'add_city':{
			addCity();
			break;
		}
			
		case 'update_city':{
			updateCity();
			break;
		}

		case 'delete_city':{
			$whereCondition= "cityid =". $_GET['cityid'];
            $response = executeDeleteStatement("city_tbl",$whereCondition);
			echo json_encode($response);
			break;
		}
        
        case 'sendNotificationToAll':{
            sendNoticationToEveryOne(); 
            break;
        }
        case 'sendNotificationToUserCat':{
            sendNotificationToUserCategory();
            break;
        }
			
    }

	function sendNoticationToEveryOne(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
		$response['heading'] = $insertDetails->heading; 
		$response['content'] = $insertDetails->content; 
		
        $content = array("en" => $insertDetails->content);
        $heading = array("en" => $insertDetails->heading);
        
		$fields = array(
			'app_id' => "e007a0d7-5b0c-4be1-9b11-653c4dde4342",
			'included_segments' => array('All'),
            'headings' => $heading,  
			'contents' => $content
		);
		
		$fields = json_encode($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic N2RhN2JhZWQtZDBjNy00NmI2LWFkZGUtMDhiZjE5Y2U3Mzk5'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		echo json_encode($response);
	}

    function sendNotificationToUserCategory(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
		$response['heading'] = $insertDetails->heading; 
		$response['content'] = $insertDetails->content; 
		
        $content = array("en" => $insertDetails->content);
        $heading = array("en" => $insertDetails->heading);

	 	$sql  = "select * from registeruser where usercatid = ";
		$sql .=  $insertDetails->usercatid . " and isactive=1 ";
        $sql .=  "and notipushToken != '' ";
        $db = dbConn::fetch_instance();
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        $player_ids = array();
        if( $tableRecords != NULL)
        {
            foreach ($tableRecords as $row) {
				$playerid = $row["notiUserid"];
                array_push($player_ids,$playerid);        
            }
        }

        /*
		$fields = array(
			'app_id' => "e007a0d7-5b0c-4be1-9b11-653c4dde4342",
			'include_player_ids' => $player_ids,
			'data' => array("foo" => "bar"),
			'contents' => $content
		);
		*/
		$fields = array(
			'app_id' => "e007a0d7-5b0c-4be1-9b11-653c4dde4342",
			'include_player_ids' => $player_ids,
            'headings' => $heading,  
			'contents' => $content
		);
		$fields = json_encode($fields);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
												   'Authorization: Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj'));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

		$response = curl_exec($ch);
		curl_close($ch);
		echo json_encode($response);
	}    
	

/*
	function addState(){
        $JSON_FILE = dirname(__FILE__).DIRECTORY_SEPARATOR.'cities.json' ;

		$fo=fopen($JSON_FILE,"r");
		$fr=fread($fo,filesize($JSON_FILE));
		$data = json_decode($fr);
        $response = array();
        $db = dbConn::fetch_instance();
		
		foreach ( $data as $inv ) {
			$id 			= $inv->id;
			$cityname 		= $inv->cityname;
			$statename		= $inv->statename;
			$sql = "INSERT INTO temptable 
					 (id, cityname, statename) 
					VALUES
					 ('$id','$cityname','$statename')";
			$insertRec  = $db->query($sql);
		}
	}*/

	function addState(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		$sql  = "INSERT INTO statemaster_tbl(statename)";
		$sql .= "VALUES(";
        $sql .= "'" . $insertDetails->statename . "')";
        $insertRec  = $db->query($sql);
        if ( $insertRec != NULL ) {
            $response['stateid'] = $db->lastInsertId('stateid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "State Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add State";
        }
        echo json_encode($response);
	}

	function updateState(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		$sql  = "UPDATE statemaster_tbl SET ";
		$sql .= " statename       	= '". $insertDetails->statename . "'"  ;
		$sql .= " where stateid   =" . $insertDetails->stateid ;
		
        $userRec  = $db->exec($sql); 
		$response['sql']     = $sql;
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
			$response['message']    = 'State updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update  - State Flag failed';
            
        }
        echo json_encode($response);
	}
		


	function addCity(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		$sql  = "INSERT INTO city_tbl(stateid,cityname)";
		$sql .= "VALUES(" . $insertDetails->stateid ."," ;
        $sql .= "'" . $insertDetails->cityname . "')";
        $insertRec  = $db->query($sql);
        if ( $insertRec != NULL ) {
            $response['cityid'] = $db->lastInsertId('cityid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "State Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add State";
        }
        echo json_encode($response);
	}

	function getSubProducts(){
		$filePath	= $GLOBALS['urlPath'];
		$sql  = "select S.*,P.productname from subproduct_tbl S ";
		$sql .= "join product_tbl P on S.productid = P.productid  order by S.subproductname";
        $response = array();
        $db = dbConn::fetch_instance();
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            $tableData = array();
            foreach ($tableRecords as $tableDetails) {
				$tableObj["productid"] 			= $tableDetails['productid'];
                $tableObj["subproductid"] 		= $tableDetails['subproductid'];
                $tableObj["subproductname"] 	= $tableDetails['subproductname'];
                $tableObj["subproductdescr"] 	= $tableDetails['subproductdescr'];
                $tableObj["productname"] 		= $tableDetails['productname'];
				$tableObj["isactive"] 			= $tableDetails["isactive"];
				$imgFilePath = "";
				$imgFilePath  = $filePath . $tableDetails['productid']; 
				$imgFilePath .= DIRECTORY_SEPARATOR . $tableDetails['subproductid'];
				$imgFilePath .= DIRECTORY_SEPARATOR . $tableDetails['subproductimg'] ;
                $tableObj["subproductimg"] 		= $imgFilePath;
				array_push($tableData, $tableObj);
            } 
            $response['tablesDetails'] = $tableData;
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'Sub Product Details';
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
            $response['message'] = 'No SUB PRODUCTS in Database';
        }
		$sql = "select * from product_tbl order by isactive desc";
		$productList = executeSQLStatement($sql);
		$response['productlist'] = $productList['tablesDetails'];  
        echo json_encode($response);
	}
	


	function getProducts(){
		$categories = array();
		$filePath	= $GLOBALS['urlPath'];
        $db = dbConn::fetch_instance();
		$sql = "select * from product_tbl order by productname,creationdate asc";
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            foreach ($tableRecords as $row) {
				$category["productid"] 		= $row["productid"];
				$category["productname"] 	= $row["productname"];
				$category["productdescr"] 	= $row["productdescr"];
				$category["isactive"] 		= $row["isactive"];
				$category["creationdate"] 	= $row["creationdate"];
				$imgFilePath = "";
				$imgFilePath = $filePath . $row['productid'] . DIRECTORY_SEPARATOR . $row['productImg']; 
				$category["productImg"] = $imgFilePath; 
				array_push($categories, $category);
            }            
            $response['tablesDetails']    = $categories;
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'Product Details';
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
            $response['message'] = 'No Data in Database';
        }
        echo json_encode($response);
		
	}

	function approvePost(){
        $obj = file_get_contents('php://input',true);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE postexplore_tbl SET ";
        $sql .= " postauthenticated      	= 1";
        $sql .= " where postexploreid   	= " . $_GET['postexploreid'];
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'User Post has been approved successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Failed to Approve User Post';
        }
        echo json_encode($response);
	}

	function updateUserCategory(){
        $obj = file_get_contents('php://input',true);
        $updateDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
		if ( intval($updateDetails->defaultcategory)  == 1 ) {
			$sql  =  "update usercategory set defaultcategory =0 ";
			$db->exec($sql);
			$sql  =   "";
		}
		
        $sql  = "UPDATE usercategory SET ";
        $sql .= " usercategoryname     	='". $updateDetails->usercategoryname  . "',";
        $sql .= " defaultcategory      	= ". $updateDetails->defaultcategory   . ",";
        $sql .= " creditpoints      	= ". $updateDetails->creditpoints   . ",";
        $sql .= " noofnotification      = ". $updateDetails->noofnotification   . ",";
        $sql .= " unlimited      		= ". $updateDetails->unlimited ;
        $sql .= " where usercatid   	=" . $updateDetails->usercatid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'Category have been updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update Category failed';
        }
        echo json_encode($response);
		
	}

	function addUserCategory(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		if ( intval($insertDetails->defaultcategory)  == 1 ) {
			$sql  =  "update usercategory set defaultcategory =0 ";
			$db->exec($sql);
			$sql  =   "";
		}
		
		$sql  = "INSERT INTO usercategory(usercategoryname,defaultcategory,creditpoints,noofnotification,";
		$sql .= "unlimited)VALUES(";
        $sql .= "'" . $insertDetails->usercategoryname . "',";
        $sql .= $insertDetails->defaultcategory . ",";
        $sql .= $insertDetails->creditpoints . ",";
        $sql .= $insertDetails->noofnotification . ",";
        $sql .= $insertDetails->unlimited . ")";
        $insertRec  = $db->query($sql);
        if ( $insertRec != NULL ) {
            $response['usercatid'] = $db->lastInsertId('usercatid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "Category Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add Category";
        }
		$response["SQL"] = $sql;
        echo json_encode($response);
	}


	function updateProfession(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE professionmaster_tbl SET ";
        $sql .= " professionname       	='". $insertDetails->professionname  . "'";
        $sql .= " where professionid   	=" . $insertDetails->professionid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'Profession have been updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update Profession failed';
        }
        echo json_encode($response);
	}
		
	

	function updateUserDetails(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE registeruser SET ";
        $sql .= " creditpoints       	=". $insertDetails->creditpoints;
        $sql .= " where userid   		=". $insertDetails->userid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'User Credit Points have been updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update Credit Points failed';
            
        }
        echo json_encode($response);
	}

	function updateSubProductFileName(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE subproduct_tbl SET ";
        $sql .= " subproductname       	='". $insertDetails->subproductname  . "',";
        $sql .= " subproductimg	       	='". $insertDetails->filename	  . "',";
        $sql .= " subproductdescr       	='". $insertDetails->subproductdescr  . "'";
        $sql .= " where subproductid   	=" . $insertDetails->subproductid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'PRODUCT updated successfully';

			$productid = $insertDetails->productid ;
			$subproductid = $insertDetails->subproductid ;
			
			$SUB_PROD_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$SUB_PROD_DIR .= $productid . DIRECTORY_SEPARATOR . $subproductid . DIRECTORY_SEPARATOR;
			if (!file_exists($SUB_PROD_DIR))
				mkdir($SUB_PROD_DIR);

			$SUB_PROD_DIR .= $insertDetails->filename;

			$TEMP_FILE_PATH = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$TEMP_FILE_PATH .= $insertDetails->filename;

			copy($TEMP_FILE_PATH,$SUB_PROD_DIR);
			unlink($TEMP_FILE_PATH);
			
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update PRODUCT Details failed';
            
        }
        echo json_encode($response);
	}


	function updateSubProductOnly(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE subproduct_tbl SET ";
        $sql .= " subproductname       	='". $insertDetails->subproductname  . "',";
        $sql .= " subproductdescr       ='". $insertDetails->subproductdescr  . "'";
        $sql .= " where subproductid   	=" . $insertDetails->subproductid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'SUB PRODUCT updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update SUB PRODUCT Details failed';
        }
        echo json_encode($response);
	}


	function addProfession(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		$sql  = "INSERT INTO professionmaster_tbl(professionname)";
		$sql .= "VALUES(";
        $sql .= "'" . $insertDetails->professionname . "')";
        $insertRec  = $db->query($sql);
        if ( $insertRec != NULL ) {
            $response['professionid'] = $db->lastInsertId('professionid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "Profession Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add Profession";
        }
        echo json_encode($response);
	}


	function addSubProduct(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
        $sql = "select max(subproductid) as subproductid from subproduct_tbl";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$subproductid = $tableDetails['subproductid'];
		$subproductid = intval($subproductid) + 1;
		
		$productid = $insertDetails->productid;

		$PROD_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
		$PROD_DIR .= $productid .DIRECTORY_SEPARATOR;
        if (!file_exists($PROD_DIR))
            mkdir($PROD_DIR);
		$SUB_PROD_DIR = $PROD_DIR . $subproductid .DIRECTORY_SEPARATOR;
        if (!file_exists($SUB_PROD_DIR))
            mkdir($SUB_PROD_DIR);
		
		$SUB_PROD_DIR .= $insertDetails->filename;
                
		$TEMP_FILE_PATH = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
        $TEMP_FILE_PATH .= $insertDetails->filename;
		$response['$TEMP_FILE_PATH'] = $TEMP_FILE_PATH;
		$response['$SUB_PROD_DIR'] = $SUB_PROD_DIR;
		
		copy($TEMP_FILE_PATH,$SUB_PROD_DIR);
        unlink($TEMP_FILE_PATH);
		
		$sql  = "INSERT INTO subproduct_tbl(subproductname,subproductdescr,subproductimg,productid,";
		$sql .= "isactive,creationdate)";
		$sql .= "VALUES(";
        $sql .= "'" . $insertDetails->subproductname . "',";
        $sql .= "'" . $insertDetails->subproductdescr . "',";
        $sql .= "'" . $insertDetails->filename . "',";
		$sql .= $productid .",0,now())";
		
        $insertRec  = $db->query($sql);
		
        if ( $insertRec != NULL ) {
            $response['subproductid'] = $db->lastInsertId('subproductid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "Sub Product Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add Sub Product";
        }
        echo json_encode($response);
	}

	function updateActiveFlag(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		if ( $insertDetails->tablename == "product") {
			$sql  = "UPDATE product_tbl SET ";
			$sql .= " isactive       	= ". $insertDetails->isactive  ;
			$sql .= " where productid   =" . $insertDetails->productid ;
		}else if ( $insertDetails->tablename == "subproduct"){
			$sql  = "UPDATE subproduct_tbl SET ";
			$sql .= " isactive       		= ". $insertDetails->isactive  ;
			$sql .= " where subproductid   	=" . $insertDetails->subproductid ;
		}else {
			$sql  = "UPDATE registeruser SET ";
			$sql .= " isactive       		= ". $insertDetails->isactive  ;
			$sql .= " where userid   		=" . $insertDetails->userid ;
			
			if($insertDetails->isactive == 0){
				$response['active'] = $insertDetails->isactive ;
				$response['email'] 	= $insertDetails->emailid ;
				$email_from 	 	= "bargain@noreply.com";
				$email_to		 	 = $insertDetails->emailid . "," . "harshcjain@gmail.com" .",";
				$email_to		  	.= "pbellara@gmail.com";
				$email_subject 	 	= "Bargain : System generated Email";
				$email_message	 	= "This is system generated email.\r\n You have been Blocked by ";
				$email_message		.= "Adminstrator.";
				$headers  			= "From: bargain@noreply.com" ;
				//$headers .= "MIME-Version: 1.0\r\n";
				//$headers .= "Content-type: text/html\r\n";

				$retval = mail($email_to, $email_subject, $email_message, $headers);
				if( $retval == true ){
					$message  = 'Bargain : Blocked User Email Send' ;
					$response['message1']    = $message;
				}else{
					$response['status']     = "error";
					$response['title']      = "Error";
					$message  = 'Bargain : Blocked User Email Send - failed' ;
					$response['message1']    = $message;
				}
			}
		}
		
        $userRec  = $db->exec($sql); 
		$response['sql']     = $sql;
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
			$response['message']    = 'Active Flag updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update  - Active Flag failed';
            
        }
        echo json_encode($response);
	}

	function updateProductOnly(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE product_tbl SET ";
        $sql .= " productname       	='". $insertDetails->productname  . "',";
        $sql .= " productdescr       	='". $insertDetails->productdescr  . "'";
        $sql .= " where productid   	=" . $insertDetails->productid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'PRODUCT updated successfully';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update PRODUCT Details failed';
            
        }
        echo json_encode($response);
	}

	function updateProductFileName(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "UPDATE product_tbl SET ";
        $sql .= " productname       	='". $insertDetails->productname  . "',";
        $sql .= " productImg	       	='". $insertDetails->filename	  . "',";
        $sql .= " productdescr       	='". $insertDetails->productdescr  . "'";
        $sql .= " where productid   	=" . $insertDetails->productid ;
        $userRec  = $db->exec($sql); 
        if ( $userRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'PRODUCT updated successfully';

			$productid = $insertDetails->productid ;
			$PROD_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$PROD_DIR .= $productid .DIRECTORY_SEPARATOR;
			if (!file_exists($PROD_DIR))
				mkdir($PROD_DIR);

			$PROD_DIR .= $insertDetails->filename;

			$TEMP_FILE_PATH = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$TEMP_FILE_PATH .= $insertDetails->filename;

			copy($TEMP_FILE_PATH,$PROD_DIR);
			unlink($TEMP_FILE_PATH);
			$response['productImg'] = $PROD_DIR;
			
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Update PRODUCT Details failed';
            
        }
        echo json_encode($response);
	}


	function addProduct(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
        $sql = "select max(productid) as productid from product_tbl";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$productid = $tableDetails['productid'];
		$productid = intval($productid) + 1;

		$PROD_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
		$PROD_DIR .= $productid .DIRECTORY_SEPARATOR;
        if (!file_exists($PROD_DIR))
            mkdir($PROD_DIR);
		
		$PROD_DIR .= $insertDetails->filename;
                
		$TEMP_FILE_PATH = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
        $TEMP_FILE_PATH .= $insertDetails->filename;
		$response['$TEMP_FILE_PATH'] = $TEMP_FILE_PATH;
		$response['$PROD_DIR'] = $PROD_DIR;
		
		copy($TEMP_FILE_PATH,$PROD_DIR);
        unlink($TEMP_FILE_PATH);
		$sql  = "INSERT INTO product_tbl(productname,productdescr,productImg,isactive,creationdate) VALUES(";
        $sql .= "'" . $insertDetails->productname . "',";
        $sql .= "'" . $insertDetails->productdescr . "',";
        $sql .= "'" . $insertDetails->filename . "',0,now())";
        $insertRec  = $db->query($sql);
		
        if ( $insertRec != NULL ) {
            $response['productid'] = $db->lastInsertId('productid');
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "Product Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add Product";
        }
        echo json_encode($response);
	}


	function login(){
	 	
		$obj = file_get_contents('php://input',true);
        $userDetails = json_decode($obj);
        $userEmail =  $userDetails->user->email;
        $userPass  =  $userDetails->user->password;
		
		
        $response = array();
        $db = dbConn::fetch_instance();
	
	 	$sql  = "select * from registeruser where emailid = '";
		$sql .=  $userEmail . "'";
		$sql .=  " and userpass = '";
		$sql .=  $userPass . "'";
		$response = executeSQLStatement($sql);
				
        echo json_encode($response);
	
	}

    function executeSQLStatement($sql){
        $db = dbConn::fetch_instance();
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            $response['status']     	= "success";
            $response['title']      	= "Success";
            $response['message']    	= 'Records Found in Database';
            $response['tablesDetails']  = $tableRecords;
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
			$response['sql'] 	 = $sql;
            $response['message'] = 'No Records in Database';
        }
        return $response;
    }


    function executeSelectStatement($table, $columns, $order){
        $db = dbConn::fetch_instance();
        $sql = "select ".$columns." from ".$table." ".$order;
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            $response['status']     	= "success";
            $response['title']      	= "Success";
            $response['message']    	= 'Records Found in Database';
            $response['tablesDetails']  = $tableRecords;
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
            $response['message'] = 'No Records in Database';
        }
        return $response;
    }

	function executeDeleteStatement($table, $whereCondition){
        $obj = file_get_contents('php://input',true);
        $vendorDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
        $sql  = "delete from  ".$table." where ".$whereCondition;
        $delRec  = $db->exec($sql);
        $response['sql']     = $sql;
		$response['delRec']  = $delRec;
        if ( $delRec > 0) {
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'Record Deleted';
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'Delete Record failed.';
        }
        return $response;
	}

    function getUserPostedDetails($sql){
		$filePath		= $GLOBALS['urlPath'] . "postexplore";
		$dummyImgPath 	= $GLOBALS['urlPath'] . "dummy.png";
		$response = array();
		$db = dbConn::fetch_instance();
		$tableRecords  = $db->queryFetchAllAssoc($sql);
		if( $tableRecords != NULL)
		{
			$tableData = array();
			foreach ($tableRecords as $tableDetails) {
				$tableObj["postexploreid"] 		= $tableDetails['postexploreid'];
				$tableObj["productname"] 		= $tableDetails['productname'];
				$tableObj["subproductname"] 	= $tableDetails['subproductname'];
				$tableObj["userid"] 			= $tableDetails['userid'];
				$tableObj["productid"] 			= $tableDetails['productid'];
				$tableObj["subproductid"] 		= $tableDetails["subproductid"];
				$tableObj["posttitle"] 			= $tableDetails["posttitle"];
				$tableObj["postdescr"] 			= $tableDetails["postdescr"];
				$tableObj["postauthenticated"] 	= $tableDetails["postauthenticated"];
				$tableObj["postdeleted"] 		= $tableDetails["postdeleted"];
				$tableObj["creationdate"] 		= $tableDetails["creationdate"];
				$imgFilePath = "";
				if($tableDetails['filename'] == NULL){
					$imgFilePath = $dummyImgPath ;
				}else{
					$imgFilePath  = $filePath .  DIRECTORY_SEPARATOR . $tableDetails['postexploreid']; 
					$imgFilePath .= DIRECTORY_SEPARATOR . $tableDetails['filename'];
				}
				$tableObj["usrpostedimg"] 		= $imgFilePath;
				array_push($tableData, $tableObj);
			} 
			$response['tablesDetails'] = $tableData;
			$response['status']     = "success";
			$response['title']      = "Success";
			$response['message']    = 'User Posted Details';
		}else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
			$response['sql'] 	 = $sql;
            $response['message'] = 'No Records in Database';
        }
        return $response;
    }


?>
 