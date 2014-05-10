<?php 
  $toolbox = "toolbox.xml";
  if (!file_exists($toolbox)) {
    die("<b>ERROR: </b>The '".$toolbox."' file is missing!");
    //@todo send an email to Blake
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="target-densitydpi=device-dpi, height=660, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>EasyJ 4 FRC</title>
  

  <?php 
    $dev = file_exists("DEV");
    if ($dev): 
      $blocklyPath = "../../";
      $appsPath = "../";
  ?>
  <script>var BLOCKLYPATH = "../../";</script>
  <!-- Include these in development mode -->
  <script type="text/javascript" src="../../blockly_uncompressed.js"></script>

  <script type="text/javascript" src="../../blocks/logic.js"></script>
  <script type="text/javascript" src="../../blocks/loops.js"></script>
  <script type="text/javascript" src="../../blocks/math.js"></script>
  <script type="text/javascript" src="../../blocks/text.js"></script>
  <script type="text/javascript" src="../../blocks/lists.js"></script>
  <script type="text/javascript" src="../../blocks/colour.js"></script>
  <script type="text/javascript" src="../../blocks/variables.js"></script>
  <script type="text/javascript" src="../../blocks/procedures.js"></script>

  <script type="text/javascript" src="../../generators/java.js"></script>
  <script type="text/javascript" src="../../generators/java/logic.js"></script>
  <script type="text/javascript" src="../../generators/java/loops.js"></script>
  <script type="text/javascript" src="../../generators/java/math.js"></script>
  <script type="text/javascript" src="../../generators/java/text.js"></script>

  <script type="text/javascript" src="<?php echo $blocklyPath; ?>msg/messages.js"></script>

  <?php 
    else: 
      $blocklyPath = $appsPath = ""
  ?>
  <script>var BLOCKLYPATH = "";</script>
  <!-- Include these in production mode -->
  <script type="text/javascript" src="blockly_compressed.js"></script>
  <script type="text/javascript" src="blocks_compressed.js"></script>
  <script type="text/javascript" src="java_compressed.js"></script>

  <script type="text/javascript" src="<?php echo $blocklyPath; ?>messages.js"></script>

  <?php endif; ?>
  <!-- Include these all of the time -->
  <script type="text/javascript" src="factory.js"></script>
  
  <script type="text/javascript" src="blocks.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="<?php echo $appsPath; ?>prettify.css">
  <script type="text/javascript" src="<?php echo $appsPath; ?>prettify.js"></script>
  
</head>
<body>
  <a href="https://github.com/TechplexEngineer/EasyJ4FRC" target="_blank">
    <img style="position: absolute; top: 0; right: 0; border: 0; width: 149px; height: 149px; z-index:9;" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-cerulean@2x.png" alt="Fork me on GitHub"></a>
  <table>
    <tr>
      <td width="50%" height="5%">
        <h1>EasyJ 4 FRC</h1>
      </td>
      <td width="50%" height="5%" style="vertical-align: bottom;">
        <h3>Language code:</h3>
      </td>
    </tr>
    <tr>
      <td width="50%" height="95%" style="padding: 2px;">
        <div id="blockly"></div>
      </td>
      <td width="50%" height="95%">
        <pre id="languagePre" class="prettyprint"></pre>
      </td>
    </tr>
  </table>
  <?php 
  include $toolbox 
  ?>
  <div id="dialogShadow" class="dialogAnimate"></div>
  <div id="dialogBorder"></div>
  <div id="dialog"></div>
  <div id="dialogCode" class="dialogHiddenContent">
    <pre id="containerCode"></pre>
    <div class="farSide" style="padding: 1ex 3ex 0">
      <button class="secondary" onclick="BlocklyApps.hideDialog(true)">
        OK
      </button>
    </div>
  </div>

</body>
</html>
