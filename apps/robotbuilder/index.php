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
			.btn-group {
				position: relative;
				display: inline-block;
				font-size: 0;
				vertical-align: middle;
				white-space: nowrap;
			}
		</style>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="../prettify.css">
  		<script type="text/javascript" src="../prettify.js"></script>
		<script src="bower_components/jquery/dist/jquery.min.js"></script>
		<script type="text/javascript" src="tabifier.js"></script>
		<script type="text/javascript" src="javagenerator.js"></script>
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
				adjContentHeight(-5);
				
			}).resize();

			// toggle button
			$('#blockcodetoggle').click(function(event){
				if ($(event.target).attr('id') == "code") {
					$('#blocklyworkspace').hide();
					$('#codeoutput').show();
				}
				else
				{
					$('#blocklyworkspace').show();
					$('#codeoutput').hide();
				}
			});
			//blocklyworkspace

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
					<a class="navbar-brand" href="#about" data-toggle="modal"><?= $title ?></a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">

						<!-- @NOTE: The .. after the name of the option is included when that option opens a new modal window.-->
						<li class="dropdown"> <!-- File menu -->
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">File <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<!-- <li><a href="#new" data-toggle="modal">New</a></li> --> <!--This will open a new workspace, is a modal needed? -->
								<li><a href="#save" data-toggle="modal">Save</a></li> <!-- @note if the project has already been saved, don't open the save modal on press of the save button. Just show success alert-->
								<!-- <li><a href="#save" data-toggle="modal">Save as..</a></li> -->
								<li><a href="#open" data-toggle="modal">Open..</a></li>
								<li><a href="#examples" data-toggle="modal">Examples..</a></li>
								<!-- <li class="divider"></li> -->
								<!-- <li><a href="#run" data-toggle="modal">Run..</a></li> -->
								<li class="divider"></li>
								<li><a href="#import" data-toggle="modal">Import..</a></li>
								<li><a href="#export" data-toggle="modal">Export..</a></li>
								<li class="divider"></li>
								<li><a href="#help" data-toggle="modal">Help..</a></li>
								<li><a href="#about" data-toggle="modal">About..</a></li>
							</ul>
						</li>

						<li class="dropdown"> <!-- Edit menu -->
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">Edit <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<!-- <li><a href="#">Undo</a></li> -->
								<!-- <li><a href="#">Redo</a></li> -->
								<!-- <li class="divider"></li> -->
								<!-- <li><a href="#">Copy</a></li> -->
								<!-- <li><a href="#">Cut</a></li> -->
								<!-- <li><a href="#">Paste</a></li> -->
								<!-- <li class="divider"></li> -->
								<li><a href="#settings" data-toggle="modal">Settings..</a></li>
							</ul>
						</li>

						<!-- <li class="active"><a href="#">Home</a></li> -->
						<!-- <li><a href="#about" data-toggle="modal">About</a></li> -->
						<!-- <li><a href="#help" data-toggle="modal">Help</a></li> -->
						<!-- <li><a href="#settings" data-toggle="modal">Settings</a></li> -->
						<li style="margin-top: 8px;">
							<div class="btn-group" data-toggle="buttons" id="blockcodetoggle">
								<label class="btn btn-primary active" title="Toggle to blocks view"  id="blocks">
									<input type="radio" name="options"> Blocks
								</label>
								<label class="btn btn-success" title="Toggle to code view" id="code">
									<input type="radio" name="options"> Code
								</label>
							</div>
						</li>
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
					<div class="pull-right" style="margin-top:5px;">
						
						<a href="#help" title="Help" data-toggle="modal">
							<img src="images/help.png" style="width: 30px;">
						</a>
						<a href="#save" title="Save" data-toggle="modal">
							<img src="images/save.png" style="width: 30px;">
						</a>
						<a href="#settings" title="Settings" data-toggle="modal">
							<img src="images/gear.png" style="width: 40px;">
						</a>
					</div>
				</div><!--/.navbar-collapse -->
			</div>
		</div>


		<div class="container" id="content">
			<script>
			function onchange() {
				// Blockly.Java.
				// Blockly.Java.init();
				var code = "";
				// "package org.usfirst.frcEasyJ.team5122;\n"; //@todo get this from settings
				// code += "import edu.wpi.first.wpilibj.IterativeRobot;\n";
				// code += Blockly.Java.getImports.join('\n');
				// code += "\n";
				// code += "public class "+"MyRobot"+" extends SimpleRobot {"; //@todo get MyRobot from settings
				var content = document.getElementById('languagePre');
				code += Blockly.Java.workspaceToCode();
				// code += "}";
				code = js_beautify(code);
				content.textContent = code;
				if (typeof prettyPrintOne == 'function') {
					code = content.innerHTML;
					code = prettyPrintOne(code, 'java');
					content.innerHTML = code;
				}

			}
			function blocklyLoaded(blockly) {
				// Called once Blockly is fully loaded.
				window.Blockly = blockly;
				Blockly.Java.workspaceToCode = JavaGenerator;
				
				Blockly.addChangeListener(onchange);
			}
			</script>
			<iframe id="blocklyworkspace" src="frame.php" class="blockly"></iframe>
			<div id="codeoutput" style="display:none;">
				<pre id="languagePre"></pre>
			</div>

			<footer>
				<p><?= $title ?> - <a href="http://techwizworld.net">Techplex Labs</a> <script>document.write((new Date()).getFullYear());</script></p>
			</footer>
		</div> <!-- /container -->
		<div class="hiddenmodals">
			<?php 
				$dir = "./modals";
				$jsfiles = array_diff(scandir($dir), array('..', '.'));
				foreach ($jsfiles as $file) {
					include $dir."/".$file;
					echo "\n";
				}
			?>
		</div>


		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	</body>
</html>
