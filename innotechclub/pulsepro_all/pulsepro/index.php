<?php

error_reporting(0);

// date_default_timezone_set('America/New_York');

include_once("includes/magic.php");
include_once("../config.php");
include_once("includes/path.php");
include_once("includes/lang/$pulse_lang.php");
include_once("includes/helpers/functions.php");
include_once("includes/login.php");

if(empty($startpage)){$startpage = 'manage-pages';}
$page = (isset( $_GET['p']) && !empty($_GET['p'])) ? $_GET['p'] : strtolower($startpage);

		$page = str_replace("/","", $page);
		$page = str_replace("\\","", $page);
		$page = htmlspecialchars($page, ENT_QUOTES, 'UTF-8');
		$page = preg_replace('/[^-a-zA-Z0-9_]/', '', $page);
		
ob_start();

include("includes/".$page.".php");

$content = ob_get_contents();

ob_end_clean();

include("includes/header.php");

echo $content;

include("includes/footer.php");
?>