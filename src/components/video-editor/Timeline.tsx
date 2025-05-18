import React, { useRef, useEffect, useState } from 'react';

interface TimelineProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  duration,
  currentTime,
  onSeek,
  isPlaying,
  onPlayPause,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(newTime);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      if (newTime >= 0 && newTime <= duration) {
        onSeek(newTime);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp as any);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp as any);
    };
  }, [isDragging]);

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={onPlayPause}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <div className="text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div
        ref={timelineRef}
        className="w-full h-10 bg-gray-200 rounded-md cursor-pointer relative"
        onClick={handleTimelineClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 rounded-l-md"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
        <div
          className="absolute top-0 h-full w-2 bg-blue-600 rounded-full"
          style={{
            left: `calc(${(currentTime / duration) * 100}% - 4px)`,
            top: '0',
            transform: 'translateY(0)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Timeline;
