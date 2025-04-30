
import React from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayButtonProps {
  onClick: () => void;
  className?: string;
}

const PlayButton = ({ onClick, className }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full bg-spotify-DEFAULT hover:bg-spotify-DEFAULT/90 transition-all',
        'flex items-center justify-center p-6 shadow-lg',
        'transform hover:scale-105 active:scale-95',
        className
      )}
      aria-label="Play"
    >
      <Play size={48} className="text-white ml-1" />
    </button>
  );
};

export default PlayButton;
