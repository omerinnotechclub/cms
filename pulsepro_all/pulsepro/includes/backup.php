<div id = "content">
<?php
	
require_once("login.php");

$today = date("m.d.y-gi");

$zip = new ZipArchive();
 
$zip->open("./data/backups/" . $today . ".zip", ZipArchive::CREATE); 
$dirNames = array('./data/pages','./data/blocks','./data/blog','./data/files','./data/img','./data/stats','./data/logs'); 

foreach ($dirNames as $dirName){

    if (!is_dir($dirName)) { 
   	 echo $lang_backup_err_destination; 
   	 } 

   	 $dirName = realpath($dirName); 
    
    if (substr($dirName, -1) != '/') { 
	   	 $dirName.= '/'; 
	 } 
 
	 $dirStack = array($dirName); 

	 $cutFrom = strrpos(substr($dirName, 0, -1), '/')+1; 

	 while (!empty($dirStack)) { 
		 $currentDir = array_pop($dirStack); 
		 $filesToAdd = array(); 

		 $dir = dir($currentDir); 
     while (false !== ($node = $dir->read())) { 
          
          if (($node == '..') || ($node == '.')) { 
            continue; 
          } 
        
		  if (is_dir($currentDir . $node)) { 
            array_push($dirStack, $currentDir . $node . '/'); 
		  } 
        
          if (is_file($currentDir . $node)) { 
            $filesToAdd[] = $node; 
          } 
     } 

	 $localDir = substr($currentDir, $cutFrom); 
	 $zip->addEmptyDir($localDir); 
    
	 foreach ($filesToAdd as $file) { 
         $zip->addFile($currentDir . $file, $localDir . $file); 
     } 
     } 
}

if ($zip->close() == true) {
    $host  = $_SERVER['HTTP_HOST'];
	$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
	header("Location: http://$host$uri/index.php?p=manage-backups");
	die();
}

$_SESSION["backups"] = $backups; ?>
</div>