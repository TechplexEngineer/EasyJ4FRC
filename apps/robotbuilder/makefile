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

grandparent = msg/messages.js {java,blockly,blocks}_compressed.js
parent = prettify.{css,js} common.{css,js}
thisdir = {index,frame}.php {easyj,javagenerator,tabifier}.js style.css
recursdirs = ../../media modals images blocks xml

## END VARS
tocopy =  $(thisdir) $(addprefix ../,$(parent)) $(addprefix ../../,$(grandparent))


.phony: all setup copy

all:

setup:
	bower install

dist: compressed copy
	

copy:
	@$(MKDIR) -p $(OUTDIR)
	@$(CP) -R $(recursdirs) $(OUTDIR) 
	@$(CP) $(tocopy) $(OUTDIR)
	@$(CP) -R bower_components/bootstrap/dist/ $(OUTDIR)/bootstrap
	@$(CP) bower_components/jquery/jquery.min.js $(OUTDIR)

	@echo "Static files copied."

clean:
	$(RM) -rf ./$(OUTDIR)

compressed:
	$(CD) ../../; ./build.py
	@echo "Clojure Build Complete"