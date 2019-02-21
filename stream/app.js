const osString = require("./config");
const { NodeMediaCluster } = require("node-media-server");
const numCPUs = require("os").cpus().length;

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    mediaroot: "./media",
    allow_origin: "*"
  },
  trans: {
    //sets ffmpeg path
    ffmpeg: osString.setPath(),

    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]"
      }
    ]
  },
  cluster: {
    num: numCPUs
  }
};

var nmcs = new NodeMediaCluster(config);
nmcs.run();
