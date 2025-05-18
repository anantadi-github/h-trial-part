import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Hls from 'hls.js';

interface VideoPlayerProps {
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

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  isPlaying,
  onProgress,
  onDuration,
  cropSettings,
}) => {
  const [isHls, setIsHls] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    setIsHls(src.includes('.m3u8'));
  }, [src]);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    onProgress(state);
  };

  const cropStyle = {
    overflow: 'hidden',
    position: 'relative' as const,
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
  };

  const playerStyle = {
    position: 'absolute' as const,
    top: `${-cropSettings.top * 100}%`,
    left: `${-cropSettings.left * 100}%`,
    width: `${(1 / cropSettings.width) * 100}%`,
    height: `${(1 / cropSettings.height) * 100}%`,
  };

  return (
    <div style={cropStyle} className="rounded-lg overflow-hidden shadow-lg">
      <div style={playerStyle}>
        <ReactPlayer
          ref={playerRef}
          url={src}
          playing={isPlaying}
          controls={true}
          width="100%"
          height="100%"
          progressInterval={100}
          onProgress={handleProgress}
          onDuration={onDuration}
          config={{
            file: {
              forceHLS: isHls,
              hlsOptions: {
                enableWorker: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
