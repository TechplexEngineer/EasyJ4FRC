SHELL = bash
EMPTY :=
SPACE := $(EMPTY) $(EMPTY)
COMMA := ,

APPDIRS = code graph maze plane puzzle turtle index
#frcjava

SOY_TEMPLATES = common.soy $(APPDIRS:=/template.soy)
SOY_SOURCES = $(subst $(SPACE),$(COMMA),$(SOY_TEMPLATES))

.PHONY: subdirs $(APPDIRS) json extracted_msgs.xlf

.PHONY: all
all: $(APPDIRS)

$(APPDIRS): json
	../i18n/json_to_js.py --output_dir=$(@)/generated --template common.soy,$(@)/template.soy json/*.json;

extracted_msgs.xlf:
	java -jar _soy/SoyMsgExtractor.jar --outputFile extracted_msgs.xlf --srcs $(SOY_SOURCES)

json: extracted_msgs.xlf
	../i18n/xliff_to_json.py --xlf extracted_msgs.xlf --templates $(SOY_TEMPLATES)
	