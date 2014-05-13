<?php
	$dev = file_exists("DEV");
	

	$toolbox = "xml/toolbox.xml";
	if (!file_exists($toolbox)) {
		die("<b>ERROR: </b>The '".$toolbox."' file is missing!");
		//@todo send an email to admin
	}
	$startingBlocks  = "xml/startingBlocks.xml";
	if (!file_exists($startingBlocks)) {
		die("<b>ERROR: </b>The '".$startingBlocks."' file is missing!");
		//@todo send an email to admin
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">

		<?php 
	    if ($dev): 
	    	$blocklyPath = "../../";
		?>
<!-- Include these in development mode ************************************* -->			
			<script type="text/javascript" src="../../blockly_uncompressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>generators/java.js"></script>
			<?php
				// Be sure to include all of the JS files
				$blockdir = "../../blocks";
				$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
				}
				$blockdir = "../../generators/java";
				$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
				}
			?>
			<script type="text/javascript" src="<?= $blocklyPath ?>msg/messages.js"></script>

		<?php 
		else: 
			$blocklyPath = "./";
		?>
<!-- Include these in production mode ************************************** -->
			<script type="text/javascript" src="<?= $blocklyPath ?>blockly_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>blocks_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>java_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>messages.js"></script>
  		<?php endif; ?>

<!-- Include these all of the time ***************************************** -->
		
	
		

		

		

		<?php
			// Be sure to include all of the JS files
			$blockdir = "./blocks";
			$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
			foreach ($jsfiles as $file) {
				 echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
			 }
		?>
		<style>
			html, body {
				background-color: #fff;
				margin: 0;
				padding: 0;
				overflow: hidden;
				height: 100%;
			}
			.blocklySvg {
				height: 100%;
				width: 100%;
			}
		</style>
		<script>
			function init() {
				Blockly.inject(document.body,
						{path: '<?= $blocklyPath ?>', toolbox: document.getElementById('toolbox')});
				// Let the top-level application know that Blockly is ready.
				window.parent.blocklyLoaded(Blockly);
				var startingBlocks = document.getElementById('startingblocks').innerHTML;
				var xml = Blockly.Xml.textToDom(startingBlocks);
				Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
			}
		</script>
	</head>
	<body onload="init()">

		<div class="xml" class="display:none;">
			<?php 
			include $toolbox; 
			?>
		<div id="startingblocks"  class="display:none;">
			<?php 
			include $startingBlocks;
			?>
		</div>
		</div>
	</body>
</html>