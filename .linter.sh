#!/bin/bash
cd /home/kavia/workspace/code-generation/mymoviediscover-95301-95308/main_container
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

