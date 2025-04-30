
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';

interface Lyric {
  text: string;
  startTime: number; // in milliseconds
}

interface LyricRunnerProps {
  lyrics: Lyric[];
  totalDuration: number; // in milliseconds
  autoPlay?: boolean;
}

const LyricRunner: React.FC<LyricRunnerProps> = ({ lyrics, totalDuration, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number | null>(null);

  // Function to find the current lyric index based on time
  const findCurrentLyricIndex = (time: number) => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (time >= lyrics[i].startTime) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    // Update current lyric index when time changes
    const newLyricIndex = findCurrentLyricIndex(currentTime);
    if (newLyricIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newLyricIndex);
    }
  }, [currentTime, lyrics, currentLyricIndex]);

  useEffect(() => {
    // Scroll to active lyric
    if (currentLyricIndex >= 0 && containerRef.current) {
      const container = containerRef.current;
      const element = container.children[currentLyricIndex] as HTMLElement;
      
      if (element) {
        const containerHeight = container.clientHeight;
        const elementOffset = element.offsetTop;
        const elementHeight = element.clientHeight;
        
        // Center the element in the container
        const scrollPosition = elementOffset - (containerHeight / 2) + (elementHeight / 2);
        container.scrollTop = scrollPosition;
      }
    }
  }, [currentLyricIndex]);

  // Animation frame based timer for smoother updates
  const updateTime = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp - currentTime;
      lastUpdateTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - (lastUpdateTimeRef.current || 0);
    lastUpdateTimeRef.current = timestamp;
    
    if (isPlaying) {
      setCurrentTime(prevTime => {
        const newTime = prevTime + elapsed;
        return newTime >= totalDuration ? totalDuration : newTime;
      });
      
      timerRef.current = requestAnimationFrame(updateTime);
    }
  };

  useEffect(() => {
    // Start or stop the timer based on isPlaying state
    if (isPlaying) {
      timerRef.current = requestAnimationFrame(updateTime);
    } else if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isPlaying]);

  // Auto-pause at the end
  useEffect(() => {
    if (currentTime >= totalDuration && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentTime, totalDuration, isPlaying]);

  const togglePlayPause = () => {
    if (currentTime >= totalDuration) {
      // If at the end, restart
      setCurrentTime(0);
      startTimeRef.current = null;
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60));
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / totalDuration) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-8">
      <div 
        ref={containerRef}
        className="lyric-container w-full overflow-y-auto no-scrollbar px-4 py-8 text-center"
        style={{ height: '50vh' }}
      >
        {lyrics.map((lyric, index) => (
          <div
            key={index}
            className={cn(
              "lyric-line text-2xl md:text-3xl my-8 transition-all duration-300",
              currentLyricIndex === index ? "active text-white font-bold" : "text-gray-400"
            )}
          >
            {lyric.text}
          </div>
        ))}
      </div>
      
      <div className="w-full px-4 space-y-4">
        <div className="progress-bar-container h-2 bg-gray-700 rounded-full">
          <div 
            className="progress-bar h-2 bg-spotify-DEFAULT rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          
          <button
            onClick={togglePlayPause}
            className="rounded-full bg-spotify-DEFAULT hover:bg-spotify-DEFAULT/90 p-3 flex items-center justify-center"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="text-white" size={24} />
            ) : (
              <Play className="text-white ml-0.5" size={24} />
            )}
          </button>
          
          <span className="text-xs text-gray-400">{formatTime(totalDuration)}</span>
        </div>
      </div>
    </div>
  );
};

export default LyricRunner;
