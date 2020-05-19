#!/bin/bash

cd `dirname $0`
git pull
./gen.sh
sudo rm -vrf /var/www/odj.me
sudo cp www -vrf /var/www/odj.me
./purge-cache.sh
