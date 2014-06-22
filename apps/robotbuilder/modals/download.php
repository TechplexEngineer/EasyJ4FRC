<!-- Modal -->
<div class="modal fade" id="download" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Download code as a Netbeans Project</h4>
			</div>
			<div class="modal-body">
        <p>Ready to try your code on your robot? </p>
        <p>This tool allows you to download your code as a zip file. Once you extract the contents of the zip file, Netbeans can open the project inside.</p>
				<label for="download_filename">Filename:</label>
				<div class="input-group">
					<input id="download_filename" type="text" class="form-control" value="download">
					<span class="input-group-addon">.zip</span>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" class="btn btn-primary" id="downloadbtn">Download!</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
<?php 

	$files =  `find ./RobotTemplate -name \* -type f`; // find all files in the specified directory recursively 
	$files = explode("\n", $files);

	array_pop($files); //remove last element of array
	foreach ($files as $key => $value) {
		$files[$key] = "\"".$value."\"";
	}

	// Inject the array so javascript can use it!
	echo "<script type=\"text/javascript\">";
	echo "var files = [";
	echo implode(",", $files);
	echo "]";
	echo "</script>";
?>

<script type="text/javascript" src="zip/jszip.js"></script>
<script type="text/javascript" src="zip/jszip-utils.js"></script>
<script type="text/javascript" src="zip/FileSaver.js"></script>

<script type="text/javascript"> 

var manifest = {

	template: "MIDlet-Name: {{name}}\nMIDlet-Version: 1.0.0\nMIDlet-Vendor: FIRST\nMIDlet-1: {{name}}, , {{package}}\nMicroEdition-Profile: IMP-1.0\nMicroEdition-Configuration: CLDC-1.1",
	url: "resources/META-INF/MANIFEST.MF"
};

// name = RobotTemplate
// package = edu.wpi.first.wpilibj.templates.RobotTemplate

</script>

<script type="text/javascript">
	$(document).ready(function () {

		$(document).on('show.bs.modal', function(event){
			if ($(event.target).attr('id') == 'download') {
				//Put the most recent robot class in the filename
				//@todo cache their filename
				$('#download_filename').val(EasyJ.robotClass);
				
			}
		});
		
	/**
	 * Fetch the content, add it to the JSZip object
	 * and use a jQuery deferred to hold the result.
	 * @param {String} url the url of the content to fetch.
	 * @param {String} filename the filename to use in the JSZip object.
	 * @param {JSZip} zip the JSZip instance.
	 * @return {jQuery.Deferred} the deferred containing the data.
	 */
	function deferredAddZip(url, filename, zip) {
		var deferred = $.Deferred();
		JSZipUtils.getBinaryContent(url, function (err, data) {
			if(err) {
				deferred.reject(err);
			} else {
				console.log("filename",filename);
				zip.file(filename, data, {binary:true});
				deferred.resolve(data);
			}
		});
		return deferred;
	}

	if(!JSZip.support.blob) {
		alert("This demo works only with a recent browser !");
		return;
	}

	$("#downloadbtn").on("click", function () {


		var zip = new JSZip();
		var deferreds = [];
		
		for (var i = 0; i < files.length; i++) {
			var url = files[i];
			var filename = url.replace(/^\.?\/?[^\/]+\//,""); //just remove the first segment
			deferreds.push(deferredAddZip(url, filename, zip));
		};
		// Add blockly blocks
		zip.file("blocks.xml", Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)));
		// Add manifest

		var manifestbody = manifest.template;
		manifestbody = manifestbody.replace(/\{\{name\}\}/g, EasyJ.robotClass); //Easyj.robotClass
		manifestbody = manifestbody.replace(/\{\{package\}\}/g, EasyJ.projectPackage);
		zip.file(manifest.url, manifestbody);

		zip.file("src/"+EasyJ.projectPackage.replace(/\./g, "/")+"/"+EasyJ.robotClass+".java", generateJavaCode());

		

		// when everything has been downloaded, we can trigger the dl
		$.when.apply($, deferreds).done(function () {
			var blob = zip.generate({type:"blob"});

			// see FileSaver.js
			saveAs(blob, $('#download_filename').val()+".zip");
			$('#download').modal('hide');

		}).fail(function (err) {
			//@todo make this use a bootstrap alert
			alert(err);
		});
		return false;
	});
	})
</script>