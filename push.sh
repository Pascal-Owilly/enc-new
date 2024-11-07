#!/bin/bash

# Navigate to the root of the project directory if necessary
# cd /path/to/your/project

# Stage all changes
git add .

# Commit the changes with a message
git commit -m "update"

# Push the changes to the remote 'style-pages' branch
git push origin style-pages
