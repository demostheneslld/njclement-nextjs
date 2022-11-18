#!/bin/bash
# Push Docker Image
# echo 'Since databases are expensive, we are using a sqlite database, which is a file included with this image'
# echo 'Because of this, it is important to get the latest database file prior to pushing a new image'
# echo ''
# echo "Press any key to confirm that your latest docker build included an up to date database file..."
# read -n 1
echo 'Starting Docker Push'
echo 'Git Branch ' $1
replace='deploy\/'
replace_with=""
deploy_tag=$(echo $1 | sed "s/$replace/$replace_with/g")
docker push ghcr.io/demostheneslld/njclement-nextjs:$deploy_tag