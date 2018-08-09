#!/bin/bash 

echo "DEPLOY START..."

rm -rf build || true
npm run build

rm -rf deploy || true
mkdir deploy

cp -r build/ deploy/
cp app.yaml deploy/
cp preview.json deploy/

cd deploy
gcloud app deploy -v "$1" --no-promote
cd -

echo "DEPLOYED!"
