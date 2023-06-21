#!/bin/bash

set -euo pipefail

docker build . -t easyj

imagename="easyj"
name=$(mktemp -u "${imagename}-XXX")

containerId=$(docker run -dit \
	--workdir /src \
	-v "${PWD}":/src \
	--name "${name}" \
	easyj)


echo "make -C EasyJ4FRC closure compress allapps"
docker exec "${containerId}" make -C EasyJ4FRC closure compress allapps

echo "make -C EasyJ4FRC/apps/robotbuilder setup php"
docker exec "${containerId}" make -C EasyJ4FRC/apps/robotbuilder setup php

# for debugging
# docker exec -it "${containerId}" /bin/bash

docker stop "${containerId}"
docker rm "${containerId}"