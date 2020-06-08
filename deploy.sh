#!/bin/bash

cd `dirname $0`
git pull
./gen.sh
sudo mkdir -p /var/www/html/
sudo cp www/* -vrf /var/www/html/
./purge-cache.sh
