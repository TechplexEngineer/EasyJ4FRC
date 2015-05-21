# Vars
generators = java python dart javascript

ROOT = ..

OUTDIR = out
EASYJ_COMPRESSED = EasyJ_compressed.js
BLOCKS_COMPRESSED = blocks_compressed.js

# Tools
CC = java -jar $(ROOT)/closure-compiler/compiler.jar
TRIM_LIC = ./trim_licence.py

# Make does not offer a recursive wildcard function, so here's one:
rwildcard=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))


BLOCKS_FILES := $(call rwildcard,$(ROOT)/blockly_ext/blocks,*.js)
GENERATORS_COMPRESSED = $(addprefix $(OUTDIR)/,$(addsuffix _compressed.js,$(generators)))

.PHONY: help
help:
	@echo -e "\nUSAGE:\n"
	@echo "make all			Do tasks for core, blocks, and generators"
	@echo "make clean		remove the $(OUTDIR) and its contents"
	@echo "make core		Compress the blockly core & EasyJ extensions"
	@echo "make blocks		Compress the EasyJ blocks"
	@echo "make generators	Compress the generators"
	@echo "make chelp		use less to view closure help"

.PHONY: all
all: core blocks generators

.PHONY: chelp
chelp:
	$(CC) --help | less

.PHONY: core
core: $(OUTDIR)/$(EASYJ_COMPRESSED)

$(OUTDIR):
	@mkdir -p $(OUTDIR)

$(OUTDIR)/$(EASYJ_COMPRESSED): $(ROOT)/blockly/core/*.js $(ROOT)/blockly_ext/core/*.js | $(OUTDIR)
	@echo Building $@
	@$(CC) \
	  --closure_entry_point EasyJ \
	  --manage_closure_dependencies true \
	  --compilation_level SIMPLE \
	  --js $(ROOT)/blockly/core/ \
	  --js $(ROOT)/blockly_ext/core/ \
	  --js $(ROOT)/closure-library/closure/goog/ \
	  --js $(ROOT)/closure-library/third_party/ \
	  --js_output_file $@

	@cat $@ | $(TRIM_LIC) > $@

.PHONY: blocks
blocks: $(OUTDIR)/$(BLOCKS_COMPRESSED)

$(OUTDIR)/$(BLOCKS_COMPRESSED): $(BLOCKS_FILES) | $(OUTDIR)
	@echo Building $@
	@$(CC) \
	  --compilation_level SIMPLE \
	  --js shim/blocks.js \
	  --js $(ROOT)/blockly_ext/blocks/ \
	  --js_output_file $@
	@cat $@ | $(TRIM_LIC) > $@
	@sed -i 's/var Blockly={Blocks:{}};//g' $@

.PHONY: generators
generators: $(GENERATORS_COMPRESSED)

$(GENERATORS_COMPRESSED): | $(OUTDIR)
	@echo Building $(@:out/%_compressed.js=%)

	@if [ -e $(ROOT)/blockly/generators/$(@:out/%_compressed.js=%).js ]; then \
		$(CC) \
		  --compilation_level SIMPLE \
		  --js shim/generator.js \
		  --js $(ROOT)/blockly/generators/$(@:out/%_compressed.js=%).js \
		  --js $(ROOT)/blockly/generators/$(@:out/%_compressed.js=%)/ \
		  --js_output_file $@; \
	else \
		$(CC) \
		  --compilation_level SIMPLE \
		  --js shim/generator.js \
		  --js $(ROOT)/blockly_ext/generators/$(@:out/%_compressed.js=%).js \
		  --js $(ROOT)/blockly_ext/generators/$(@:out/%_compressed.js=%)/ \
		  --js_output_file $@; \
	fi
	@cat $@ | $(TRIM_LIC) > $@
	@sed -i 's/var Blockly={Generator:{}};//g' $@

.PHONY: langfiles
langfiles: $(GENERATORS_COMPRESSED)

$(GENERATORS_COMPRESSED): | $(OUTDIR)

.PHONY: clean
clean:
	rm -rf $(OUTDIR)