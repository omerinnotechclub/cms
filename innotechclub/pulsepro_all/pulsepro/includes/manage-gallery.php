<?php 
	
$on = 'images'; 
require_once("login.php");

?>

<div id = "sub-head">
	<a href = "index.php?p=new-gallery"><?php echo $lang_gal_newgal; ?></a> 
</div>

<div id = "content">	          
<?php 

$dir    = 'data/img/gallery/';
$handle = opendir($dir);
$nb     = 1;
	
while ($filename = readdir($handle)) {
	
     if ($filename != ".." 
         && $filename != "." 
         && is_dir($dir.$filename)) {
		 
	     echo '<div class="tab gallery">';
		 echo '<a href="index.php?p=manage-photo&g='. $filename  .'">'.  preg_replace("/-/", " ", $filename) .'</a>';
		 echo '</div>';
	
		 $gallery[$nb] = $filename;
		 $nb++; 
	  }
}			
	
if ($nb == 1) {
	echo "<p class=\"created\">$lang_gal_no_gal</p>";
}
	
$_SESSION["gallery"] = $gallery;

?>	
</div>