#!/bin/bash

docker build . -t easyj

imagename="easyj"
name=$(mktemp -u "${imagename}-XXX")

containerId=$(docker run -dit \
	--workdir /src \
	-v "${PWD}":/src/EasyJ4FRC \
	--name "${name}" \
	easyj)


docker exec -it "${containerId}" make -C EasyJ4FRC closure compress allapps
docker exec -it "${containerId}" make -C EasyJ4FRC/apps/robotbuilder setup php

# for debugging
# docker exec -it "${containerId}" /bin/bash

docker stop "${containerId}"
docker rm "${containerId}"