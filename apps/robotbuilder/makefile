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

grandparent = msg/js/en.js {java,blockly,blocks}_compressed.js
parent = prettify.{css,js}
thisdir =  {easyj,javagenerator,tabifier}.js style.css {index,frame}.php
recursdirs = ../../media modals images xml

## END VARS
tocopy =  $(thisdir) $(addprefix ../,$(parent)) $(addprefix ../../,$(grandparent))


.phony: all setup copy easyj_blocks

all:
	@echo "make setup		uses bower to install required packages"
	@echo "make dist 		creates the dist directory & required files"

clean:
	$(RM) -rf ./$(OUTDIR)

setup:
	bower install

dist: | compressed copy easyj_blocks
	
static: copy easyj_blocks

copy:
	@$(MKDIR) -p $(OUTDIR)
	@$(MKDIR) -p $(OUTDIR)/bootstrap
	@$(CP) -R $(recursdirs) $(OUTDIR) 
	@$(CP) $(tocopy) $(OUTDIR)
	@$(CP) -R bower_components/bootstrap/dist/{js,css} $(OUTDIR)/bootstrap
	@$(CP) bower_components/jquery/dist/jquery.min.js $(OUTDIR)

	@echo "Static files copied."



compressed:
	$(CD) ../../; ./build.py
	@echo "Closure Build Complete"

easyj_blocks:
	./build.py