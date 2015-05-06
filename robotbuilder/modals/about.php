<!-- Modal -->
<div class="modal fade" id="about" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">About <?=$title?></h4>
      </div>
      <div class="modal-body">
        <img src="images/easyj4frc.png" alt="EasyJ Logo" style="float:right; width:400px">
        <p>EasyJ is a new way to program FRC Robots using draggable snappable blocks.</p>
        <p>The goal is to lessen the learning curve for FRC Rookies and new programmers when using the WPI Robotics Library on an FRC Robot.</p>
				
       	<p>Check out the <a href="https://github.com/TechplexEngineer/EasyJ4FRC" target="_blank">source on Github</a>.</p>
        
        <br>
        <p> <a href="#about" class="stealthlink" data-toggle="modal"><?= $title ?></a> - <a href="http://techwizworld.net">Techplex Labs -- Blake Bourque</a> <?php echo date("Y"); ?></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>