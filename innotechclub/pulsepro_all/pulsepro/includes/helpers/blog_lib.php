<?php

class read_File{
	
	function __construct($name){		
		$this->name = $name;	
		
		if($this->name == "blog"){$this->name = ROOTPATH . "/data/blog/blogfile.txt";}
		else if($this->name == "comment"){$this->name = ROOTPATH . "/data/blog/comments.txt";}
		else { echo $lang_blog_error_reading;}			
	 }	

	function getData(){
		$open = fopen($this->name , "r");
		$data = @fread($open, filesize($this->name));
		fclose($open);		
		return $data;		
	}	

	function getLines(){				
		$lines = explode("\n", $this->getData());
		return $lines;
	}
	
	function countLines(){	
		$amount_of_lines = count($this->getLines());
		return $amount_of_lines-1;		
	}	
	
}//end class


// show comments 					
class show_Comments{
	
    function __construct($id_post){	
		$this->comment_file_2  = new read_File("comment");
		$this->amount_c_2      = $this->comment_file_2->countLines();
		$this->lines_c_2       = $this->comment_file_2->getLines();
		$this->id_post         = $id_post;
	}
		
	function val_comment($name, $mail, $comm, $ph, $error1, $error2, $error3 ){
	
		if (empty($name)){ $error[] = $error1; } 
	    if (empty($mail) || !(preg_match("/@/", $_POST['mail'])) ) { $error[] = $error2 ; } 
		if (empty($comm)) { $error[] = $error3; } 
		if (!empty($ph)) { $error[] = 'Not human';  }
		if (strlen($comm) > 1000){ $error[] = 'Comment too long'; }
		
		if(empty($error)){ $this->clean_inputs($name, $mail, $comm); }
		
		return $error;;	
	}
	
	function clean_inputs($name, $mail, $comm){
		$comm  = strip_tags(stripslashes($comm),'<p><br><a>');
		$comm  = htmlspecialchars($comm, ENT_QUOTES, 'UTF-8');
		$comm  = str_replace("\n", "<br />", $comm);
		$comm  = str_replace("\r", "", $comm);
		$this->comm  = str_replace("|", "&brvbar;", $comm);
		$this->mail  = strip_tags(htmlspecialchars($mail, ENT_QUOTES, 'UTF-8'));
		$this->name  = strip_tags(trim(stripslashes($name)));   
		$comments = array( $this->name, $this->mail, $this->comm);
			
		return $comments;		
	}
	
	
	function get_comments(){	
		$comment = array();	
        for ($i = 0; $i < $this->amount_c_2; $i++) {
            $comments = explode("|", $this->lines_c_2[$i]);
	         
	         if ($comments[0] == $this->id_post) {
		         $date         = explode( ' ' , $comments[1]);
		         $date         = $date[2] . ' ' . $date[1]  . ' ' . $date[3];
			     $comment[]    = array($date,$comments[2],$comments[4]);
			 }
	     }
	     return $comment;
	 } 	 
	 
		
	function val_comment_saved(){
	     $comment_saved  = 0; 
						
		 for ($i = 0; $i < $this->amount_c_2 ; $i++) { 
		      $comments = explode("|", $this->lines_c_2[$i]);
								
			  if ($comments[0] == $this->id_post) { 
								     			
			       if (($comments[0] == $this->id_post) 
					&& ($comments[2] == $this->name) 
					&& ($comments[3] == $this->mail) 
					&& ($comments[4] == $this->comm)) {
					$comment_saved = 1;
					}
				}
			}
			return $comment_saved;		
	}
	
	
	function send_mail($email_contact, $lang_blog_notify, $lang_blog_title, $lang_blog_name, $lang_blog_comment, $lang_blog_subject, $gettitle){
		$sender_Name  = "PulseCMS"; 
		$mail_body    = $lang_blog_notify."\n\n";
		$mail_body   .= $lang_blog_title.": ".$gettitle."\n\n";
		$mail_body   .= $lang_blog_name.": ".$this->name."\n\n";
		$mail_body   .= $lang_blog_comment.": ".$this->comm."\n\n";			
		$subject      = $lang_blog_subject;
		$header       = "From: ". $sender_Name . " <" . $email_contact . ">\r\n";
		mail($email_contact, $subject, $mail_body, $header);						     					
	}
	 
	function temp_values(){
		return array(date('D, d M Y H:i:s O'), $this->name, $this->comm);
	} 	
	
	function update_files($new_data){
		$this->new_comment = $this->id_post."|".date('D, d M Y H:i:s O')."|".$this->name."|".$this->mail."|".$this->comm."\n";
		$save_commemt = new add_Content("comment", $this->new_comment);
		$save_commemt->appendData();
		
		$this->new_data	= $new_data;		
	    $update_blog = new add_Content("blog", $this->new_data);
	    $update_blog->writeData();				
	}
	
}//end class


class show_Blogs{

