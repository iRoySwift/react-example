import { useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

export const useVideo = (props) => {
  const { videoRef, playerRef, options } = props;

  const initPlayer = useCallback(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, options);
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, playerRef, videoRef]);

  const handleEvent = useCallback(() => {
    playerRef.current?.log('onPlayerReady');
    // playerRef.current.play();

    playerRef.current?.one('playing', function () {
      // 监听播放
      // fillTips('<span>播放器1开始播放</span>')
    });
    playerRef.current?.one('play', function () {
      // 监听播放
      console.log('准备开始播放');
    });
    playerRef.current?.on('pause', function () {
      console.log('暂停播放');
    });
    playerRef.current?.on('ended', function () {
      console.log('结束播放');
    });

    //------events    绑定事件用on    移除事件用off
    playerRef.current?.on('loadstart', function () {
      console.log('loadstart------------');
    });
    playerRef.current?.on('loadedmetadata', function () {
      console.log('loadedmetadata---视频源数据加载完成----');
      playerRef.current?.play();
    });
    playerRef.current?.on('loadeddata', function () {
      console.log('loadeddata---渲染播放画面----');
    });
    playerRef.current?.on('progress', function () {
      console?.log('progress-------加载过程----');
    });
    playerRef.current?.on('timeupdate', function () {
      // const curTime = this.currentTime()
      //console.log('timeupdate-------------',curTime);
    });
    playerRef.current?.off('timeupdate', function () {
      console.log('off----------timeupdate');
    });
  }, [playerRef]);

  return { initPlayer, handleEvent, player: playerRef.current };
};
