<?php 
$title = "EasyJ Robot Builder"

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="../../assets/ico/favicon.ico">

		<title><?= $title ?></title>

		<!-- Bootstrap core CSS -->
		<link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<style type="text/css">
			/* Move down content because we have a fixed navbar that is 50px tall */
			body {
				padding-top: 50px;
				padding-bottom: 20px;
			}
			/* All looks better with padding*/
			#content {
				padding-top: 20px;
				padding-bottom: 20px;
			}
			iframe {
				width: 100%;
				height: 100%;
				border-style: solid;
				border-color: #ddd;
				border-width: 0 1px 1px 0;
			}
		</style>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script type="text/javascript">
		$(document).ready(function() {
			console.log("Ready!");
			
			/**
			 * Make the #content element fill the remaining horizontal space
			 * @param  {[type]} fudge [description]
			 * @return {[type]}       [description]
			 */
			function adjContentHeight (fudge) {
				if (typeof fudge == 'undefined') {
					fudge = 0;
				};
				var content = $('#content');

				var newheight = $(window).height() - content.offset().top - $('footer').height();
				newheight = newheight - parseInt(content.css('padding-top')) - parseInt(content.css('padding-bottom')) + fudge;
				content.height(newheight);
			}
			$(window).resize(function() {
				console.log("R");
				adjContentHeight(-5);
				
			}).resize();

		});
	</script>
	</head>

	<body>

		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#"><?= $title ?></a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<!-- <li class="active"><a href="#">Home</a></li> -->
						<li><a href="#about">About</a></li>
						<li><a href="#help">Help</a></li>
						<li><a href="#settings">Settings</a></li>
						<!-- <li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li class="dropdown-header">Nav header</li>
								<li><a href="#">Separated link</a></li>
								<li><a href="#">One more separated link</a></li>
							</ul>
						</li> -->
					</ul>
				</div><!--/.navbar-collapse -->
			</div>
		</div>

		<div class="container" id="content">
			<script>
			function blocklyLoaded(blockly) {
				// Called once Blockly is fully loaded.
				window.Blockly = blockly;
			}
			</script>
			<iframe src="frame.php" class="blockly"></iframe>

			<footer>
				<p><?= $title ?> - <a href="http://techwizworld.net">Techplex Labs</a> <script>document.write((new Date()).getFullYear());</script></p>
			</footer>
		</div> <!-- /container -->


		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	</body>
</html>
