import React, { useState, useEffect } from 'react';
import RemotionVideoPlayer from './RemotionVideoPlayer';
import RemotionTimeline from './RemotionTimeline';
import CropControls from './CropControls';
import ClipSection from './ClipSection';
import ExportSection from './ExportSection';

interface VideoEditorProps {
  videoSrc: string;
}

const VideoEditor: React.FC<VideoEditorProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [cropSettings, setCropSettings] = useState({
    top: 0,
    left: 0,
    width: 1,
    height: 1,
  });

  useEffect(() => {
    if (duration > 0 && endTime === 0) {
      setEndTime(duration);
    }
  }, [duration, endTime]);

  useEffect(() => {
    const newCropSettings = { ...cropSettings };
    
    switch (aspectRatio) {
      case '16:9':
        newCropSettings.width = 1;
        newCropSettings.height = 1;
        break;
      case '9:16':
        newCropSettings.width = 0.5;
        newCropSettings.height = 1;
        break;
      case '1:1':
        newCropSettings.width = 0.75;
        newCropSettings.height = 0.75;
        break;
      case '4:5':
        newCropSettings.width = 0.75;
        newCropSettings.height = 0.85;
        break;
      default:
        break;
    }
    
    setCropSettings(newCropSettings);
  }, [aspectRatio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
    
    if (currentTime < startTime) {
    } else if (currentTime > endTime) {
      setIsPlaying(false);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleStartTimeChange = (time: number) => {
    setStartTime(time);
    if (currentTime < time) {
      setCurrentTime(time);
    }
  };

  const handleEndTimeChange = (time: number) => {
    setEndTime(time);
    if (currentTime > time) {
      setCurrentTime(time);
    }
  };

  const handleCropChange = (newCropSettings: typeof cropSettings) => {
    setCropSettings(newCropSettings);
  };

  const handleExport = (format: string, quality: string) => {
    console.log('Exporting video with settings:', {
      format,
      quality,
      startTime,
      endTime,
      cropSettings,
      aspectRatio
    });
    
    alert(`Video export started with format: ${format}, quality: ${quality}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RemotionVideoPlayer
            src={videoSrc}
            isPlaying={isPlaying}
            onProgress={handleProgress}
            onDuration={handleDuration}
            cropSettings={cropSettings}
          />
          
          <RemotionTimeline
            duration={duration}
            currentTime={currentTime}
            onSeek={handleSeek}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
          
          <ClipSection
            duration={duration}
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={handleStartTimeChange}
            onEndTimeChange={handleEndTimeChange}
          />
        </div>
        
        <div className="lg:col-span-1">
          <CropControls
            cropSettings={cropSettings}
            onCropChange={handleCropChange}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
          />
          
          <ExportSection onExport={handleExport} />
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
