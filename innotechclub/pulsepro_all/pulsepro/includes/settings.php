<form action = "index.php?p=settings" method = "post">

<div id = "sub-head">
	<button type = "submit"><?php echo $lang_blog_button_update; ?></button>
	<?php greenCheckmark();?>
</div>

<div id = "content">

<?php
require_once("login.php");

if ($_POST["status"] == 1) {		

     if (isset($_SESSION["token"]) 
        && isset($_SESSION["token_time"]) 
        && isset($_POST["token"]) 
        && $_SESSION["token"] == $_POST["token"]) {
        
        $timestamp_old = time() - (60*60);

        if ($_SESSION["token_time"] >= $timestamp_old) {
	   
	        foreach ($_POST as $var => $key) {
                $$var = htmlspecialchars(trim(stripslashes($key)), ENT_QUOTES, "UTF-8");
            }

	        $config = '<?php    
$pulse_dir = "'. $directory .'";
$pulse_pass = "'. $password .'";
$height = "'. $height .'";
$width = "'. $width .'";
$blog_url = "'. $blog_url .'";
$per_page = "'. $posts_per .'";
$blog_comments = '. $comments .';
$blog_capcha = '. $blog_capcha .';
$questions["'. $question1 .'"] = "'. $answer1 .'";
$questions["'. $question2 .'"] = "'. $answer2 .'";
$questions["'. $question3 .'"] = "'. $answer3 .'";
$date_format = "'. $date_format .'";
$email_contact = "'. $email .'";
$pulse_lang = "'. $pulse_lang .'";
$custom_fieldname1 = "'. $custom_fieldname1 .'";
$custom_fieldname2 = "'. $custom_fieldname2 .'";
$formcap = "'. $formcap .'";
$startpage = "'. $startpage .'";
$pulse_serial = "'. $serial .'";
?>';

            if ($fp = fopen("../config.php", "w")) {
                fwrite($fp, $config, strlen($config));
                
                $_SESSION["saved"]=true;
                $host  = $_SERVER['HTTP_HOST'];
				$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
				header("Location: http://$host$uri/index.php?p=settings");
				die();
				
            } else {
                echo "<p class=\"errorMsg\">$lang_settings_unwritable</p>"; 
            }
        }       
    }
}

if (empty($_SESSION["token"]) || $_SESSION["token_time"] <= $timestamp_old){
		 $_SESSION["token"]      = md5(uniqid(rand(), TRUE));	
		 $_SESSION["token_time"] = time();
}

