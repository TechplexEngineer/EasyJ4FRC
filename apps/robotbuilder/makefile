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
thisdir =  {easyj,javagenerator,tabifier}.js style.css {index,frame}.php easyj.checker.js
recursdirs = ../../media modals images xml zip RobotTemplate

## END VARS
tocopy =  $(thisdir) $(addprefix ../,$(parent)) $(addprefix ../../,$(grandparent))


.phony: all setup copy easyj_blocks 

all:
	@echo "make setup		uses bower to install required packages"
	@echo "make dist		creates the dist directory & required files"
	@echo "make static 		same as dist, but does not rebuild blockly core"
	@echo "make deploy 		Send current dist directory to remote"
	@echo "make deploy-dev 	Send current dist directory to remote dev directory"
	@echo "make closure		Download closure archive and unzip it"

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

deploy:
	rsync -r --delete dist/* techplex@blake.metheus.org:/var/www/team5122/easyj

deploy-dev:
	rsync -r --delete dist/* techplex@blake.metheus.org:/var/www/team5122/easyj/dev

closure:
	@$(CD) ../../../; wget https://closure-library.googlecode.com/files/closure-library-20130212-95c19e7f0f5f.zip
	@$(CD) ../../../; unzip closure-library-20130212-95c19e7f0f5f.zip -d closure-library-read-only




