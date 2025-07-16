#!/bin/bash
# Build Docker Image with Bun support
set -euo pipefail

echo 'Starting Docker Build with Bun support'
ref="$1"
echo 'Git Branch/Ref ' "$ref"

tag=${ref//\//-}
DOCKER_BUILDKIT=1 docker build --pull --rm -f Dockerfile -t ghcr.io/demostheneslld/njclement-nextjs:"$tag" .
