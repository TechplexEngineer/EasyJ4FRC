<?php 
$title = "EasyJ Robot Builder";
$dev = file_exists("DEV");
date_default_timezone_set("America/New_York");

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="images/team5122_200x200.ico" type="image/x-icon">
		<link rel="icon" href="images/team5122_200x200.ico" type="image/x-icon">


		<title><?= $title ?></title>

		<?php 
		if ($dev):
		?>
<!-- Include these in development mode ************************************* -->
			<!-- Bootstrap core CSS -->
			<script src="bower_components/jquery/dist/jquery.min.js"></script>

			<link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
			<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

			<link rel="stylesheet" type="text/css" href="../prettify.css">
			<script type="text/javascript" src="../prettify.js"></script>


		<?php
		else:
		?>
<!-- Include these in production mode ************************************** -->
			<!-- Bootstrap core CSS -->
			<script src="jquery.min.js"></script>

			<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
			<script src="bootstrap/js/bootstrap.min.js"></script>

			<link rel="stylesheet" type="text/css" href="prettify.css">
			<script type="text/javascript" src="prettify.js"></script>

			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

				ga('create', 'UA-50251610-2', 'team5122.com');
				ga('require', 'displayfeatures');
				ga('require', 'linkid', 'linkid.js');
				ga('send', 'pageview');

			</script>

		<?php endif; ?>

