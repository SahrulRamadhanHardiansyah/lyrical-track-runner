
import React, { useState } from 'react';
import PlayButton from '@/components/PlayButton';
import LyricRunner from '@/components/LyricRunner';
import { sampleLyrics, totalDuration } from '@/data/sampleLyrics';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [showLyrics, setShowLyrics] = useState(false);

  const handlePlay = () => {
    setShowLyrics(true);
  };

  const handleBack = () => {
    setShowLyrics(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-spotify-dark">
      {showLyrics && (
        <button 
          onClick={handleBack}
          className="absolute top-6 left-6 text-white hover:text-spotify-DEFAULT transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      
      {!showLyrics ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Lyric Runner</h1>
          <p className="text-lg mb-12 text-gray-300">Click play to start the lyrics</p>
          <div className="flex justify-center">
            <PlayButton onClick={handlePlay} className="animate-pulse" />
          </div>
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
