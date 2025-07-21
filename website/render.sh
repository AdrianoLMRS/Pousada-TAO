#!/bin/bash

REPO="Pousada-TAO"
USER="AdrianoLMRS"

set -e

# Loads .env variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

if [ -z "$GITHUB_PAT" ]; then
    echo "❌ GITHUB_PAT var is not defined..."
    exit 1
fi
if [ -z "$WORKFLOW_ID" ]; then
    echo "❌ WORKFLOW_ID var is not defined..."
    exit 1
fi

echo "🔍 Searching last success run"

RUN_ID=$(curl -s -H "Authorization: token $GITHUB_PAT" \
    "https://api.github.com/repos/$USER/$REPO/actions/workflows/$WORKFLOW_ID/runs?status=success&per_page=1" |
    jq '.workflow_runs[0].id')


if [ -z "$RUN_ID" ]; then
    echo "❌ No success run found in 'internationalization'."
    exit 1
fi

echo "🔎 Searching for artifact ID ($RUN_ID)..."

ARTIFACT_ID=$(curl -s -H "Authorization: token $GITHUB_PAT" \
    "https://api.github.com/repos/$USER/$REPO/actions/runs/$RUN_ID/artifacts" | \
    jq -r '.artifacts[] | select(.name=="site-dist") | .id')

if [ -z "$ARTIFACT_ID" ]; then
    echo "❌ Artifact 'site-dist' not found..."
    exit 1
fi

echo "📦 Artifact URL: $ARTIFACT_URL"
echo "⬇️ Downloading & extracting dist..."

rm -rf dist
curl -L -H "Authorization: token $GITHUB_PAT" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$USER/$REPO/actions/artifacts/$ARTIFACT_ID/zip" \
    -o site-dist.zip

unzip site-dist.zip -d dist
rm site-dist.zip

echo "✅ Download finished & /dist ready."