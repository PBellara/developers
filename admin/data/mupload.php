<?php
      if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

        // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
    }

	if(isset($_FILES['file'])){
		
        $PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
        if (!file_exists($PNG_TEMP_DIR))
            mkdir($PNG_TEMP_DIR);
		$response['PNG_TEMP_DIR'] =$PNG_TEMP_DIR; 
		
		$file_name = $_FILES['file']['name'];
		$file_size = $_FILES['file']['size'];
		$file_tmp  = $_FILES['file']['tmp_name'];
		$file_type = $_FILES['file']['type'];   
		$file_ext  = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
		$extensions = array("jpeg","jpg","png");
		
		if(in_array($file_ext,$extensions )=== false){
			$response['status']    = "Error";
		 	$response['message']="file extension not allowed, please choose a JPEG or PNG file.";
			echo json_encode($response);
			return;
		}
		
		move_uploaded_file($file_tmp,$PNG_TEMP_DIR . $file_name);
		/*$response['file_tmp']  = $file_tmp;
		$response['status']    = "Success";
		$response['filename']  = $file_name;
		echo json_encode($response);*/
		echo "filename:" .  $file_name;		
	}

?>