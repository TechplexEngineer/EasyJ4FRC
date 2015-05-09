#
# If you don't have bower get it from bower.io

#CMDS
CP = cp
CD = cd
RM = rm
SHELL = bash
MKDIR = mkdir

#VARS
OUTDIR = dist


search_this_dir  = {easyj,javagenerator,easyj_checker}.js style.css {index,frame}.php
search_build_dir = msg/js/en.js {java,blockly,blocks}_compressed.js
search_recurse_dirs = ../blockly/media modals images xml RobotTemplate libs

## END VARS
tocopy =  $(search_this_dir)
tocopy += $(addprefix ../build/,$(search_build_dir))

.phony: all setup copy

all:
	@echo "make setup		uses bower to install required packages"
	@echo "make dist		creates the dist directory & required files"
	@echo "make static 		same as dist, but does not rebuild blockly core"
	@echo "make deploy 		Send current dist directory to remote"
	@echo "make closure		Download closure archive and unzip it"

clean:
	$(RM) -rf ./$(OUTDIR)

setup:
	bower install

dist: | compressed copy

static: copy

copy:
	@$(MKDIR) -p $(OUTDIR)/{,bootstrap,font-awesome}
	@$(CP) -R $(search_recurse_dirs) $(OUTDIR)
	@$(CP) $(tocopy) $(OUTDIR)
	@$(CP) -R bower_components/bootstrap/dist/{js,css} $(OUTDIR)/bootstrap
	@$(CP) -R bower_components/font-awesome/{css,fonts} $(OUTDIR)/font-awesome
	@$(CP) bower_components/jquery/dist/jquery.min.js $(OUTDIR)

	@echo "Static files copied."

compressed:
	$(CD) ../build/; ./build.py
	@echo "Closure Build Complete"

deploy:
	rsync -r --delete dist/* techplex@blake.metheus.org:/var/www/team5122/easyj

closure:
	@$(CD) ../../../; wget https://closure-library.googlecode.com/files/closure-library-20130212-95c19e7f0f5f.zip
	@$(CD) ../../../; unzip closure-library-20130212-95c19e7f0f5f.zip -d closure-library-read-only




