#!/bin/bash
SITE_S3='s3://aosbattleplans.com/'          # Your S3 bucket address
SITE_BUILD_DIR='./build/'                   # Where your site is generated
CF_DIST_ID='EVD94LH3K0S4M'                  # Cloudfront Distribution ID
CF_PATH='/*'                                # Cloudfront Path to invalidate
yarn
yarn build
aws s3 sync --delete ${SITE_BUILD_DIR} ${SITE_S3} --exclude "*build_log.txt" --exclude "*.idea*" --exclude "*.sh" --exclude "*.git*" --exclude "*.DS_Store"
aws cloudfront create-invalidation --distribution-id ${CF_DIST_ID} --paths "${CF_PATH}"
echo 'Deployed to https://aosbattleplans.com/'