    function __construct(){	
    	$this->blog_file_1 = new read_File("blog");
		$this->amount      = $this->blog_file_1->countLines();
		$this->lines       = $this->blog_file_1->getLines();    
	}	
	
	function val_d($test){
			
		if (isset($test) && strlen($test > 0) && is_numeric($test)) {
			   return true;
		}
	    return false; 
	}	

	function get_blog_post($id_post){
			
		for ($i = 0; $i < $this->amount; $i++) { 
	        $blog = explode("|", $this->lines[$i]);
				 
			if ($blog[0] == $id_post) {
		    	$no_posts_found++;
				$date     = explode( ' ' , $blog[2]);
				$date     = $date[2] . ' ' . $date[1]  . ' ' . $date[3];
				$title    = cleanUrlname($blog[3]);
				$blog_0   = $blog[0];
			
				$blogfile = array($no_posts_found, $blog_0, $date, $title , $blog[4], $blog[1], $blog[3], $blog[5]);			
			}
		}
			return $blogfile;
	}
	
	function amount_pages($per_page){
	
		$result_per_page = $per_page ; 
		$total_pages     = ceil($this->amount/$result_per_page);
		$cur_page        = $_GET['page'] ? $_GET['page'] : 1;

		$start = $this->amount - (($cur_page-1) * $result_per_page);
		$end   = $this->amount - (($cur_page) * $result_per_page);
		
		$nums = array($total_pages, $cur_page, $start, $end);

		return $nums;
	}
	
	function get_blog_posts($per_page,$lang_blog_more){

		$nums = $this->amount_pages($per_page);

	    for ($n = $nums[2]-1; $n >= $nums[3]; $n-- ) { 
	    
		    $blog = explode("|", $this->lines[$n]);
		
		    if (isset($blog[0]) && $blog[0] != '') {
			
			    $date    = explode( ' ' , $blog[2]);
			    $date    = $date[2]. ' ' .$date[1] . ' ' .$date[3];
			    $title   = cleanUrlname($blog[3]);
			    $content = $blog[4];
			
			    if (preg_match("/^(.*)##more##/U", $blog[4], $m)) { 
				$content = $m[1] . "<a href='blog-$blog[0]-".cleanUrlname($blog[3])."' class='read-more'>$lang_blog_more</a>\n";
			    } 
			    
			    $blogposts[] = array($blog[0], $blog[1], $date, $title, $content, $blog[3], $blog[4], $blog[2]);
			 }
		}
		return $blogposts;
	}
	
	function update_comment_amount_in_blogfile($id_post){
			
		for ($i = 0; $i < $this->amount; $i++) { 
			 $blogpost = explode("|", $this->lines[$i]);
						
			 if ($blogpost[0] == $id_post) {		  
				$blogpost[1]++;
				$new_data .=  $blogpost[0]. "|" . $blogpost[1] ."|".$blogpost[2]."|".$blogpost[3]."|".$blogpost[4]."|".$blogpost[5]."\n";				   	
			  
			  } elseif($blogpost[0] != "") {
				 $new_data .=  $blogpost[0]. "|" . $blogpost[1] ."|".$blogpost[2]."|".$blogpost[3]."|".$blogpost[4]."|".$blogpost[5]."\n";
			  }
		 }
		 return $new_data;			
	}
		
}	


class add_Content{

		function __construct($name,$data){		
		$this->name = $name;
		$this->data = $data;	
		
		if($this->name == "blog"){$this->name = ROOTPATH . "/data/blog/blogfile.txt";}
		else if($this->name == "comment"){$this->name = ROOTPATH . "/data/blog/comments.txt";}
		else { echo $lang_blog_error_reading;}
		}
		
		function appendData(){
			$open = fopen($this->name, "a");
			fwrite($open, $this->data);
			fclose($open);
		}
		
		function writeData(){			
			$open = fopen($this->name, "w");
			fwrite($open, $this->data);
			fclose($open);			
		}	
				
				
}//end class


class read_Cap{
	
	function get_questions($questions){  
	    $question = array_rand($questions, 1); 
        $both     = array($question, strtolower($questions[$question]));
	    return $both;
	}
	
	function check_anq($questions, $panswer, $pquestion, $ptoken){
		
		if (!(isset($pquestion))){ $result = array(3,$this->get_questions($questions)); }
		if (!empty($panswer) 
		    && $questions[stripslashes(html_entity_decode($pquestion))] == strtolower(trim($panswer)) 
		    && md5($questions[stripslashes(html_entity_decode($pquestion))]) == $ptoken) {
			   $result = array( 1, $this->get_questions($questions));
	    }elseif (isset($panswer)) {
				$result = array(2, $this->get_questions($questions));
		}
		
		return $result;
		
	}
		
}

//sanatize input
function super_clean($text){	
	$text = trim(stripslashes(strip_tags(htmlspecialchars($text, ENT_QUOTES, 'UTF-8'))));	
	return $text;
}			
?>