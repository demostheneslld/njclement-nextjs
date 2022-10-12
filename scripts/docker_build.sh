# Build Docker Image
echo 'Starting Docker Build'
echo 'Git Branch ' $1
DOCKER_BUILDKIT=1 docker build --pull --rm -f "Dockerfile" -t ghcr.io/demostheneslld/njclement-nextjs:$1 "."