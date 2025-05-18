import React, { useRef, useEffect, useCallback } from 'react';
import { formatTime } from '../../utils/formatTime';

interface RemotionTimelineProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const RemotionTimeline: React.FC<RemotionTimelineProps> = ({
  duration,
  currentTime,
  onSeek,
  isPlaying,
  onPlayPause,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = offsetX / rect.width;
        const newTime = percentage * duration;
        onSeek(newTime);
      }
    },
    [duration, onSeek]
  );
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <button 
          onClick={onPlayPause}
          className="p-2 bg-blue-500 text-white rounded-full mr-4 hover:bg-blue-600 focus:outline-none"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</div>
      </div>
      
      <div 
        ref={timelineRef}
        className="h-2 bg-gray-200 rounded-full cursor-pointer relative"
        onClick={handleTimelineClick}
      >
        <div 
          className="absolute h-full bg-blue-500 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default RemotionTimeline;
