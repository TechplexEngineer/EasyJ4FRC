
.phony: all compress apps

all: compress apps

compress:
	./build.py

apps:
	$(MAKE) -C ./apps