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
		$easyj_checker = '<script type="text/javascript" src="easyj_checker.js"></script>';
	    if ($dev):
	    	$blocklyPath = "../blockly/";
		?>
<!-- Include these in development mode ************************************* -->
			<script src="bower_components/jquery/dist/jquery.min.js"></script>
			<script type="text/javascript" src="../build/blockly_uncompressed.js"></script>
			<?php echo $easyj_checker; // must be before blocks. Otherwise EasyJ not defined. ?>
			<script type="text/javascript" src="../blockly_ext/generators/java.js"></script>
			<?php
				// Be sure to include all of the standard block definitions
				$blockdir = "../blockly_ext/blocks/blockly";
				$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
				}
				// Be sure to include all of the standard java block definitions & generators
				$blockdir = "../blockly_ext/generators/java";
				$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
				}
				// Be sure to include all of the EasyJ blocks
				$blockdir = "../blockly_ext/blocks/local";
				$jsfiles = array_diff(scandir($blockdir), array('..', '.'));
				foreach ($jsfiles as $file) {
					echo "<script type=\"text/javascript\" src=\"".$blockdir."/".$file."\"></script>\n";
				}
			?>
			<script type="text/javascript" src="../build/msg/js/en.js"></script>


		<?php
		else:
			$blocklyPath = "./build";
		?>
<!-- Include these in production mode ************************************** -->
			<script src="jquery.min.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>blockly_compressed.js"></script>
			<?php echo $easyj_checker; // must be before blocks. Otherwise EasyJ not defined. ?>
			<script type="text/javascript" src="<?= $blocklyPath ?>blocks_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>java_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>easyj_blocks_compressed.js"></script>
			<script type="text/javascript" src="<?= $blocklyPath ?>en.js"></script>
  		<?php endif; ?>

<!-- Include these all of the time ***************************************** -->


		<!-- BLOCKLY Extensions -->
		<script type="text/javascript" src="javagenerator.js"></script>

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
			/* really shouldn't need this! */
			span[type="expand"]{
				display:none !important;
			}
		</style>
		<script>
			function init() {
				Blockly.inject(document.body, {
					path: '<?= $blocklyPath ?>',
					toolbox: document.getElementById('toolbox')
				});
				// Let the top-level application know that Blockly is ready.
				if (window.parent && window.parent.blocklyLoaded) {
					window.parent.blocklyLoaded(Blockly);
				}
				$(document).trigger("blocklyLoaded");
				// console.log(Blockly);

				Blockly.mainWorkspace.reset = function() {
					// Remove all blocks
					Blockly.mainWorkspace.clear();
					//Load the starting blocks
					var startingBlocks = document.getElementById('startingblocks').innerHTML;
					var xml = Blockly.Xml.textToDom(startingBlocks);
					Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
				}

				Blockly.mainWorkspace.reset();
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