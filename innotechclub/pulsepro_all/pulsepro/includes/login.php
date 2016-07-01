<?php
ob_start();

$max_session_time 	= 36000;
$cmp_pass 			= md5($pulse_pass);
$max_attempts 		= 5;
$session_expires 	= $_SESSION["mpass_session_expires"];
$timestamp_old 		= time() - (60*60);
$token_check 		= false;
$max_attempts++;
$path = "/$pulse_dir/";
$domain = $_SERVER['SERVER_NAME'];

session_set_cookie_params(0, $path, $domain, false, true);
session_start();

if(isset($_COOKIE["mpass_pass-$path"])){
    $_SESSION["mpass_pass-$path"] = $_COOKIE["mpass_pass-$path"];
}

//check token
if(isset($_POST["log_token"])){
	
  if(isset($_SESSION["log_token"]) 
  	&& isset($_SESSION["log_token_time"]) 
  	&& $_SESSION["log_token"] == $_POST["log_token"]) {

    if($_SESSION["log_token_time"] >= $timestamp_old) {
		$token_check = true;
	}
   }			
   unset($_SESSION["log_token"]);	
   unset($_SESSION["log_token_time"]);
}

if(!isset($_POST["log_token"]) || $_SESSION["log_token_time"] <= $timestamp_old) {		
	$_SESSION["log_token"] = md5(uniqid(rand(), TRUE));	
	$_SESSION["log_token_time"] = time();
}

if(!empty($_POST["mpass_pass"])) {

  function getIp() {
	$pattern = "/^([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/";
	$ip_m 	 = $_SERVER['REMOTE_ADDR'];
	
	if ($ip_m && (strlen($ip_m) > 0) && preg_match($pattern, $ip_m)){ 	   		
	   	 $ip = $ip_m; 
	} else { 
	   	 $ip = "no ip"; 		   		
		  	}
		  	
	return $ip;	   
   }
	//delete old log files
	if (is_dir("data/logs/")) {
	$date    = date("M");
	$month_1 = mktime(0, 0, 0, date("m")-1, date("d"),date("Y"));
	$month_1 = date("M", $month_1);
	$month_2 = mktime(0, 0, 0, date("m")-2, date("d"),date("Y"));
	$month_2 = date("M", $month_2);
	$months  = array($date, $month_1, $month_2);

	foreach (glob("data/logs/*.txt") as $fl) {		
		$log_file = basename($fl,".txt");	

		    if (!in_array($log_file, $months)) {
			   @unlink("data/logs/$log_file.txt");
		    }
	}	
	//current log_file	
	$opFile = "data/logs/$date.txt";	
	}
                                
	if ((md5($_POST["mpass_pass"]) == $cmp_pass) && $token_check == true) {
			//Update log.txt - success - logged in
        	if (is_dir("data/logs/") && is_writeable("data/logs/")) {
			    $time 	  = date("r");
			    $ip       = getIp();
			    $new_data.= "success"."|". $ip ."|". $time ."\n";                               
                $fp 	  = @fopen($opFile,"a+"); 
                
             if (flock($fp, LOCK_EX)) {                    	
                 $success = fwrite($fp, $new_data);
                 flock($fp, LOCK_UN); 
                }
                @fclose($fp);                
             }
                
		$_SESSION["mpass_pass-$path"] = crypt(md5($_POST["mpass_pass"]));
		setcookie ("mpass_pass-$path", crypt(md5($_POST["mpass_pass"])), time()+3600*24*7, $path, $domain, false, true);
		header("Location: index.php");
		die();
		
	} else { //Update log.txt - failed				
			if (is_dir("data/logs/") && is_writeable("data/logs/")) {
			    $time 	  = date("r");
			    $ip       = getIp();	
			    $new_data.= "failed"."|". $ip ."|". $time ."\n";                              
                $fp       = @fopen($opFile,"a+"); 
                
            if (flock($fp, LOCK_EX)) {    
                $success = fwrite($fp, $new_data);
                flock($fp, LOCK_UN); 
             }
                @fclose($fp);                
             }
	  }		
}

//if no failed attempts yet, set to 0
if (empty($_SESSION["mpass_attempts"])) {	
	$_SESSION["mpass_attempts"] = 0;	
}

//failed attempt or session expired
if (($max_session_time > 0 
	&& !empty($session_expires) 
	&& time() > $session_expires) 
	|| empty($_SESSION["mpass_pass-$path"]) 
	|| crypt($cmp_pass,$_SESSION["mpass_pass-$path"]) != $_SESSION["mpass_pass-$path"] ) {

	sleep(1);
	
	if (crypt($cmp_pass,$_SESSION["mpass_pass-$path"]) != $_SESSION["mpass_pass-$path"]) {	
		$_SESSION["mpass_attempts"]++;
	}
	
	if($max_attempts >1 && $_SESSION["mpass_attempts"] >= $max_attempts) {
	    
		exit("Too many login failures.");
	}

	$_SESSION["mpass_session_expires"] = "";
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $lang_page_title; ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="css/style.css" media="all">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/ios-icon-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/ios-sm-precomposed.png" />
    <script type="text/javascript" src="plugins/jquery/jquery.min.js"></script>
</head>

<body id="login-page">
    <form name="login" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" id="login">
    <?php if (!empty($_POST["mpass_pass"]) && (md5($_POST["mpass_pass"]) != $cmp_pass)) {
            echo "<p class=\"errorMsg\">$lang_login_incorrect</p>";
	      }
	      
	 ?>
    	<input type="password" size="27" name="mpass_pass" placeholder="Password" autofocus>
        <input type="hidden" name="log_token" value="<?php echo $_SESSION["log_token"] ?>">
        <button class="login-btn"><?php echo $lang_login_button; ?></button>
        <?php
        if (!empty($pulse_serial)) { $check = str_split($pulse_serial);}
		if (empty($pulse_serial) 
		|| strlen($pulse_serial) > 20 
		|| strlen($pulse_serial) < 16
		|| count(array_unique($check)) < 4 ) { 
		
			echo '<a class="login-trial" href="http://pulsecms.com/trial">TRIAL VERSION</a>'; 
		}	
		else {
			echo "<span class='serial'></span>"; 	
		}	    
        ?>
    </form>
</body>
</html>

<?php 

exit();
}

$_SESSION["mpass_attempts"]        = 0;
$_SESSION["mpass_session_expires"] = time()+$max_session_time;
?>