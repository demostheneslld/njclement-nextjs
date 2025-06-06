#!/bin/bash
# Build Docker Image
set -euo pipefail

echo 'Starting Docker Build'
ref="$1"
echo 'Git Branch/Ref ' "$ref"

tag=${ref//\//-}
DOCKER_BUILDKIT=1 docker build --pull --rm -f Dockerfile -t ghcr.io/demostheneslld/njclement-nextjs:"$tag" .
