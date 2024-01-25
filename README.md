EasyJ4FRC
=========

Easily program your FRC robot with the block programming tool Blockly

My goal is to allow FRC Rookies and new programmers to get their feet wet with some Java code using the WPI Robotics Library.

## Demo
A recent build of the EasyJ4FRC environment is available here:   
[EasyJ4FRC Demo]([http://easyj.team5122.com/](https://techplexengineer.github.io/EasyJ4FRC/EasyJ4FRC/apps/robotbuilder/))


## Prerequisites
You'll need:
- Python 2.7+ (but not Python3)
- Webserver with PHP

## Building & Hacking

1. Create a directory to work in I'll call mine `working`
2. Download a copy of [EasyJ4FRC](https://github.com/TechplexEngineer/EasyJ4FRC/archive/master.zip) and 
3. unzip it into a folder within `working`, I'll call mine `EasyJ4FRC`
3. Download a copy of the [Closure library](https://github.com/google/closure-library/archive/master.zip)
4. unzip `master.zip` it into a folder in `working`, it must be called `closure-library-read-only`
4. Go into the `EasyJ4FRC` folder and try running the build script(build.py) now. This will generate the conpressed version of Blockly.
5. Make the `working` folder web accessible. Apache if you are on linux, or XAMPP otherwhise. You'll need PHP
5. Now using your web server, open `apps/robotbuilder/index.php` and begin hacking!

Note: I have only tested these instructions on Linux.

## Credits
EasyJ4FRC is based on [Google Blockly](http://code.google.com/p/blockly/).   
[Blockly Demo](https://blockly-demo.appspot.com/static/apps/index.html)
### Todos
- [x] Custom input checkers (ie: Joystick button valid values are 1-12) [EasyJ.Checker.\*]
- [x] Change the root block to be two function blocks teleop & auto
- [x] Loadable Demos
- [x] Help Pages
- [x] About page
- [ ] Settings Page
  - Alter package [x]
  - Alter Robot Class [x]
  - Ensure entered package and class are valid
- [ ] Command Base
  - multiple class tabs
  - add new subsystems
  - add new commands
- [x] Easier deploys (update toolbox, update path) (rsync in make)
- [x] Fix digital & analog 'Get' blocks
- [ ] Test, Test, Test - Make sure the blocks generate good code
- [ ] Add more blocks
  - Gyro [x]
  - Variables
  - Lists
  - Subroutines
  - Accelerometer
  - Smart Dashboard
  - Pneumatics [x]
    - Compressor [x]
    - Solenoids [x]
    - Pressure switch (part of compressor object)
  - Digital Output [x]
  - Relay [x]
  - Encoder
  - I2C
  - PID
  - Servo
  - Iterative Robot [x]
  - Ultrasonic
  - Watchdog?
- [ ] Make types more like Java types (double, float, int, long ...)
- [x] Save/Load (localstorage)
  - Google Drive?
  - Gist?
  - To file?
- [x] Could we dump out a netbeans project?
- [ ] make a desktop version
- [x] make a cool logo
- [x] handle variable rename
- [x] hide blocks until variable exists (disable instead of hide)
- [x] set warning on orphanned blocks
- [ ] change "Declare" to "Create"
- [ ] Add more examples
- [ ] add tool tips for blocks
- [ ] add help url for blocks
- [ ] remove old logic checking value blocks
- [x] ensure blockly default blocks have the next and previous statment type properly specified
- [ ] Setup warning on non-init blocks
- [ ] Once the declare block has been used the modifier blocks are enabled. THe problem is the modifier blocks have a new variable option. Actually It probably shouldn't exist on any of the modifier blocks. We need a way to make sure that the modifier blocks are set to one of the variables which exists because of a decleare block. One possible solution is to have value ports and create blocks in the menu for each variable.
- [ ] need a test procedure for the code
- [ ] It would be nice to handle port assiginments better, so that the same port can not be multiply selected
- [ ] Should the robot drive block which creates 4 motor controller objects add the MC objects to the variable dropdown so that they can be independently accessed?
- [x] remove the compresor block
- [x] make all of the declare blocks the same color so that it is more obvious where they go.
- [ ] Add a description to the save system
- [ ] allow fields to have their own tool tips





