#!/usr/bin/env bash

NODE_ENV=production pm2 start src/server.mjs --node-args="--experimental-modules" 