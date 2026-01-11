#!/bin/sh
set -e
exec /docker-entrypoint.sh nginx -g "daemon off;"