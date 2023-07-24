#!/bin/bash
set -e
rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "production" ]; then
DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:reset
fi

exec "$@"