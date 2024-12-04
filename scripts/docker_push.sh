#!/bin/bash
echo 'Starting Docker Push'
echo 'Git Branch ' $1
replace='deploy\/'
replace_with=""
deploy_tag=$(echo $1 | sed "s/$replace/$replace_with/g")
docker push ghcr.io/demostheneslld/njclement-nextjs:$deploy_tag