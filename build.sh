#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

echo "::group::Starting Build"
docker build . -t easyj 1> /dev/null 2>/dev/null
echo "::endgroup::"

imagename="easyj"
name=$(mktemp -u "${imagename}-XXX")

containerId=$(docker run -dit \
	--workdir /src \
	-v "${PWD}/..":/src \
	--name "${name}" \
	easyj)

echo "PWD: ${PWD}"

echo "ls"
ls

echo "docker ls"
docker exec "${containerId}" ls

echo "make -C EasyJ4FRC closure compress allapps"
docker exec "${containerId}" make -C EasyJ4FRC closure compress allapps

echo "make -C EasyJ4FRC/apps/robotbuilder setup php"
docker exec "${containerId}" make -C EasyJ4FRC/apps/robotbuilder setup php

# for debugging
# docker exec -it "${containerId}" /bin/bash

docker stop "${containerId}"
docker rm "${containerId}"