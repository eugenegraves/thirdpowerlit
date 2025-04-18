#!/bin/bash

# Check for absolute image paths in JavaScript files
echo "Checking for absolute image paths in JavaScript files..."
ABSOLUTE_PATHS=$(grep -r "src=\"/" --include="*.js" --include="*.jsx" src/)

if [ -n "$ABSOLUTE_PATHS" ]; then
  echo "WARNING: Found absolute image paths that may not work in production:"
  echo "$ABSOLUTE_PATHS"
  echo "Consider using imported images instead."
  exit 1
else
  echo "✅ No absolute image paths found in JavaScript files."
fi

# Check for public directory references
echo "Checking for references to images in the public directory..."
PUBLIC_REFS=$(grep -r "public/" --include="*.js" --include="*.jsx" src/)

if [ -n "$PUBLIC_REFS" ]; then
  echo "WARNING: Found references to images in the public directory:"
  echo "$PUBLIC_REFS"
  echo "Consider moving these images to src/assets and importing them."
  exit 1
else
  echo "✅ No references to public directory found in JavaScript files."
fi

echo "All image paths look good! 🎉"
exit 0 