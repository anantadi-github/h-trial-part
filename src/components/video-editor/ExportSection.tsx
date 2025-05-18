import React, { useState } from 'react';

interface ExportSectionProps {
  onExport: (format: string, quality: string) => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({ onExport }) => {
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('high');

  const handleExport = () => {
    onExport(format, quality);
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Export Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="gif">GIF</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality
          </label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High (1080p)</option>
            <option value="medium">Medium (720p)</option>
            <option value="low">Low (480p)</option>
          </select>
        </div>
        
        <button
          onClick={handleExport}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Export Video
        </button>
      </div>
    </div>
  );
};

export default ExportSection;
