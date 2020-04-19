#!/usr/bin/env bash

NODE_ENV=production pm2 start node --name server  -- --experimental-modules src/server.js