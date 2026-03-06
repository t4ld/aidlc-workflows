#!/bin/bash

# Setup Fork Script
# This script helps you set up your fork of the aidlc-workflows repository

echo "=== Fork Setup Instructions ==="
echo ""
echo "Step 1: Create a fork on GitHub"
echo "  1. Go to: https://github.com/awslabs/aidlc-workflows"
echo "  2. Click the 'Fork' button in the top-right corner"
echo "  3. Select your account as the destination"
echo "  4. Wait for the fork to be created"
echo ""
echo "Step 2: Update your local repository to point to your fork"
echo "  After creating the fork, run these commands:"
echo ""
echo "  # Replace YOUR_USERNAME with your GitHub username"
echo "  git remote rename origin upstream"
echo "  git remote add origin https://github.com/YOUR_USERNAME/aidlc-workflows.git"
echo ""
echo "Step 3: Push your changes to your fork"
echo "  git push -u origin main"
echo ""
echo "Step 4: (Optional) Keep your fork synced with upstream"
echo "  git fetch upstream"
echo "  git merge upstream/main"
echo ""
echo "=== Current Git Status ==="
git remote -v
echo ""
git log --oneline -5
