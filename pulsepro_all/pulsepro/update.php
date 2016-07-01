<?php

	$text .= "<Files ~ \"\.txt$\">\n"; 
	$text .=  "Order allow,deny \n";
	$text .=  "Deny from all \n";
	$text .=  "</Files>";
	
	$htaccess_text  = "<FilesMatch '\.(zip|html|txt)$'>\n";
    $htaccess_text .= "Order allow,deny\n";
    $htaccess_text .= "Deny from all\n";
    $htaccess_text .= "</FilesMatch>\n";
		
	$errors = array();

//datafolder
if(!file_exists("data/")){
	
	if(!mkdir("data/" , 0755)){ $errors[] = "Error: Failed to create data folder"; }
					
	if ($fp = @fopen("data/.htaccess","w")) {
		$ht = @fwrite($fp, $htaccess_text);	
		fclose($fp);
	
	} else { $errors[] = "Error: Could not create .htaccess file in the data folder";}		
}

if (file_exists("data/")) {

	if (!file_exists("data/.htaccess")) {
	
			if ($fp = @fopen("data/.htaccess","w")) {
				$ht = @fwrite($fp, $htaccess_text);	
				fclose($fp);
			  } else { $errors[] = "Error: Could not create .htaccess file in the data folder";}
		}
}


	
//pages
if (!file_exists("data/pages/")) {
	
	if (!mkdir("data/pages/" , 0755)) { $errors[] = "Error: Failed to create pages folder"; }
	
	if ($fp = @fopen("data/pages/.htaccess","w")) {
		$ht = @fwrite($fp, $text);	
		fclose($fp);
	
	} else { $errors[] = "Error: Could not create .htaccess file in pages folder";}		
		
}

if (file_exists("data/pages/")) {

	if (!file_exists("data/pages/.htaccess")) {
	
			if ($fp = @fopen("data/pages/.htaccess","w")) {
				$ht = @fwrite($fp, $text);	
				fclose($fp);
			  } else { $errors[] = "Error: Could not create .htaccess file in pages folder";}
		}
}



//logs
if (!file_exists("data/logs/")) {
	
	if (!mkdir("data/logs/" , 0755)) { $errors[] = "Error: Failed to create logs folder"; }
					
	if ($fp = @fopen("data/logs/.htaccess","w")) {
		$ht = @fwrite($fp, $text);	
		fclose($fp);
	
	} else{ $errors[] = "Error: Could not create .htaccess file in logs folder";}
		
		
}

if (file_exists("data/logs/")) {

	if (!file_exists("data/logs/.htaccess")) {
	
	    if( $fp = @fopen("data/logs/.htaccess","w") ){
		    $ht = @fwrite($fp, $text);	
			fclose($fp);
		 
		 } else{ $errors[] = "Error: Could not create .htaccess file in logs folder";}
	 }
}
			


//stats
if (!file_exists("data/stats/")) {
	
	if (!mkdir("data/stats/" , 0755)) { $errors[] = "Error: Failed to create stats folder"; }
					
	if ($fp = @fopen("data/stats/.htaccess","w")) {
		$ht = @fwrite($fp, $text);	
		fclose($fp);
	
	} else { $errors[] = "Error: Could not create .htaccess file in stats folder";}
		
		
}

if (file_exists("data/stats/")) {

	if (!file_exists("data/stats/.htaccess")) {
	
			if ($fp = @fopen("data/stats/.htaccess","w")) {
				$ht = @fwrite($fp, $text);	
				fclose($fp);
			 
			 } else { $errors[] = "Error: Could not create .htaccess file in stats folder";}
	}
}

if (!file_exists("data/stats/sessions/")) {

	if (!mkdir("data/stats/sessions/" , 0755)) { $errors[] = "Error: Failed to create stats/sessions/ folder"; }
}



//files
if (!file_exists("data/files/")) {
	
	if (!mkdir("data/files/" , 0755)) { $errors[] = "Error: Failed to create files folder"; }
					
	if ($fp = @fopen("data/files/.htaccess","w")) {
		$ht = @fwrite($fp, $text);	
		fclose($fp);
	
	} else { $errors[] = "Error: Could not create .htaccess file in files folder";}
		
		
}

if (file_exists("data/files/")) {

	if (!file_exists("data/files/.htaccess")) {
	
			if ($fp = @fopen("data/files/.htaccess","w")) {
				$ht = @fwrite($fp, $text);	
				fclose($fp);
			  
			  } else { $errors[] = "Error: Could not create .htaccess file in files folder";}
	}
}




// update galleries for tim_thumb
$all_galleries = 'data/img/gallery/*';

foreach (glob($all_galleries) as $gallery){
		
	if (file_exists($gallery) && !preg_match("/\./", $gallery)) {
							
	    if (!file_exists($gallery."/cache")) {
		    $cac = mkdir($gallery. "/cache" , 0775);
								
			if($cac == false){
			    $errors[] = "Error: Failed to create a cache folder for $gallery";
								
			 }

		 }
		
		 if (!file_exists($gallery."/thumb.php")){						
		     $text = "<?php ". "include('../../../../plugins/timthumb/tim_thumb.php')".";"." ?>";
			
			 $fp = @fopen($gallery. "/thumb.php","w");
			 $ph = @fwrite($fp, $text);
			 fclose($fp);
						
			 if (($fp == false) || ($ph == false)) { 
			     $errors[] = "Error: Failed to create a \"thumb.php\" file for $gallery"; 
			 }
		 }
	}	
}


//update the config to set english as default

$opFile = "../config.php";
$fp     = fopen($opFile,"r");
$data   = @fread($fp, filesize($opFile));
fclose($fp);

$line = explode("\n", $data);
$no_of_lines = count($line)-1;
               
for ($i = 0; $i < $no_of_lines; $i++) {
        $caps[] = explode("=", $line[$i]);            
}            
$nb = count($caps);

for ($i = 1; $i < $nb-1; $i++) {
           
   if (preg_match("/pulse_lang/", $caps[$i][0])) {
		    $caps[$i][1] = " \"english\";";
	}

	$new_data .= $caps[$i][0]. "=". $caps[$i][1]. " \n";
}
	 
$all_conf = "<?php"."\n".$new_data."\n"."?>";
	 
$fp = @fopen("../config.php","w");
if (!$fp) { $errors[] = "could not update the config.";}
$ph = @fwrite($fp, $all_conf);
fclose($fp);


if (!empty($errors)) { 
	
	foreach ($errors as $error) {	
		echo "<p>$error</p>";
	}	

} else { echo "<p>Update complete!</p>";}


?>