<?php 
if (isset($_POST['super-user']) 
    && isset($_POST['super-user-token']) 
    && ($_POST['super-user-token'] == $_SESSION['super-user-token'])) { 

    if ($_SESSION["super-user"] === 1) { 	
	    unset($_SESSION["super-user"]); 
	}
	else { 
	    $_SESSION["super-user"] = 1; 
	}
	unset($_SESSION['super-user-token']); 
}
		
if (!isset($_SESSION["super-user"]) || ($_SESSION["super-user"] !=1 )) {
  ?><link rel="stylesheet" href="css/hide.css" media="all" /><?php 
} 
	  
?>