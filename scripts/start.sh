#!/usr/bin/env bash

NODE_ENV=production pm2 start src/server.js --node-args="--experimental-modules" 