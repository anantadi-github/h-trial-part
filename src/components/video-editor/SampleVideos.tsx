import React from 'react';

interface SampleVideosProps {
  onSelectVideo: (src: string) => void;
  selectedSrc: string;
}

const SampleVideos: React.FC<SampleVideosProps> = ({ onSelectVideo, selectedSrc }) => {
  const sampleVideos = [
    {
      name: 'Sample MP4 Video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'mp4'
    },
    {
      name: 'Sample HLS Stream',
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'm3u8'
    },
    {
      name: 'Tears of Steel',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      type: 'mp4'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Sample Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleVideos.map((video, index) => (
          <button
            key={index}
            onClick={() => onSelectVideo(video.src)}
            className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition ${
              selectedSrc === video.src ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="font-medium">{video.name}</div>
            <div className="text-sm text-gray-500 mt-1">Format: {video.type.toUpperCase()}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SampleVideos;
