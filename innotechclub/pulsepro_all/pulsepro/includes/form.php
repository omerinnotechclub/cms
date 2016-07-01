<?php
error_reporting(0);
$domain = $_SERVER['HTTP_HOST'];
include_once("path.php");
include_once(ROOTPATH."../../config.php");
$errors = array();
$x = 0;

//get php mailer includes
if (!$pulse_dir_one) {
	$pulse_dir_one = $pulse_dir;
    
 if (strstr($pulse_dir,'/')) { 
	 $dir_array     = explode('/', $pulse_dir); 
	 $pulse_dir_one = array_pop($dir_array); 
  }
}
include_once(ROOTPATH."/plugins/mailer/class.phpmailer.php");
include_once(ROOTPATH."/plugins/mailer/class.smtp.php");
include_once("lang/$pulse_lang.php");
include_once("helpers/form_lib.php");

$captcha  = new read_Cap;
$q_and_a  = $captcha->check_anq($questions, $_POST["answers"], $_POST["question"], $_POST["token"]);
$resp     = ($formcap == 1) ? 1 : $q_and_a[0];

$form = new Form($custom_fieldname1, $custom_fieldname2);

if (isset($_POST['submit']) && empty($_POST['human'])) { 
    $errors  = $form->val_inputs($_POST['email'], $_POST['name'],$_POST['comment'],$resp, $_POST['custom1'], $_POST['custom2'],
               $lang_form_valid_email , $lang_form_all_fields, $lang_blog_error_captcha);
    $output  = $form->clean_inputs($_POST['email'],$_POST['name'],$_POST['comment'],$resp, $_POST['custom1'],$_POST['custom2']);
   
    $email   = $output[0];
    $name    = $output[1];
    $comment = $output[2];

    $mail = new PHPMailer;
	//in case your host requires smtp authentication, please uncomment and fill out the lines below. Make sure to leave the semicolons in place!
	
	/*
		$mail->isSMTP();                                      // Do nothing here
		$mail->Host = 'smtp1.example.com';                    // Specify main server
		$mail->SMTPAuth = true;                               // Do nothing here
		$mail->Username = 'jswan';                            // SMTP username
		$mail->Password = 'secret';                           // SMTP password
		$mail->Port = 465;									  // SMTP port 	
		$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
	*/

	$mail->From     = $email;
	$mail->FromName = $name;
	$mail->addAddress($email_contact); 
	$mail->Subject  = $lang_form_subject;
	$mail->Body     = $comment;
            
    if (empty($errors)){
         if ($mail->send()) {              
			  $_POST['name'] = ''; $_POST['email'] = ''; $_POST['custom1'] = ''; $_POST['custom2'] = ''; $_POST['comment'] = '';
			  $name = ''; $email = ''; $comment = ''; unset($form);
			  echo "<p class=\"msg-green\">$lang_form_message_sent</p>";
			  $x = 1;
         
         } else { echo "<p class=\"msg-red\">$lang_form_not_sent</p>"; }
     } 
}
?>
<link rel="stylesheet" href="http://<?php echo $domain ?>/<?php echo $pulse_dir ?>/css/form.css" media="all">

<?php
//errors
if (!empty($errors)) { foreach ($errors as $error) { echo "<p class=\"msg-red\">$error</p>"; } }
if ($x === 0){			  
?>

<form id="contact" method="post" action="" >

<fieldset>
<label for="name"><?php echo $lang_form_label_name; ?></label><br>
<input id="name" name="name" type="text" value="<?php echo $form->clean_posts($_POST['name']); ?>" >
</fieldset>

<fieldset>
<label for="email"><?php echo $lang_form_label_email; ?></label><br>
<input id="email" name="email" type="email" value="<?php echo $form->clean_posts($_POST['email']); ?>" >
</fieldset>

<!-- Custom Field 1 -->
<?php  if (!empty($custom_fieldname1)) { ?>
<fieldset>
<label for="custom1"><?php echo "$custom_fieldname1"; ?></label><br>
<input id="custom1" name="custom1" type="text" value="<?php echo $form->clean_posts($_POST['custom1']); ?>" >
</fieldset>
<?php } ?>

<!-- Custom Field 2 -->
<?php  if (!empty($custom_fieldname2)) { ?>
<fieldset>
<label for="custom2"><?php echo "$custom_fieldname2"; ?></label><br>
<input id="custom2" name="custom2" type="text" value="<?php echo $form->clean_posts($_POST['custom2']); ?>" >
</fieldset>
<?php } ?>

<fieldset>
<input id="human" name="human" type="text" value="<?php echo $form->clean_posts($_POST['human']);?>" >  
<label for="comment"><?php echo $lang_form_label_comment; ?></label><br>
<textarea id="comment" name="comment" rows="8"><?php echo $_POST['comment']; ?></textarea>
</fieldset>

<!-- Captcha -->
<?php if ($formcap != 1) { ?>
<fieldset>
<label for="name"><?php echo $q_and_a[1][0]; ?> </label> 
<input type="hidden" name="token" value="<?php echo md5($q_and_a[1][1]); ?>" >
<input type="hidden" name="question" value="<?php echo htmlentities($q_and_a[1][0]); ?>" >
<input id="answers" type="text" name="answers" />
</fieldset>
<?php } ?>

<button class="btn" name="submit" type="submit"><?php echo $lang_form_send; ?></button>

</form>
<?php }?>