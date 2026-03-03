const express = require("express");
const youtubedl = require("youtube-dl-exec");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL required");
  try {
    const output = "video.mp4";
    await youtubedl(url, { output: output, format: "best" });
    res.download(output, () => {
      fs.unlinkSync(output); // delete after download
    });
  } catch (error) {
    console.log("Download error:", error.message);
    res.status(500).send("Failed to download video");
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
