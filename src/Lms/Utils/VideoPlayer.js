import React, { Component } from "react";

/**
 * playbackInfo
 * otp
 */
class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoObject: null
    };
  }

  componentDidMount() {
    if (window.VdoPlayer) {
      return this.loadPlayer();
    }
    const playerScript = document.createElement("script");
    playerScript.src =
      "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
    document.body.appendChild(playerScript);
    playerScript.addEventListener("load", () => {
      return this.loadPlayer();
    });
  }

  loadPlayer() {
    window.playerContainer = this.refs.container;
    new window.VdoPlayer({
      otp: this.props.otp,
      playbackInfo: this.props.playBackInfo,
      theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      container: this.refs.container
    });
  }

  render() {
    return (
      <div
        ref="container"
        style={{
          height: "auto",
          width: "100%"
        }}
      ></div>
    );
  }
}

export default VideoPlayer;

// REVIEW DEBUG NOTE
