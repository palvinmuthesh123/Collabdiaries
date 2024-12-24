#!/bin/bash
echo "Restarting the application with PM2..."
cd /home/ec2-user/project-folder
pm2 delete collabdiary || true
pm2 start dist/main.js --name "collabdiary"
pm2 save