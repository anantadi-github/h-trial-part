import React from 'react';

interface ClipSectionProps {
  duration: number;
  startTime: number;
  endTime: number;
  onStartTimeChange: (time: number) => void;
  onEndTimeChange: (time: number) => void;
}

const ClipSection: React.FC<ClipSectionProps> = ({
  duration,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Clip Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time: {formatTime(startTime)}
          </label>
          <input
            type="range"
            min="0"
            max={endTime}
            step="0.1"
            value={startTime}
            onChange={(e) => onStartTimeChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>00:00</span>
            <span>{formatTime(endTime)}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time: {formatTime(endTime)}
          </label>
          <input
            type="range"
            min={startTime}
            max={duration}
            step="0.1"
            value={endTime}
            onChange={(e) => onEndTimeChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(startTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipSection;
