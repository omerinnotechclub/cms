<?php

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


class Form{

	function __construct($custom_fieldname1, $custom_fieldname2){
		$this->custom_fieldname1 = (!empty($custom_fieldname1)) ? $custom_fieldname1 : '';
		$this->custom_fieldname2 = (!empty($custom_fieldname2)) ? $custom_fieldname2 : '';
	}
	
	function clean_posts($post){
		$post = stripslashes(strip_tags(trim($post)));
		return $post;		
	}
		
	function val_inputs($email, $name, $commment, $resp, $custom_message1="", $custom_message2="",$lang_form_valid_email,$lang_form_all_fields, $lang_blog_error_captcha){
		if (!($email)    || !(preg_match("/@/", $email))) { $error[] = $lang_form_valid_email;  }
		if (!($name)	 || empty($name)){                  $error[] = $lang_form_all_fields;   }
		if (!($commment) || empty($commment)){              $error[] = $lang_form_all_fields;   }
		if ($resp == 2) {                                   $error[] = $lang_blog_error_captcha;}

		if(empty($error)){ $this->clean_inputs($email, $name, $commment, $resp, $custom_message1, $custom_message2); }
		
		return $error;
	}	
	
	function clean_inputs($email, $name, $commment, $resp, $custom_message1="", $custom_message2=""){
        $this->email            = stripslashes(strip_tags(trim($email)));
        $this->name             = stripslashes(strip_tags(trim($name)));
        $this->resp             = $resp;
        
	    $this->comment  = (!empty($custom_message1)) ? $this->custom_fieldname1.": ". trim($custom_message1) ."\n\n" : "";
		$this->comment .= (!empty($custom_message2)) ? $this->custom_fieldname2.": ". trim($custom_message2) ."\n\n" : "";
		$this->comment .= trim($commment);
	
        return array($this->email, $this->name, $this->comment);
     }	
}

?>