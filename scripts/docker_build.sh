# Build Docker Image
echo 'Starting Docker Build'
echo 'Git Branch ' $1
replace='deploy\/'
replace_with=""
deploy_tag=$(echo $1 | sed "s/$replace/$replace_with/g")
DOCKER_BUILDKIT=1 docker build --pull --rm -f "Dockerfile" -t ghcr.io/demostheneslld/njclement-nextjs:$deploy_tag "."