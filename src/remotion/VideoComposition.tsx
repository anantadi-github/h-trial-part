import React, { useEffect } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

interface VideoCompositionProps {
  videoSrc: string;
  cropSettings: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({ videoSrc, cropSettings }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const videoStyle = {
    position: 'absolute' as const,
    top: `${-cropSettings.top * 100}%`,
    left: `${-cropSettings.left * 100}%`,
    width: `${(1 / cropSettings.width) * 100}%`,
    height: `${(1 / cropSettings.height) * 100}%`,
    objectFit: 'cover' as const,
  };

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = frame / fps;
    }
  }, [frame, fps]);

  return (
    <AbsoluteFill>
      <video
        src={videoSrc}
        style={videoStyle}
        muted
        playsInline
      />
    </AbsoluteFill>
  );
};
