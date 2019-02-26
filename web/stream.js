const { NodeMediaServer } = require("node-media-server");
const ffmpegPath = require("./ffmpegconfig");
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
    ffmpeg: ffmpegPath.setPath(),
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]"
      }
    ]
  }
};
var nms = new NodeMediaServer(config);
nms.run();

// const shell = require("shelljs");
// var fs = require("fs");
//
// var child_process = require("child_process");
//
// var childProcess = [];
// var childstarted = [];
// var childPid = [];
// var previous = "";
// var next = "";
// var parray = [];
// var narray = [];
//
// console.log("[STREAM STARTED]");
//
// function readInput() {
//   try {
//     fs.readFile("web/views/video/INPUT", "utf8", (err, contents) => {
//       next = contents;
//       if (previous == next) {
//         //console.log("No change in stream");
//       } else {
//         //console.log("\nNew content detected");
//
//         var array = contents.toString().split("\n");
//         if (array.length < parray.length) {
//           for (var jj = parray.length - 1; jj >= array.length; jj--) {
//             try {
//               console.log("First pop");
//               childProcess[i].stdin.write("q");
//               childstarted[jj] = "killed";
//               console.log("[STREAM] Popping: " + parray[jj]);
//
//               parray.pop();
//             } catch (err2) {}
//           }
//         }
//         for (i in array) {
//           try {
//             if (array[i] == parray[i]);
//             else {
//               //try{
//               //console.log("Change detected in: " + array[i]);
//
//               if (childstarted[i] == "started") {
//                 console.log("[STREAM] Killed: " + parray[i]);
//                 childProcess[i].stdin.write("q");
//                 childProcess[i].kill();
//                 childstarted[i] == "killed";
//               }
//               //}
//               //catch(err2){                  }
//               var insplits = array[i].split(",");
//
//               if (insplits[3] == "disabled") {
//                 console.log("[STREAM]: DISABLED: " + insplits[0]);
//               } else {
//                 childProcess[i] = shell.exec(
//                   'web/views/video/stream.sh "' +
//                     insplits[0] +
//                     '" "' +
//                     insplits[1] +
//                     '" "' +
//                     config.URL +
//                     '" "' +
//                     insplits[2] +
//                     '"',
//                   { async: true, silent: true }
//                 );
//
//                 console.log("[STREAM]: Started: " + insplits[0]);
//                 childPid[i] = childProcess[i].pid;
//
//                 parray[i] = array[i];
//                 childstarted[i] = "started";
//               }
//             }
//           } catch (err) {
//             console.log(err);
//             try {
//               childProcess[i].kill();
//
//               process.kill(childPid[i]);
//             } catch (err2) {}
//             var insplits = array[i].split(",");
//             parray[i] = array[i];
//           }
//         }
//         previous = next;
//       }
//     });
//   } catch (err0) {}
// }
// setInterval(readInput, 5 * 1000);
// readInput();
