import React from 'react';

interface CropControlsProps {
  cropSettings: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  onCropChange: (cropSettings: {
    top: number;
    left: number;
    width: number;
    height: number;
  }) => void;
  aspectRatio: string;
  onAspectRatioChange: (ratio: string) => void;
}

const CropControls: React.FC<CropControlsProps> = ({
  cropSettings,
  onCropChange,
  aspectRatio,
  onAspectRatioChange,
}) => {
  const handleSliderChange = (property: keyof typeof cropSettings, value: number) => {
    onCropChange({
      ...cropSettings,
      [property]: value,
    });
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Crop Settings</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Aspect Ratio
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onAspectRatioChange('16:9')}
            className={`px-3 py-1 text-sm rounded ${
              aspectRatio === '16:9' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            16:9
          </button>
          <button
            onClick={() => onAspectRatioChange('9:16')}
            className={`px-3 py-1 text-sm rounded ${
              aspectRatio === '9:16' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            9:16 (Vertical)
          </button>
          <button
            onClick={() => onAspectRatioChange('1:1')}
            className={`px-3 py-1 text-sm rounded ${
              aspectRatio === '1:1' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            1:1 (Square)
          </button>
          <button
            onClick={() => onAspectRatioChange('4:5')}
            className={`px-3 py-1 text-sm rounded ${
              aspectRatio === '4:5' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            4:5 (Instagram)
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Top Position: {Math.round(cropSettings.top * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={cropSettings.top}
            onChange={(e) => handleSliderChange('top', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Left Position: {Math.round(cropSettings.left * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={cropSettings.left}
            onChange={(e) => handleSliderChange('left', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width: {Math.round(cropSettings.width * 100)}%
          </label>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.01"
            value={cropSettings.width}
            onChange={(e) => handleSliderChange('width', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height: {Math.round(cropSettings.height * 100)}%
          </label>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.01"
            value={cropSettings.height}
            onChange={(e) => handleSliderChange('height', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CropControls;
