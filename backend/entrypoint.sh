#!/bin/bash
set -e
rm -f /app/tmp/pids/server.pid
exec "$@"

# 本番環境の時のみマイグレーションを実行
if [ "$RAILS_ENV" = "production" ]; then
bundle exec rails db:migrate
fi