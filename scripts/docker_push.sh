#!/bin/bash
# Push Docker Image
# echo 'Since databases are expensive, we are using a sqlite database, which is a file included with this image'
# echo 'Because of this, it is important to get the latest database file prior to pushing a new image'
# echo ''
# echo "Press any key to confirm that your latest docker build included an up to date database file..."
# read -n 1
echo 'Starting Docker Push'
echo 'Git Branch ' $1
docker push ghcr.io/demostheneslld/njclement-nextjs:$1