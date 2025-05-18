import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import Hls from 'hls.js';
import { VideoComposition } from '../../remotion/VideoComposition';

interface RemotionVideoPlayerProps {
  src: string;
  isPlaying: boolean;
  onProgress: (state: { played: number; playedSeconds: number }) => void;
  onDuration: (duration: number) => void;
  cropSettings: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const RemotionVideoPlayer: React.FC<RemotionVideoPlayerProps> = ({
  src,
  isPlaying,
  onProgress,
  onDuration,
  cropSettings,
}) => {
  const [isHls, setIsHls] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [hlsUrl, setHlsUrl] = useState<string>(src);
  const playerRef = useRef<PlayerRef>(null);
  
  useEffect(() => {
    setIsHls(src.includes('.m3u8'));
  }, [src]);
  
  useEffect(() => {
    if (isHls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      setHlsUrl(src);
      
      const videoElement = document.createElement('video');
      hls.attachMedia(videoElement);
      
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration * 30); // Convert to frames (assuming 30fps)
        onDuration(videoElement.duration);
      });
      
      return () => {
        hls.destroy();
      };
    }
  }, [src, isHls, onDuration]);
  
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  const handleTimeUpdate = useCallback(() => {
    if (playerRef.current) {
      const frame = playerRef.current.getCurrentFrame();
      const seconds = frame / 30; // Assuming 30fps
      onProgress({ played: seconds / videoDuration, playedSeconds: seconds });
    }
  }, [onProgress, videoDuration]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        const seconds = frame / 30; // Assuming 30fps
        onProgress({ played: seconds / videoDuration, playedSeconds: seconds });
      }
    }, 100); // Update every 100ms
    
    return () => {
      clearInterval(interval);
    };
  }, [onProgress, videoDuration, playerRef]);
  
  const durationInFrames = Math.max(videoDuration || 300, 300); // Default to 10 seconds (30fps * 10)

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-lg" 
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Player
          ref={playerRef}
          component={VideoComposition}
          inputProps={{ videoSrc: src, cropSettings }}
          durationInFrames={durationInFrames}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{ width: '100%', height: '100%' }}
          autoPlay={isPlaying}
          loop={false}
          controls
          showVolumeControls
        />
      </div>
    </div>
  );
};

export default RemotionVideoPlayer;
