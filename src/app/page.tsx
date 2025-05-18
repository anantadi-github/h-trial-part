'use client';

import React, { useState } from 'react';
import VideoEditor from '@/components/video-editor/VideoEditor';
import SampleVideos from '@/components/video-editor/SampleVideos';
import UrlInput from '@/components/video-editor/UrlInput';

export default function Home() {
  const [videoSrc, setVideoSrc] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browser-Based Video Editor</h1>
        <p className="text-gray-600 mb-8">
          Edit, clip, and crop videos to create shorts or reels. Supports both MP4 and HLS (.m3u8) formats.
        </p>
        
        <UrlInput onSubmit={setVideoSrc} />
        <SampleVideos onSelectVideo={setVideoSrc} selectedSrc={videoSrc} />
        
        <VideoEditor videoSrc={videoSrc} />
        
        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select a sample video or enter a URL</li>
            <li>Use the timeline to navigate through the video</li>
            <li>Set in and out points to clip the video</li>
            <li>Adjust crop settings to change the aspect ratio</li>
            <li>Choose export settings and click Export</li>
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            Note: This is a dummy implementation. Actual video processing is not performed.
          </p>
        </div>
      </div>
    </main>
  );
}
