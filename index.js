const screenshotBtn = document.querySelector("#src-btn"),
  screenshotPreview = document.querySelector(".src-preview"),
  screenshotImage = screenshotPreview.querySelector("img"),
  closeBtn = document.querySelector("#close-btn");

const captureScreen = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
    const video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.play();

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getVideoTracks()[0].stop();

      screenshotImage.src = canvas.toDataURL();
      screenshotPreview.classList.add("show");
    });

    video.srcObject = stream;
  } catch (error) {
    alert("Failed to capture screenshot.");
  }
}

closeBtn.addEventListener("click", () => screenshotPreview.classList.remove("show"));
screenshotBtn.addEventListener("click", captureScreen);