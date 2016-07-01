<?php

error_reporting(0);

include("./config.php");

$pulse_dir_one = $pulse_dir;

if(strstr($pulse_dir,'/')){ $dir_array = explode('/', $pulse_dir); $pulse_dir_one = array_pop($dir_array); }

$page = (isset($_GET['p']) && !empty($_GET['p'])) ? $_GET['p'] : 'home';
$page = htmlspecialchars($page, ENT_QUOTES, 'UTF-8');
$page = preg_replace('/[^-a-zA-Z0-9_]/', '', $page);

if(!file_exists("$pulse_dir_one/data/pages/" . $page . ".html")) {
    $page = '404';
}

ob_start();

include("$pulse_dir_one/data/pages/$page.html");

if (file_exists("$pulse_dir_one/data/pages/meta-".$page.".txt")){	
	include("$pulse_dir_one/data/pages/meta-".$page.".txt");		
}

$content = ob_get_contents();

ob_end_clean();

include("template/layout.php");