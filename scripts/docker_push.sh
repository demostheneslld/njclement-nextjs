#!/bin/bash
set -euo pipefail

echo 'Starting Docker Push'
ref="$1"
echo 'Git Branch/Ref ' "$ref"

tag=${ref//\//-}
docker push ghcr.io/demostheneslld/njclement-nextjs:"$tag"
