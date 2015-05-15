Installing the Dev Environment
==============================

# Prerequisites:
1. Webserver with PHP (Xampp on windows& max, Apache+PHP on Linux)
2. Cygwin [vim, python, git, git-completion, PHP, make, python, wget, unzip] on windows
3. Node.js and NPM (Javascript runtime for Bower)
4. Bower (front end package manager)
5. Python (to build Blockly)


# Recommended Sublime Packages:
1. MarkdownEditing
2. SidebarEnhancements

# Setting up & Building
1. `git@github.com:TechplexEngineer/EasyJ4FRC.git`
2. `cd blockly`
3. ` git clone git@github.com:google/blockly.git --depth 1 .` # download a local copy of blockly without downloading the entire history into the 'blockly' directory.
4. `cd ../closure-library`
5. `wget https://github.com/google/closure-library/archive/master.zip` 
6. `unzip master.zip`
7. `mv closure-library-master/* .`
8. `rmdir closure-library-master`
9. `rm master.zip`
10. `cd ../robotbuilder`
11. `bower install` #install frontend dependencies (bootstrap, font-awesome & jquery)
12. `cd ../build`
13. `./build.py` or `python build.py`
14. `cd ../robotbuilder`
15. make dist
