<div id="footer">

<?php 
	
$_SESSION["super-user-token"] = md5(uniqid(rand(), TRUE)); 
require_once("login.php");

?>

	<div class="inner">
	
	
	<?php 
	if (!empty($pulse_serial)) { $check = str_split($pulse_serial);}
	
		if (empty($pulse_serial) 
		|| strlen($pulse_serial) > 20 
		|| strlen($pulse_serial) < 16
		|| count(array_unique($check)) < 4 ) { 
		
			echo '<a class="trial" href="http://pulsecms.com/trial">TRIAL VERSION</a>'; 
		}	
		else {
			echo "<span class='serial'></span>"; 	
		}
		
		if (extension_loaded('zip')==true) { include("includes/auto-backup.php"); }	
	?>

		<a class="ver" target="_blank" href="http://pulsecms.com/downloads">Pulse CMS 3.5.7</a>
		<a class="logout" href="index.php?p=logout"><?php echo $lang_nav_logout; ?></a>
		<a class="help" target="_blank" href="http://pulsecms.com/support"><?php echo $lang_help; ?></a>
		
		<form class="super-user" method="post" action="">
			<input type = "hidden" name = "super-user-token" value="<?php echo $_SESSION["super-user-token"];?>">
			<button type ='submit' class = "super-user" name = "super-user"></>
		</form>
	
	</div>

</div>

</body>

</html>