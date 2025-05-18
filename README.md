# Browser-Based Video Editor

A React/Next.js application that provides a browser-based video editor interface for converting large videos to shorts or reels. The editor supports both .m3u8 (HLS) streams and MP4 video formats.

## Features

- Video playback for MP4 and HLS (.m3u8) formats
- Timeline interface with scrubbing capability
- Clip selection with in/out points
- Crop controls for adjusting video framing
- Multiple aspect ratio options (16:9, 9:16, 1:1, 4:5)
- Export settings (dummy implementation)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anantadi-github/h-trial-part.git
cd h-trial-part

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Select a sample video or enter a URL
2. Use the timeline to navigate through the video
3. Set in and out points to clip the video
4. Adjust crop settings to change the aspect ratio
5. Choose export settings and click Export

Note: This is a dummy implementation. Actual video processing is not performed.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- react-player
- hls.js
