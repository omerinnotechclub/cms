<?php 
require_once("login.php");
if (!extension_loaded('zip')) { 
    echo $lang_backup_err_zip_extension; 
}

if (isset($_GET['b']) && file_exists("data/backups/".$_GET['b'].".zip")){
	$download  = "data/backups/".$_GET['b'].".zip";
    $file_name = basename($download);

    header("Content-Type: application/zip");
    header("Content-Disposition: attachment; filename=$file_name");
    header("Content-Length: " . filesize($download));
    readfile($download);    
    exit;
}

?>
<div id = "sub-head">
	<a href = "index.php?p=backup"><?php echo $lang_backup_now; ?></a>
</div>

<div id = "content">	            
<div class = "backup-list">

<?php 
	
$files = glob("data/backups/*");
rsort($files);
	
if ($files) {
	
    foreach ($files as $file) { 
        $short = (pathinfo($file));
        
        if (!is_dir($file)) {
	        ?>
	        <div class="tab zips">
	        <a href = "index.php?p=manage-backups&b=<?php echo $short['filename']; ?>">
	        <?php $file = preg_replace("/\\.[^.\\s]{3,4}$/", "", $file); echo basename($file);?></a>
	        <?php $t = basename($file);?>
	        <a class="del-backup" href="index.php?p=del-backup&f=<?php echo htmlentities($t);?>">x</a> 
	        </div>
	        <?php 
	    }
	}
} 
$_SESSION["backups"] = $backups;		
?>
</div>
</div>