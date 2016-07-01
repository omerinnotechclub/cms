<style> .nav-pages { background-color: #404a57; } </style>

<div id = "sub-head">
	<a href = "index.php?p=new-page"><?php echo $lang_pages_newpage; ?></a>	 
</div>   

<div id = "content"><?php
	
require_once("login.php");

$folders_list = array();
$files_list   = array();
$files        = array();

$files = glob("data/pages/*.html");
foreach ($files as $file) { 
		
	if ($file != "." && $file != ".." ) {
	    $dm[] = $file;							
	}
	
}	

$dm = $files;
$nb = 0;
		
if (count($files) >= 1) {

     foreach ($files as $file) { 
	     $nb++;		
		 $info         = preg_replace("/\\.[^.\\s]{3,4}$/", "", $file);
		 $files_list[] = array($nb, basename($info));		 							
		 $pages[$nb]   = $file; 			
	 }
	
	 foreach ($files_list as $present_file_val) {
		?>
		<div class="tab page <?php echo $present_file_val[1]; ?>">
			<a href="index.php?p=edit-page&e=<?php echo $present_file_val[0]; ?>"><?php echo $present_file_val[1]; ?></a>	
		</div>
		<?php
	  }
	
	  $_SESSION["pages"] = $pages; 
	
} else {
     echo "<div class=\"left-pad\"><p class=\"empty\">$lang_pages_emptyfold</p></div>";
}	
?>
</div>