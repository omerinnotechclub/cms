<?php

error_reporting(0);

include_once("path.php");
include_once(ROOTPATH."../../config.php");
include_once("lang/$pulse_lang.php");
include_once("helpers/functions.php");
include_once("helpers/blog_lib.php");

$get_blog = new show_Blogs;
$captcha  = new read_Cap;
$order    = ($date_format=='0' || $date_format=='1') ? "d-m-Y" : $date_format;
$q_and_a  = $captcha->check_anq($questions, $_POST["answers"], $_POST["question"], $_POST["token"]);

?> 

<link rel="stylesheet" href="http://<?php echo $_SERVER['HTTP_HOST']; ?>/<?php echo $pulse_dir; ?>/css/blog.css">

<?php

echo "<div class='blog-wrap'> \n";

if ($get_blog->val_d($_GET["d"]) == true) {
    $id_post  = super_clean($_GET["d"]);
    $comments = new show_Comments($id_post);
    $x        = 0;
	$resp     = ($blog_capcha == false) ? 1 : $q_and_a[0];
	$coms     = $comments->get_comments();

	if (isset($_POST['submit'])){
	    $comments_val = $comments->val_comment($_POST['name'], $_POST['mail'], $_POST['comment'], $_POST['ph'], $lang_blog_error_name, $lang_blog_error_email, $lang_blog_error_comment);	

		if (empty($comments_val) && $blog_comments && ($resp == 1)) {
			$comment_saved = $comments->val_comment_saved();
				
			if ($comment_saved == 0) {
			    $new_data = $get_blog->update_comment_amount_in_blogfile($id_post);			
	            $comments->update_files($new_data);
				$gettitle = $get_blog->get_blog_post($id_post);
	            $comments->send_mail($email_contact,$lang_blog_notify,$lang_blog_title,$lang_blog_name,$lang_blog_comment,$lang_blog_subject,$gettitle[6]);
	            $x = 1;
			 }
		 
			 unset($_POST['submit']);
			 $_POST['name'] = ''; $_POST['mail'] = ''; $_POST['comment'] = '';
		}	 
     }
     
	$blog_post_content = $get_blog->get_blog_post($id_post);			
	$blog_turned_off   = ($blog_post_content[7] == 1) ? true : false;
	
	if ($blog_post_content[0] == 0){ echo "404 Not Found"; header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found'); die(); }
	
	// Display individual post
	echo "<h2 class='blog-title'>$blog_post_content[6]</h2>\n";
	echo "<div class='blog-date'>".date($order, strtotime($blog_post_content[2]))."</div>\n"; 
	echo "<div class='blog-content'>".str_replace("##more##", "", $blog_post_content[4])."</div>\n";
	echo "<script>document.title='$blog_post_content[6]';</script>\n";		
	
	if ($blog_comments) { 
		if ($x==1) { $add = $comments->temp_values(); array_push($coms, $add); }
		
		echo "<div id='comments'>".($blog_post_content[5]+$x)." $lang_blog_num_comment</div>\n"; $x = 0;
		
		// Display comments
	    foreach ($coms as $comment) {
	    	echo "<div class='comment-name'>$comment[1]</div>\n";
		    echo "<div class='comment-date'>".date($order, strtotime($comment[0]))."</div>\n";
			echo "<div class='blog-comment'>$comment[2]</div>\n";
	    } 
		        		          
        if ($blog_turned_off == true && $blog_post_content[1] == $id_post) { echo "<p class='comments-off'>$lang_blog_off_comments</p>"; }
        if (!empty($comments_val)){ foreach ($comments_val as $error) { echo "<p style='color:red'>$error</p>"; }}
        if ($blog_turned_off == false && $blog_post_content[1] == $id_post) {
        
			echo "<form class ='comment-form' action = blog-$id_post-$blog_post_content[3] method='post'>";
			echo "<p class='add'><b>$lang_blog_add_comment</b></p>";
			
			echo "<label class='comment-label'>$lang_blog_label_name</label>";			
			echo "<input type='text' name='name' size='45' value =".super_clean($_POST['name']).">";
					
			echo "<label class='comment-label'>$lang_blog_label_email</label>";			
			echo "<input size='45' type='text' name='mail' value=".super_clean($_POST['mail']).">";
					
			echo "<label class='comment-label'>$lang_blog_label_comment</label>";			
			echo "<textarea name='comment' cols='60' rows='7'>".super_clean($_POST['comment'])."</textarea>";
			
			echo "<input id='ph' size='45' type='text' name='ph' value=".super_clean($_POST['ph']).">";
						
			if (($blog_capcha == true) || (!isset($blog_capcha))) { 
			    echo "<label class='comment-label'>". $q_and_a[1][0];
			       if ($resp == 2) { echo "<span style='color:red'> - $lang_blog_error_captcha</span>"; }
			    echo "</label>"; 
			     
				echo "<input type='hidden' name='token' value='".md5($q_and_a[1][1])."'/>";
				echo "<input type='hidden' name='question' value='". htmlentities($q_and_a[1][0])."'/>";
				echo "<input type='text' name='answers'/>";
			 } 										
			echo "<p><button class='btn' type='submit' name ='submit'>$lang_blog_submit</button></p>";		
			echo "</form>";
       }
    }	
    	 				       
} else { 

// Show all posts
foreach ($get_blog->get_blog_posts($per_page, $lang_blog_more) as $post) {
	echo "<div class='entry'>\n";
	echo "<h2 class='blog-title'><a href=\"blog-$post[0]-$post[3]\">$post[5]</a></h2>\n"; 
    echo "<div class='blog-date'>".date($order, strtotime($post[2]))."</div>\n";
    
    if ($blog_comments) {				
         echo "<div class='num_comments'><a href=\"blog-$post[0]-$post[3]#comments\">";
         if ($post[1]) { echo "($post[1]) $lang_blog_num_comment"; } else { echo $lang_blog_no_comment; }
         echo "</a></div>\n\n";
     }
    
	echo "<div class='blog-content'>$post[4]</div>\n"; 
		     
	echo "</div>\n";
}

// Pagination
echo '<div class="blog-pagination">';
$nums = $get_blog->amount_pages($per_page);
if ($nums[1] < $nums[0]) { echo "<a href=\"blog-page-".($nums[1]+1)."\">$lang_blog_older</a>"; }
if ($nums[1] > 1) { echo  "<a href=\"blog-page-".($nums[1]-1)."\">$lang_blog_newer</a>"; }
echo '</div>';
}
echo '</div>';
?>