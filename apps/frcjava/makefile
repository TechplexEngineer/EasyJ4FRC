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
thisdir = index.php {blocks,factory}.js style.css toolbox.xml icons.png dialog.js

## END VARS
tocopy =  $(thisdir) $(addprefix ../,$(parent)) $(addprefix ../../,$(grandparent))

.phony: all dist compressed copy

all:
	@echo "Type:  'make dist'"

dist: compressed copy
	

copy:
	@$(MKDIR) -p $(OUTDIR)
	@$(CP) -R ../../media dialogs $(OUTDIR) 
	@$(CP) $(tocopy) $(OUTDIR)

	@echo "Static files copied."

clean:
	$(RM) -rf ./$(OUTDIR)

compressed:
	$(CD) ../../; ./build.py
	@echo "Clojure Build Complete"
