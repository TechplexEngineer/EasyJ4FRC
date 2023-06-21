
.phony: all compress

all: compress apps

compress:
	./build.py

.phony: allapps
allapps:
	$(MAKE) -C ./apps

.phony: closure
closure:
	cd ..; wget https://github.com/google/closure-library/archive/refs/tags/v20160315.zip
	cd ..; unzip -q v20160315.zip
	cd ..; rm v20160315.zip
	cd ..; mv closure-library-20160315 closure-library-read-only
