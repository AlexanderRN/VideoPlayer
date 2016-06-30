window.onload = function() {

    // Video
    var video = document.getElementById("video");

    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var fullScreenButton = document.getElementById("full-screen");
    var currentTime = document.getElementById("current");
    var duration = document.getElementById("duration");
    var nextvideo = document.getElementById("nextvideo");

    // Sliders
    var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");

    nextvideo.addEventListener("click", function() {
        console.log("in next");
        function videoObject(title, path) {
            this.title = title;
            this.path = path;
        }

        var hippo = new videoObject("hippo", "videos/hippo.webm");
        var donald = new videoObject("donaldduck", "videos/donaldduck.webm");

        var videoList = [];
        videoList.push(hippo);
        videoList.push(donald);

        console.log(video.currentSrc);
        video.src = videoList[1].path;
        console.log(videoList[1].path);
        console.log(video.currentSrc);
        video.pause();
        video.currentTime = 0;
        video.load();
        video.play();
    });

    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {

        if (video.paused || video.ended) {
            // Play the video

            if(video.ended) {
                video.pause();
                video.load();
            }
            video.play();

            // Update the button text to 'Pause'
            playButton.innerHTML = "Pause";
        } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            playButton.innerHTML = "Play";
        }
    });

    video.onended = function() {
        playButton.innerHTML = "Replay"
        seekBar.value = 0;
        video.currentTime = 0;
    }



    // Event listener for the mute button
    muteButton.addEventListener("click", function() {
        if (video.muted == false) {
            // Mute the video
            video.muted = true;

            // Update the button text
            muteButton.innerHTML = "Unmute";
        } else {
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.innerHTML = "Mute";
        }
    });


    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });


    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);

        // Update the video time
        video.currentTime = time;
    });

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;

        // Update the slider value
        seekBar.value = value;

        var time = parseInt(video.currentTime);
        var minutes = Math.floor(time/60);
        var seconds = time - minutes * 60;
        if (seconds < 10) {
            seconds = 0 +""+ seconds;
        }
        currentTime.innerHTML = minutes +":"+ seconds;

        var durTime = parseInt(video.duration);
        var durMinutes = Math.floor(durTime/60);
        var durSeconds = durTime - durMinutes * 60;
        if (durSeconds < 10) {
            durSeconds = 0 +""+ durSeconds;
        }
        duration.innerHTML = durMinutes +":" + durSeconds;

        video.onended = function() {
            playButton.innerHTML = "Replay";
        }
    });

    // Pause the video when the seek handle is being dragged
    seekBar.addEventListener("mousedown", function() {
        video.pause();
        seekBar.value = video.currentTime;
    });

    // Play the video when the seek handle is dropped
    seekBar.addEventListener("mouseup", function() {
        video.play();
    });

    // Event listener for the volume bar
    volumeBar.addEventListener("change", function() {
        // Update the video volume
        video.muted = false;
        muteButton.innerHTML = "Mute";
        video.volume = volumeBar.value;
    });
}