<!DOCTYPE html>
<html>
<head>
	<title><?php echo $lang_page_title; ?></title>
	<meta charset="utf-8" />
	
	<link rel="stylesheet" href="css/style.css" media="all" />
	<?php include('hide.php');?>
	<link rel="stylesheet" href="plugins/plupload/jquery.plupload.queue/css/jquery.plupload.queue.css" media="all" />
	<link rel="stylesheet" href="plugins/redactor/css/redactor.css" />
	
	<meta name = "viewport" content = "initial-scale = 1.0, maximum-scale = 1.0, minimal-ui">
	
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/ios-icon-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/ios-sm-precomposed.png" />
	
	<script src="plugins/jquery/jquery.min.js"></script>
	<script src="plugins/redactor/redactor.min.js"></script>
	<script src="plugins/jquery/jquery_ui.js"></script>
	
	<!-- <script src="plugins/redactor/de.js"></script> -->
	
	<!-- Redactor's plugin -->
    <script src="plugins/redactor/fullscreen.js"></script>
    <script src="plugins/redactor/fontsize.js"></script>
    <script src="plugins/redactor/fontfamily.js"></script>
    <script src="plugins/redactor/fontcolor.js"></script>
    <script src="plugins/redactor/table.js"></script>
    <script src="plugins/redactor/imagemanager.js"></script>
	
	<script>
		$(document).ready(function(){
			$('a.embed_toggle').on('click', function(e) {    
			e.preventDefault();    
			$('#main').slideToggle(400);})		
		});
	</script>
	
	<script> 
		if (!RedactorPlugins) var RedactorPlugins = {};
		RedactorPlugins.morebutton = {
			init: function ()
			{
				this.buttonAdd('morebutton', 'Insert READ MORE button to blog.', this.testButton);
			},
			testButton: function(buttonName, buttonDOM, buttonObj, e)
			{
				this.insertHtml('##more##');
			}
		};
	</script>
	
	<script>
		$(function()
		{
			$('#redactor_content').redactor({
				lang: 'en',
				imageUpload: 'includes/editor_images.php',
				imageManagerJson: 'includes/data_json.php',
				fileUpload: 'includes/editor_files.php',
				convertDivs: false,
				autoresize: true,
				minHeight: 350,
				phpTags: true,
				linkEmail: true,
				plugins: ['table','fullscreen','fontsize','fontfamily','fontcolor','imagemanager','morebutton']
			});
		});
	</script>
	
</head>
	
<body id="<?php echo $page ?>">

<script> 
	function select_all(obj) 
		{ var text_val=eval(obj); 
			text_val.select(); 
		} 
</script>
		
<div id="header" class="group">
	<div class="inner">

		<a href="./"><div class="logo"></div></a>
			
		<ul id="pulse-nav">
			<li class="nav-pages"><a href="index.php?p=manage-pages"><?php echo $lang_nav_pages; ?></a></li>
			<li class="nav-blocks"><a href="index.php?p=manage-blocks"><?php echo $lang_nav_blocks; ?></a></li>
			<li class="nav-blog"><a href="index.php?p=manage-blog"><?php echo $lang_nav_blog; ?></a></li>
			<li class="nav-gallery"><a href="index.php?p=manage-gallery"><?php echo $lang_nav_galleries; ?></a></li>
			<li class="nav-form"><a href="index.php?p=manage-form"><?php echo $lang_nav_form ; ?></a></li>
			<li class="nav-stats"><a href="index.php?p=manage-stats"><?php echo $lang_nav_stats; ?></a></li>
			<li class="nav-backup"><a href="index.php?p=manage-backups"><?php echo $lang_nav_backup; ?></a></li>
			<li class="nav-settings"><a href="index.php?p=settings"><?php echo $lang_nav_settings; ?></a></li>
		</ul>

	</div>
</div>