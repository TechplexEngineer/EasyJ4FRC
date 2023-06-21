FROM ubuntu:16.04

RUN apt-get -y -qq update
RUN apt-get -y -qq install wget unzip make python php openjdk-8-jdk nodejs npm git
RUN npm install -g bower
RUN ln -s /usr/bin/nodejs /usr/bin/node