if (!isset($_POST["status"])) {
?>
    
<div class="settings">
   
   <h2><?php echo $lang_setting_general; ?></h2>
   
   <div class="setting">
	   <label><?php echo "Serial"; ?></label>
	   <input class="med" type="text" name="serial" placeholder='Trial' value="<?php echo $pulse_serial; ?>"/>
	   <p class="settings-hints"><?php echo "For a live site you need to purchase a license."; ?></p>
   </div>
   
   <div class="setting">
	   <label><?php echo $lang_setting_folder; ?></label>
	   <input class="med" type="text" name="directory" value="<?php echo $pulse_dir; ?>"/>
	   <p class="settings-hints"><?php echo $lang_setting_folder_hint; ?></p>
   </div>
   
   <div class="setting">
	   <label><?php echo $lang_setting_password; ?></label>
	   <input class="med" type="password" name="password" value="<?php echo $pulse_pass; ?>"/>
   </div>
   
   <div class="setting">
	   <label><?php echo $lang_email_contact; ?></label>
	   <input class="med" type="text" name="email" value="<?php echo $email_contact; ?>"/>
   </div>
   
   <div class="setting">
	   <label><?php echo $lang_setting_lang; ?></label>
	   <select name="pulse_lang">
	   
	   <?php 	   
	   foreach ((glob("includes/lang/*")) as $language) {
		   $language = explode("/", $language);
		   $language = explode(".", $language[2]);	
		   $language_collection[] = $language[0];
		 }

		foreach($language_collection as $lang_option){

		?><option value = "<?php echo $lang_option; ?>"<?php echo $pulse_lang == $lang_option ? 'selected="selected"' : '';?>><?php echo ucfirst($lang_option); ?></option><?php
		   			   		
			  } ?>
	   
	   </select> 
   </div>
   
      <div class="setting">
	   <label><?php echo $lang_blocks_home; ?></label>
	   <select name="startpage">
	   
	   <?php 	
	   $startpage_options = array(
	   		array($lang_nav_pages,'manage-pages'), 
	   		array($lang_nav_blocks,'manage-blocks'), 
	   		array($lang_nav_blog,'manage-blog'), 
	   		array($lang_nav_galleries,'manage-gallery'), 
	   		array($lang_nav_form,'manage-form'), 
	   		array($lang_nav_stats,'manage-stats'), 
	   		array($lang_nav_backup,'manage-backups'), 
	   		array($lang_nav_settings,'settings') 
	   		);
	      
	   foreach ($startpage_options as $startpage_option) {

		?><option value = "<?php echo $startpage_option[1]; ?>"<?php echo $startpage == $startpage_option[1] ? 'selected="selected"' : '';?>><?php echo ucfirst($startpage_option[0]); ?></option><?php
		   			   		
			  } ?>
	   
	   </select> 
   </div>
  
    <br><br>
    
    <h2><?php echo $lang_setting_gallery_thumbnails; ?></h2>
    
    <div class="setting">
    	<span><?php echo $lang_setting_tim_height; ?></span>
    	<input name="height" type="text" style="width:75px" placeholder="100" value="<?php echo $height; ?>" >
    	<span><?php echo $lang_setting_tim_width; ?></span>
    	<input name="width" type="text" style="width:75px" placeholder="100" value="<?php echo $width; ?>" >
    </div>
    
    <br><br>
    
    <h2><?php echo $lang_setting_blog; ?></h2>
    
    <div class="setting">
	    <label><?php echo $lang_setting_blog_url; ?></label>
	    <input class="long "type="text" name="blog_url" value="<?php echo $blog_url; ?>" />
	    <p class="settings-hints"><?php echo $lang_setting_blog_url_hint; ?></p>
    </div>
    
    <div class="setting">
	    <label><?php echo $lang_setting_blog_posts; ?></label>
	    <input type="text" name="posts_per" value="<?php echo empty($per_page) ? 5 : $per_page; ?>" />
    </div>
    
    <div class="setting">
    <?php if( ($date_format == '0') || ($date_format == '1')){ $date_format = 'd-m-Y';}?>
	    <label ><?php echo $lang_setting_date; ?></label>
		<input type="text" name="date_format" value="<?php echo $date_format; ?>"/>
		<p class="settings-hints"><?php echo $lang_setting_blog_date; ?></p>
    </div>
    
    <div class="setting">
	    <label><?php echo $lang_setting_blog_comments; ?></label>
	    <select name="comments">
	    	<option value="true" <?php echo ($blog_comments) ? 'selected="selected"' : '';?>><?php echo $lang_setting_blog_enabled; ?></option>
	    	<option value="false" <?php echo ($blog_comments) ? '' : 'selected="selected"';?>><?php echo $lang_setting_blog_disabled; ?></option>
	    </select>
    </div>
    
    <div class="setting">
	    <label><?php echo $lang_blog_capcha ?></label>
	    <select name="blog_capcha">
	    	<?php if (!isset ($blog_capcha)) { $blog_capcha = true; } ?>
	    	<option value="true" <?php echo ($blog_capcha) ? 'selected="selected"' : '';?>><?php echo $lang_setting_blog_enabled; ?></option>
	    	<option value="false" <?php echo ($blog_capcha) ? '' : 'selected="selected"';?>><?php echo $lang_setting_blog_disabled; ?></option>
	    </select>
    </div>   

    <br><br>
     
    <h2><?php echo $lang_setting_spam_questions ?></h2>
    
	 <?php 
	 $bn = 1;
	 
	 foreach ($questions as $key => $val) { ?>
	    
	 <div class="setting">
	    <label><?php echo $lang_setting_spam_question; ?> <?php $a = $bn++; echo $a; ?></label>
	    <input class="long" type="text" name="question<?php echo $a; ?>" value="<?php echo $key; ?>" />
     </div>
    
    <div class="setting">
	    <label><?php echo $lang_setting_spam_answer; ?> <?php echo $a; ?></label>
	    <input class="med" type="text" name="answer<?php echo $a; ?>" value="<?php echo $val; ?>" />
	    
    </div>
    
    <?php } ?>
    
    <input name="custom_fieldname1" type="hidden" value="<?php echo $custom_fieldname1; ?>" >
    <input name="custom_fieldname2" type="hidden" value="<?php echo $custom_fieldname2; ?>" >
    <input name="formcap" type="hidden" value = "<?php echo $formcap; ?> ">
       
    <input type="hidden" name="status" value="1" />
    <input type="hidden" name="token" value="<?php echo $_SESSION["token"]; ?>" />
    
    </form>
    
<?php } ?>
</div>
</div>