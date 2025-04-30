
import React, { useState } from 'react';
import PlayButton from '@/components/PlayButton';
import LyricRunner from '@/components/LyricRunner';
import { sampleLyrics, totalDuration } from '@/data/sampleLyrics';

const Index = () => {
  const [showLyrics, setShowLyrics] = useState(false);

  const handlePlay = () => {
    setShowLyrics(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-spotify-dark">
      {!showLyrics ? (
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Lyric Runner</h1>
          <p className="text-lg mb-12 text-gray-300">Click play to start the lyrics</p>
          <PlayButton onClick={handlePlay} className="animate-pulse" />
        </div>
      ) : (
        <div className="w-full px-4 py-8 animate-slide-up">
          <LyricRunner lyrics={sampleLyrics} totalDuration={totalDuration} autoPlay={true} />
        </div>
      )}
      
      <div className="absolute bottom-4 text-center w-full text-xs text-gray-500">
        <p>© 2025 Lyric Runner</p>
      </div>
    </div>
  );
};

export default Index;
