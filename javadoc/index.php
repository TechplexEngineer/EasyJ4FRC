<?php
function scandir_folders($d, $blacklist = array('.', '..')) {
	return array_filter(scandir($d), function ($f) use($d, $blacklist) {
		return is_dir($d . DIRECTORY_SEPARATOR . $f) && !in_array($f, $blacklist);
	});
}

$title="WPILibJ Documentation Versions";
?>

<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $title; ?></title>
		<style>
			body {
				font-family: Verdana, Geneva, sans-serif;
			}
		</style>
	</head>
	<body>

		<h1><?php echo $title; ?></h1>

		<ul>
		<?php
		foreach (scandir_folders('./') as $folder) {
			echo "\t<li><a href=\"".$folder."\">Javadoc ".strtoupper($folder)."</a></li>";
		}
		?>
		</ul>
		<a href="http://first.wpi.edu/FRC/roborio/release/docs/">WPI Docs</a>

	</body>
</html>