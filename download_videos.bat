@echo off
echo Downloading Video 1...
yt-dlp --download-sections "*0:00-2:33" -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / w" -o "e:\1. Skillizee\Gravity\public\videos\module1\1.2 - CBSE Class 9 Gravitation Animation.mp4" "https://www.youtube.com/watch?v=nnV6eFx_9jo"

echo Downloading Video 2...
yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / w" -o "e:\1. Skillizee\Gravity\public\videos\module1\1.2 - Introduction to Gravitation Hindi.mp4" "https://www.youtube.com/watch?v=AFGOzTM0N-A"

echo Downloading Video 3...
yt-dlp --download-sections "*0:00-1:40" -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / w" -o "e:\1. Skillizee\Gravity\public\videos\module1\1.3 - Centripetal Force.mp4" "https://www.youtube.com/watch?v=KvCezk9DJfk"

echo Downloading Video 4...
yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / w" -o "e:\1. Skillizee\Gravity\public\videos\module1\1.4 - Understanding Universal law of Gravitation.mp4" "https://www.youtube.com/watch?v=Af9lRX4xsr0"

echo Downloading Video 5...
yt-dlp --download-sections "*1:48-inf" -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / w" -o "e:\1. Skillizee\Gravity\public\videos\module1\1.4 - Value of G.mp4" "https://www.youtube.com/watch?v=c9shwPMpSq8"

echo Finished!
