#!/bin/bash

# Kill any existing Jekyll processes
pkill -f jekyll

# Set environment variables
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export JEKYLL_ENV=development

# Clean the site before starting
echo "Cleaning old site files..."
bundle exec jekyll clean
if [ $? -ne 0 ]; then
    echo "Jekyll clean failed! Exiting."
    exit 1
fi
echo "Clean complete."

# Start Jekyll with better server options
bundle exec jekyll serve \
  --livereload \
  --trace \
  --incremental \
  --host=127.0.0.1 \
  --port=4000 \
  --baseurl="" \
  --watch \
  --force_polling
