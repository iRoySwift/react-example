import React, { useEffect, useRef } from 'react';
import { useVideo } from '@/components/Video/useVideo';

interface Props {}
const Video: React.FC<Props> = () => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  const options = {
    autoplay: true,
    controls: true,
    preload: 'auto',
    width: 500,
    // height: 500,
    loop: true,
    muted: true,
    playbackRates: [0.5, 1, 1.5, 2],

    notSupportedMessage: '此视频暂无法播放，请稍后再试',
    // loadingSpinner: false,
    // errorDisplay: false,
    // techOrder: ['html5', 'flvjs'],
    // html5: {
    //   hls: {
    //     withCredentials: true
    //   },
    //   vhs: {
    //     overrideNative: true
    //   },
    //   nativeAudioTracks: false,
    //   nativeVideoTracks: false
    // },
    // flvjs: {
    //   mediaDataSource: {
    //     isLive: false,
    //     cors: true,
    //     withCredentials: false
    //   }
    // },
    sources: [
      // {
      //   src: props.data.videoInfo.hls,
      //   type: 'application/x-mpegURL'
      // },
      // {
      //   src: '',
      //   type: 'video/x-flv'
      // },
      // {
      //   src: 'https://www.runoob.com/try/demo_source/movie.ogg',
      //   type: 'video/ogg'
      // },
      {
        src: 'https://www.runoob.com/try/demo_source/movie.mp4',
        type: 'video/mp4'
      }
    ]
  };

  const { initPlayer, handleEvent, player } = useVideo({ videoRef, playerRef, options });

  useEffect(() => {
    initPlayer();
  }, [initPlayer]);

  useEffect(() => {
    console.log('🚀 ~ file: useVideo.ts:63 ~ useEffect ~ player:', player);
    handleEvent();
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [handleEvent, player]);
  return (
    <div>
      <video ref={videoRef} className="video-js"></video>
    </div>
  );
};
export default Video;
