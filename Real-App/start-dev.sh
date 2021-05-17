#!/bin/bash
session="my-dev"

tmux start-server

window_api=$(tmux new-session -d -s $session -n app-server -PF '#{window_id}')
window_server=$(tmux new-window -n app-server -PF '#{window_id}')
tmux select-window -t $window_server
tmux send-keys "code ." C-m
tmux send-keys "cd api" C-m
tmux send-keys "yarn start:dev" C-m

window_app=$(tmux new-window -n app-client -PF '#{window_id}')
tmux select-window -t $window_app
tmux send-keys "cd app" C-m
tmux send-keys "yarn start" C-m 

tmux setw -g monitor-activity on
tmux set -g visual-activity on

tmux select-layout even-vertical

tmux -CC attach-session -t $session cflogs