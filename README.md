EasyJ4FRC
=========

Easily program your FRC robot with the block programming tool Blockly

My goal is to allow FRC Rookies and new programmers to get their feet wet with some Java code using the WPI Robotics Library.

## Demo
A recent build of the EasyJ4FRC environment is available here:   
[EasyJ4FRC Demo](http://easyj.team5122.com/)

## Credits
EasyJ4FRC is based on [Google Blockly](http://code.google.com/p/blockly/).   
[Blockly Demo](https://blockly-demo.appspot.com/static/apps/index.html)
### Todos
- [ ] Custom input checkers (ie: Joystick button valid values are 1-12)
- [x] Change the root block to be two function blocks teleop & auto
- [x] Loadable Demos
- [x] Help Pages
- [x] About page
- [x] Settings Page
  - Alter package
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
  - Pneumatics
    - Compressor
    - Solenoids
    - Pressure switch?
  - Digital Output
  - Relay
  - Encoder
  - I2C
  - PID
  - Servo
  - Iterative Robot [x]
  - Ultrasonic
  - Watchdog?
- [ ] Make types more like Java types (double, float, int, long ...)
- [ ] Save/Load
  - Google Drive?
  - Gist?
  - To file?
  - Could we dump out a netbeans project?
- [ ] make a desktop version 
- [x] make a cool logo
- [ ] handle variable rename
- [ ] hide blocks until variable exists
- [ ] set warning on orphanned blocks
- [ ] change "Declare" to "Create"
- [ ] Change {motor controller,drivetrain} {speed,turn} inputs to be -100 to 100 %
- [ ] Add more examples
- [ ] add tool tips for blocks
- [ ] add help url for blocks
