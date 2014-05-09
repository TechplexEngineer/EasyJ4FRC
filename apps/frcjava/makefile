#CMDS
CP = cp
CD = cd
SHELL = bash
MKDIR = mkdir

#VARS
OUTDIR = dist

.phony: all dist compressed copystatic

all:
	@echo "Type:  'make dist'"

dist: compressed copystatic
	
copystatic:
	@$(MKDIR) -p $(OUTDIR)
	#@$(CP) index.html $(OUTDIR)
	@$(CP) ../../msg/messages.js $(OUTDIR)
	@$(CP) ../../{java,blockly,blocks}_compressed.js $(OUTDIR)
	@$(CP) -R ../../media $(OUTDIR)
	@$(CP) ../prettify.{css,js} $(OUTDIR)
	@$(CP) ./{blocks,factory}.js style.css $(OUTDIR)

	@echo "Static files copied."
	@echo "--Remember to change the includes in index.html!--"

compressed:
	$(CD) ../../; ./build.py