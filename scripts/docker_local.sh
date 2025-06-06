#!/bin/bash
set -euo pipefail

echo 'Starting Docker Build and Run Local'
tag='njclement-nextjs-local:latest'
DOCKER_BUILDKIT=1 docker build --pull --rm -f Dockerfile -t "$tag" .
echo 'Build Complete'

echo 'Running Container'
docker run -p 3000:3000 "$tag"
