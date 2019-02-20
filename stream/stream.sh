streamUrl=$1
streamLow="rtmp://localhost/live/$1_st_low"
streamMid="rtmp://localhost/live/$1_st_mid"
streamHigh="rtmp://localhost/live/$1_st_high"
echo $streamLow


ffmpeg -re -thread_queue_size 512 -hwaccel auto -i $2 \
-vf scale=w=640:h=360 -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -f flv $streamLow \
-vf scale=w=842:h=480 -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -maxrate 1498k -bufsize 2100k -b:a 128k -f flv $streamMid \
-vf scale=w=1280:h=720 -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -f flv $streamHigh
 
