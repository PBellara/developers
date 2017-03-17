<?php 

    require_once 'dbConnect.php';
   //$GLOBALS['urlPath'] 	= "http://localhost:3030/Harsh/Admin/data/temp/";
   $GLOBALS['urlPath'] 	= "http://pinakininfo.co.in/bargainadmin/data/temp/";

    
   	if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

        // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, DELETE,OPTIONS");         

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
    }

    switch($_GET['action']) 
    {

        case 'registerUser':
		{
            registerUser();
        	break;
		}
		
		case 'addFBUser' :{
			addFBUser();
			break;
		} 
		case 'addGoogleUser' :{
			addGoogleUser();
			break;
		}
			
		case 'updateregisterion':{
            updateregisterion();
        	break;
		}
		case 'login':{
			login();
			break;
		}
			
		case 'get_masterDatalist':{
			
			$sql  		= "select * from professionmaster_tbl order by professionname asc";
			$response 	= executeSQLStatement($sql);
			
			$sql  		= "select * from statemaster_tbl order by stateid asc";
			$state 		= executeSQLStatement($sql);
			$response['statelist'] = $state['tablesDetails']; 
			
			$sql  		= "select * from city_tbl order by stateid asc";
			$city 		=  executeSQLStatement($sql);
			$response['citylist'] = $city['tablesDetails'];
			
			echo json_encode($response);
			break;
		}
			
		case 'get_StateNCity':{
			$sql  = "select * from statemaster_tbl order by stateid asc";
			$response = executeSQLStatement($sql);
			$sql  = "select * from city_tbl order by stateid asc";
			$city =  executeSQLStatement($sql);
			$response['citylist'] = $city['tableDetails']; 
			echo json_encode($response);
			break;
		}
		case 'getLoginUserDetails':{
			$userid = $_GET['userid'];
			$sql  = "select * from registeruser where userid=" .$userid;
			$response = executeSQLStatement($sql);
			echo json_encode($response);
			break;
		}
		case 'changePassword':{
			changePassword();
			break;
		}
		case  'get_professionlist':{
			$sql  = "select * from professionmaster_tbl order by professionname asc";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
			break;
		}
        
        case 'get_productsubproduct':{
			fetchPRODUCTSUBPRODUCTLIST();
        	break;
		}
        
        case 'get_subproduct':{
			$sql  = "select S.*,P.productname from subproduct_tbl S ";
			$sql .= "join product_tbl P on S.productid = P.productid  order by S.isactive desc";
			$response = executeSQLStatement($sql);
			$sql = "select * from product_tbl order by isactive desc";
			$productList = executeSQLStatement($sql);
			$response['productlist'] = $productList['tablesDetails'];  
			echo json_encode($response);
        	break;
		}
		case 'addpostreqd':{
			addPostRequirement();
			break;
		}
		case 'get_allexplore':{
			$sql  = "select PE.*,P.productname,S.subproductname from postexplore_tbl PE join product_tbl P";
			$sql .= " on PE.productid = P.productid join subproduct_tbl S on ";
			$sql .= "PE.subproductid = S.subproductid and PE.postauthenticated=1 order by PE.creationdate asc";
			$response = executeSQLStatement($sql);
			echo json_encode($response);
			break;
			
		}
			
    }


	function addPostRequirement(){
		$obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
	
		$sql  = "INSERT INTO postexplore_tbl(userid,productid,subproductid,filename,posttitle,postdescr,";
		$sql .= "postdtlsdescr,postauthenticated,creationdate) VALUES(";
        $sql .= $insertDetails->userid 			. ",";
        $sql .= $insertDetails->productid 		. ",";
        $sql .= $insertDetails->subproductid 	. ",";
        $sql .= "'" . $insertDetails->filename 	. "',";
        $sql .= "'" . $insertDetails->posttitle . "',";
        $sql .= "'" . $insertDetails->postdescr . "',";
        $sql .= "'" . $insertDetails->postdtlsdescr . "',0,now())";
		$response['$sql']     = $sql;
        $insertRec  = $db->query($sql);
		
        if ( $insertRec != NULL ) {
            $response['postexploreid'] = $db->lastInsertId('postexploreid');
			$postexploreid = $db->lastInsertId('postexploreid');
			
			$PROD_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$PROD_DIR .= "postexplore" . DIRECTORY_SEPARATOR;
			if (!file_exists($PROD_DIR))
				mkdir($PROD_DIR);
			$PROD_DIR .= $postexploreid . DIRECTORY_SEPARATOR;
			if (!file_exists($PROD_DIR))
				mkdir($PROD_DIR);

			$PROD_DIR .= $insertDetails->filename;

			$TEMP_FILE_PATH = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
			$TEMP_FILE_PATH .= $insertDetails->filename;
			$response['$TEMP_FILE_PATH'] = $TEMP_FILE_PATH;
			$response['FilePath'] = $PROD_DIR;

			copy($TEMP_FILE_PATH,$PROD_DIR);
			unlink($TEMP_FILE_PATH);
			
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']  	= "Post Added successfully";
        }else{
            $response['status']  	= "error";
            $response['title']    	= "Error";
            $response['message']  	= "Unable to add Product";
        }
        echo json_encode($response);
		
	}


    function fetchPRODUCTSUBPRODUCTLIST(){
		$categories = array();
		$filePath	= $GLOBALS['urlPath'];
		
        $db = dbConn::fetch_instance();
		$sql = "SELECT productname,productid,productImg,productdescr FROM product_tbl where isactive=1";
		
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            foreach ($tableRecords as $row) {
				$productid = $row["productid"];
				$sql = "select subproductid,subproductname,subproductdescr,productid,subproductimg ";
				$sql .= "from subproduct_tbl where productid =" . $productid . " and isactive=1";
				
				$cr  = $db->queryFetchAllAssoc($sql);
				$category = array(); // temp array
				$category["productid"] = $row["productid"];
				$category["productname"] = $row["productname"];
				$category["productdescr"] = $row["productdescr"];
				$imgFilePath = "";
				$imgFilePath = $filePath . $row['productid'] . DIRECTORY_SEPARATOR . $row['productImg']; 
				$category["productImg"] = $imgFilePath; 
				$category["sub_productlist"] = array(); // subcategories again an array
				foreach ($cr as $srow) 
				{
					$subcat = array(); // temp array
					$subcat["subproductid"] = $srow['subproductid'];
					$subcat["subproductname"] = $srow['subproductname'];
					$subcat["subproductdescr"] = $srow['subproductdescr'];
					$imgFilePath = "";
					$imgFilePath = $filePath . $row['productid'] . DIRECTORY_SEPARATOR . $srow['subproductid'];
					$imgFilePath .= DIRECTORY_SEPARATOR . $srow['subproductimg'] ;
					$subcat["subproductimg"] = $imgFilePath;
					
					array_push($category["sub_productlist"], $subcat);
				}
				array_push($categories, $category);

             }            
            $response['tablesDetails']    = $categories;
            $response['status']     = "success";
            $response['title']      = "Success";
            $response['message']    = 'PRODuct Details';
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
            $response['message'] = 'No Data in Database';
        }
        echo json_encode($response);
	}

	function changePassword(){
		$obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
	
	 	$sql  = "update registeruser set userpass = '" . $insertDetails->npassword ;
		$sql .= "' where userid = " . $insertDetails->userid;
        $userRec  = $db->exec($sql); 
        $response['sql']     = $sql;
        if ( $userRec > 0) {
            $response['status']     = "success";
        }else{
            $response['status']  = "error";
        }
        echo json_encode($response);
	}


	function login(){
		$obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
	
	 	$sql  = "select * from registeruser where (emailid = '";
		$sql .=  $insertDetails->username . "' or mobileno = '";
		$sql .=  $insertDetails->username . "') and userpass = '";
		$sql .=  $insertDetails->password . "'";
		$response = executeSQLStatement($sql);
        echo json_encode($response);
	}

	function updateregisterion(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
        $sql  = "Update  registeruser set ";
		$sql .= "isactive = 1,";
		$sql .= "fname = '" . $insertDetails->frstName . "',";
		$sql .= "lname = '" . $insertDetails->lstName . "',";
		$sql .= "professionid = " . $insertDetails->professionid . ",";
		$sql .= "usertype  = '" . $insertDetails->userrole . "'";
		$sql .= " where userid=" . $insertDetails->userid;
		
		$response['sql']     = $sql;
        $insertRec  = $db->query($sql);
		
        if ( $insertRec != NULL ) {
            $response['status']     = "success";
        }else{
            $response['status']  = "error";
            $response['message']  = "Error - Updating User";
        }
        echo json_encode($response);
	}

	

	function registerUser(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
		$sql = "select mobileno,emailid from registeruser";
		$recFound = 0;

		$tableRecords = $db->queryFetchAllAssoc($sql); 
		foreach ($tableRecords as $name=>$value) {

			if( $value["mobileno"] == $insertDetails->mobile){
				$response['status']  = "error";
				$response['message']  = "Mobile Number already registered. Please enter different number";
				$recFound = 1;
				break;		
			}
			if( $value["emailid"] == $insertDetails->email){
				$response['status']  = "error";
				$response['message']  = "EmailID already registered. Please enter different EmailID";
				$recFound = 1;
				break;		
			}
			
		}
		if ( $recFound == 1) {
			echo json_encode($response);
			return;
		}

		
    		

		/*$sql = "select max(userid) as maxuserid  from registeruser";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$userid = $tableDetails['maxuserid'];
		$response['$userid']  = $userid;
		$sysuserID = "BARGAIN" ;
		$sysuserID .= intval(intval($userid) + 1);
		*/
		$sql = "select *  from usercategory where defaultcategory=1";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$creditpoints = $tableDetails['creditpoints'];
		$usercatid = $tableDetails['usercatid'];
		
        $sql  = "INSERT INTO registeruser(emailid,sysuserid,creditpoints,";
		$sql .= "usercatid,mobileno,userpass) VALUES(";
        $sql .= "'" . $insertDetails->email . "',";
        $sql .= "'" . "BARGAIN" . $insertDetails->sysuserID ;
		$sql .=  "',";
		$sql .= $creditpoints . ",";
		$sql .= $usercatid . ",";
        $sql .= "'" . $insertDetails->mobile . "',";
        $sql .= "'" . $insertDetails->password . "')";
        $insertRec  = $db->query($sql);
		
        if ( $insertRec != NULL ) {
            $response['userid']   		= $db->lastInsertId('userid');
            $response['status']     	= "success";
            $response['sysuserID']  	= "BARGAIN" . $insertDetails->sysuserID;
            $response['creditpoints']  	= $creditpoints;
			$response['usercatid']  	= $usercatid;
            $response['emailid']  		= $insertDetails->email;
			
        }else{
            $response['status']  = "error";
            $response['message']  = "Error - Registering User";
        }
        echo json_encode($response);
	}

	function addFBUser(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
		$sql = "select mobileno,emailid from registeruser";
		$recFound = 0;

		$tableRecords = $db->queryFetchAllAssoc($sql); 
		foreach ($tableRecords as $name=>$value) {

			if( $value["mobileno"] == $insertDetails->mobile){
				$response['status']  = "error";
				$response['message']  = "Mobile Number already registered. Please enter different number";
				$recFound = 1;
				break;		
			}
			if( $value["emailid"] == $insertDetails->email){
				$response['status']  = "error";
				$response['message']  = "EmailID already registered. Please enter different EmailID";
				$recFound = 1;
				break;		
			}
			
		}
		if ( $recFound == 1) {
			echo json_encode($response);
			return;
		}
		
		$sql = "select *  from usercategory where defaultcategory=1";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$creditpoints = $tableDetails['creditpoints'];
		$usercatid = $tableDetails['usercatid'];
		
        $sql  = "INSERT INTO registeruser(emailid,sysuserid,creditpoints,";
		$sql .= "fname,lname,";
		$sql .= "usercatid,mobileno,professionid,usertype,isactive,userpass) VALUES(";
        $sql .= "'" . $insertDetails->email . "',";
        $sql .= "'" . "BARGAIN" . $insertDetails->sysuserID ;
		$sql .=  "',";
		$sql .= $creditpoints . ",";
        $sql .= "'" . $insertDetails->firstname . "',";
        $sql .= "'" . $insertDetails->lastname . "',";
		$sql .= $usercatid . ",";
        $sql .= "'" . $insertDetails->mobile . "',";
		$sql .= $insertDetails->professionid . ",";
		$sql .= "'" . $insertDetails->userrole . "',1,";
        $sql .= "'fbuser')";
        $insertRec  = $db->query($sql);
		
		$response['sql']     	= $sql;
        if ( $insertRec != NULL ) {
            $response['status']     	= "success";
            $response['userid']   		= $db->lastInsertId('userid');
            $response['emailid']  		= $insertDetails->email;
            $response['sysuserID']  	= "BARGAIN" . $insertDetails->sysuserID;
			$response['firstname']		= $insertDetails->firstname;
			$response['lastname']		= $insertDetails->lastname;
			$response['usertype']		= $insertDetails->userrole;
            $response['creditpoints']  	= $creditpoints;
            $response['isactive']  		= 1;
			$response['usercatid']  	= $usercatid;
            $response['professionid']  	= $insertDetails->professionid;
        }else{
            $response['status']  = "error";
            $response['message']  = "Error - Registering User";
        }
        echo json_encode($response);
	}



	function addGoogleUser(){
        $obj = file_get_contents('php://input',true);
        $insertDetails = json_decode($obj);
        $response = array();
        $db = dbConn::fetch_instance();
		
		$sql = "select mobileno,emailid from registeruser";
		$recFound = 0;

		$tableRecords = $db->queryFetchAllAssoc($sql); 
		foreach ($tableRecords as $name=>$value) {

			if( $value["mobileno"] == $insertDetails->mobile){
				$response['status']  = "error";
				$response['message']  = "Mobile Number already registered. Please enter different number";
				$recFound = 1;
				break;		
			}
			if( $value["emailid"] == $insertDetails->email){
				$response['status']  = "error";
				$response['message']  = "EmailID already registered. Please enter different EmailID";
				$recFound = 1;
				break;		
			}
			
		}
		if ( $recFound == 1) {
			echo json_encode($response);
			return;
		}
		
		$sql = "select *  from usercategory where defaultcategory=1";
        $tableDetails = $db->queryFetchRowAssoc($sql); 
		$creditpoints = $tableDetails['creditpoints'];
		$usercatid = $tableDetails['usercatid'];
		
        $sql  = "INSERT INTO registeruser(emailid,sysuserid,creditpoints,";
		$sql .= "fname,lname,";
		$sql .= "usercatid,mobileno,professionid,usertype,isactive,userpass) VALUES(";
        $sql .= "'" . $insertDetails->email . "',";
        $sql .= "'" . "BARGAIN" . $insertDetails->sysuserID ;
		$sql .=  "',";
		$sql .= $creditpoints . ",";
        $sql .= "'" . $insertDetails->firstname . "',";
        $sql .= "'" . $insertDetails->lastname . "',";
		$sql .= $usercatid . ",";
        $sql .= "'" . $insertDetails->mobile . "',";
		$sql .= $insertDetails->professionid . ",";
		$sql .= "'" . $insertDetails->userrole . "',1,";
        $sql .= "'gouser')";
        $insertRec  = $db->query($sql);
		
		$response['sql']     	= $sql;
        if ( $insertRec != NULL ) {
            $response['status']     	= "success";
            $response['userid']   		= $db->lastInsertId('userid');
            $response['emailid']  		= $insertDetails->email;
            $response['sysuserID']  	= "BARGAIN" . $insertDetails->sysuserID;
			$response['firstname']		= $insertDetails->firstname;
			$response['lastname']		= $insertDetails->lastname;
			$response['usertype']		= $insertDetails->userrole;
            $response['creditpoints']  	= $creditpoints;
            $response['isactive']  		= 1;
			$response['usercatid']  	= $usercatid;
            $response['professionid']  	= $insertDetails->professionid;
        }else{
            $response['status']  = "error";
            $response['message']  = "Error - Registering User";
        }
        echo json_encode($response);
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


    function executeSQLStatement($sql){
        $db = dbConn::fetch_instance();
        $tableRecords  = $db->queryFetchAllAssoc($sql);
        if( $tableRecords != NULL)
        {
            $response['status']     	= "success";
            $response['message'] 		= 'Success';
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
            $response['message']    	= 'Records Found';
            $response['tablesDetails']  = $tableRecords;
        }else
        {
            $response['status']  = "info";
            $response['title']   = "Info";
            $response['message'] = 'No Records Found';
        }
        return $response;
    }


	function forgotPASSWORD(){
        $obj = file_get_contents('php://input',true);
        $userDetails = json_decode($obj);
        $userEmail =  $userDetails->user->email;
        $response = array();
        $db = dbConn::fetch_instance();
        $sql = "select * from vendormaster where vendoremail="."'$userEmail'";
        $userRec   = $db->queryFetchRowAssoc($sql); 
        $response['sql']             = $sql;

        if( $userRec != NULL)
        {
            $response['status']         = "success";
            $response['title']      	= "Success";
            $response['vendoremail']    = $userRec['vendoremail'];
			
			$email_from 	 	= "sandeep@vkgroupindia.com";
			$email_to		 	= $userDetails->user->email;
			$email_subject 	 	= "MCCoy QR Code System : System generated Email";
			$email_message	 	= "This is system generated email.\r\n Your password has been set to :  ";
			$email_message		.= "<b>" . $userRec['vendorpass'] ."</b>";
			$email_message		.= "\r\nLogin in the System to for QR Code Generation";
			$email_message		.= "\r\nhttp://pinakininfo.co.in/MCCoy_V2/";
			$headers  			= "From: sandeep@vkgroupindia.com" ;
			//$headers .= "MIME-Version: 1.0\r\n";
			//$headers .= "Content-type: text/html\r\n";
    
			$retval = mail($email_to, $email_subject, $email_message, $headers);
			if( $retval == true ){
				$message  = 'MCCoy QR Generation : Password has been EMailed to ' ;
				$message .= $email_to;  
				$response['message']    = $message;
			}else{
				$response['status']     = "error";
				$response['title']      = "Error";
				$message  = 'MCCoy QR Code : Failed to send Email to ' ;
				$message .= $email_to;  
				$response['message']    = $message;
			}
        }else{
            $response['status']  = "error";
            $response['title']   = "Error";
            $response['message'] = 'MCCoy QR Code : Entered - Registered EMail ID not Found.';
        }
        echo json_encode($response);
	}

?>
 