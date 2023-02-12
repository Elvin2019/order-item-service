#!/bin/bash

# Find the process ID (PID) of the process that is listening on port 4001
pid=$(lsof -i tcp:4001 | awk 'NR!=1 {print $2}')

# Kill the process with the PID
if [ -n "$pid" ]; then
  kill -9 $pid
  echo "Process with PID $pid has been killed."
else
  echo "No process found listening on port 4001."
fi