<!-- Include these all of the time ***************************************** -->

		<!-- Custom styles for this template -->
		<link rel="stylesheet" type="text/css" href="style.css">

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<script type="text/javascript" src="tabifier.js"></script>

		<script type="text/javascript" src="easyj.js"></script>
		<script type="text/javascript">
		$(document).ready(function() {

			/**
			 * Make the #content element fill the remaining horizontal space
			 * @param  {int} fudge fudge factor
			 */
			function adjContentHeight (fudge) {

				if (typeof fudge == 'undefined') {
					fudge = 0;
				};
				var content = $('#content');
				// content.height(500); //This seems to fix a resize glitch
				var newheight = $(window).height() - content.offset().top - $('footer').height();
				newheight = newheight - parseInt(content.css('padding-top')) - parseInt(content.css('padding-bottom')) + fudge;
				content.height(newheight);
				$('#blocklyworkspace').height(0).height("100%"); //This seems to fix a resize glitch
			}
			$(window).resize(function() {
				adjContentHeight(-5);

			}).resize();

			// toggle between blocks and code
			$('#blockcodetoggle').click(function(event) {
				if ($(event.target).attr('id') == "code") {

          var code = generateJavaCode();
          var content = document.getElementById('languagePre');
          content.textContent = code;
          if (typeof prettyPrintOne == 'function') {
            code = content.innerHTML;
            code = prettyPrintOne(code, 'java');
            content.innerHTML = code;
          }

					$('#blocklyworkspace').hide();
					$('#codeoutput').show();
				}
				else
				{
					$('#blocklyworkspace').show();
					$('#codeoutput').hide();
				}
			});

			// Handle the Clear option in the edit menu
			$('#edit_clear').click(function(event) {
				event.preventDefault();
				if (window.confirm("Do you really want to clear the workspace?\nAll work will be lost!")) {
					Blockly.mainWorkspace.reset();
				}
			});

		});
	</script>
	<script type="text/javascript">
		window.heap=window.heap||[],heap.load=function(t,e){window.heap.appid=t,window.heap.config=e;var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.heapanalytics.com/js/heap.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(t){return function(){heap.push([t].concat(Array.prototype.slice.call(arguments,0)))}},p=["clearEventProperties","identify","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
		heap.load("2252334319");
	</script>
	</head>

	<body>
		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#about" data-toggle="modal">
						<img src="images/easyj4frc.png" alt="<?= $title ?>" height="40px" style="margin-top: -10px;">
					</a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">

						<!-- @NOTE: The .. after the name of the option is included when that option opens a new modal window.-->
						<li class="dropdown"> <!-- File menu -->
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">File <b class="caret"></b></a>
							<ul class="dropdown-menu">
								<!-- <li><a href="#new" data-toggle="modal">New</a></li> --> <!--This will open a new workspace, is a modal needed? -->
								<li><a href="#save" data-toggle="modal">Save</a></li> <!-- @note if the project has already been saved, don't open the save modal on press of the save button. Just show success alert-->
								<li><a href="#download" data-toggle="modal">Download..</a></li>
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
								<li><a href="#" id="edit_clear">Reset &amp; Clear</a></li>
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
					<div class="pull-right" style="margin-top:8px;">

						<a href="http://www.team5122.com/easyj-feedback.html" class="notext iconbar" title="EasyJ Bug Report" target="_blank">
							<img src="images/icons/issue.png" style="height: 31px; margin-top:-35px;">
							<?php //include "images/icons/bugs.svg" ?>
						</a>
						<a href="#help" class="notext iconbar" title="Help" data-toggle="modal">
							<!-- <img src="images/icons/iconmonstr-help-3-icon-256.png" style="height: 35px;"> -->
							<?php include "images/icons/help.svg" ?>
						</a>
						<a href="http://files.team5122.com/javadoc/" class="notext iconbar" title="WPI Robotics Library Documentation" target="_blank">
							<!-- <img src="images/icons/iconmonstr-book-16-icon-256.png" style="height: 35px;"> -->
							<?php include "images/icons/book.svg" ?>
						</a>
						<a href="#save" class="notext iconbar" title="Save" data-toggle="modal">
							<!-- <img src="images/icons/iconmonstr-save-icon-256.png" style="height: 35px;"> -->
							<?php include "images/icons/save.svg" ?>
						</a>
						<a href="#download" class="notext iconbar" title="Download" data-toggle="modal">
							<!-- <img src="images/icons/iconmonstr-download-2-icon-256.png" style="height: 35px;"> -->
							<?php include "images/icons/download.svg" ?>
						</a>
						<a href="http://team5122.com" class="notext iconbar" title="Team5122 Homepage" target="_blank">
							<!-- <img src="images/icons/iconmonstr-home-4-icon-256.png" style="height: 35px;"> -->
							<?php include "images/icons/home.svg" ?>
						</a>
					</div>
				</div><!--/.navbar-collapse -->
			</div>
		</div>


		<div class="container-fluid" id="content">
			<script>
			var loadxml = function(xml) {
				console.log("Sorry. Blockly isn't loaded yet. Try again soon."); //@todo this really should be an alert or modal.
			}
			function generateJavaCode() {
				var generated = Blockly.Java.workspaceToCode();

				var code = "package "+EasyJ.projectPackage+";\n\n";
				code += "import edu.wpi.first.wpilibj.IterativeRobot;"
				code += Blockly.Java.getImports().join("\n");
				code += "\n\npublic class "+EasyJ.robotClass+" extends IterativeRobot {\n";
				code += "\n";
				code += generated.declarations;
				code += "\n";
				code += generated.code;
				code += "}";

				code = js_beautify(code);

				return code;
			}
			function onchange() {

			}
			function blocklyLoaded(blockly) {
				// Called once Blockly is fully loaded.
				window.Blockly = blockly;
				$(window).resize();

				Blockly.addChangeListener(onchange);

				loadxml = function(xml) {
					if (typeof xml != "string" || xml.length < 5) {
						alert("No Input");
						return false;
						return;
					}
					try {
						var dom = Blockly.Xml.textToDom(xml);
						Blockly.mainWorkspace.clear();
						Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
						return true;
					} catch (e) {
						alert("Invalid xml");
						return false;
					}
				}
			}
			</script>
			<iframe id="blocklyworkspace" src="frame.php" class="blockly"></iframe>
			<div id="codeoutput" style="display:none;">
				<pre id="languagePre"></pre>
			</div>

			<footer>
				<p>
					<a href="#about" class="stealthlink" data-toggle="modal"><?= $title ?></a> - 
					<a href="http://techwizworld.net" target="_blank">Techplex Labs </a>
					-- Blake Bourque - John Grindle - <?php echo date("Y"); ?></p>
			</footer>
		</div> <!-- /container -->
		<div class="hiddenmodals">
			<?php 
				$dir = "./modals";
				$jsfiles = array_diff(scandir($dir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "\n\n<!-- ".$file."-->\n\n";
					include $dir."/".$file;
					echo "\n";
				}
			?>
		</div>


		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script type="text/javascript">
		$(document).ready(function(){
			$(window).resize();
		});
		</script>
		
	</body>
</html>
