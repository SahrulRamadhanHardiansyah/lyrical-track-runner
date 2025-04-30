
interface Lyric {
  text: string;
  startTime: number; // in milliseconds
}

// Sample lyrics with timing
export const sampleLyrics: Lyric[] = [
  { text: "Falling like the stars", startTime: 0 },
  { text: "Landing at my feet", startTime: 4000 },
  { text: "Remembering the way that we used to be", startTime: 8000 },
  { text: "When everything was fine", startTime: 12000 },
  { text: "Before you had to leave", startTime: 16000 },
  { text: "Making up the time from your memory", startTime: 20000 },
  
  { text: "I never thought you'd go", startTime: 24000 },
  { text: "Break my heart of stone", startTime: 28000 },
  { text: "Never thought the end would be so sudden", startTime: 32000 },
  { text: "All the things I know", startTime: 36000 },
  { text: "All the words we spoke", startTime: 40000 },
  { text: "Fade away like smoke, you're still unforgotten", startTime: 44000 },
  
  { text: "I see you in the sky", startTime: 48000 },
  { text: "In the stars tonight", startTime: 52000 },
  { text: "That's where I'll be looking for your light", startTime: 56000 },
  { text: "And when I close my eyes", startTime: 60000 },
  { text: "I feel you by my side", startTime: 64000 },
  { text: "Walking with me through these darkest nights", startTime: 68000 },
];

export const totalDuration = 72000; // 1 minute and 12 seconds in milliseconds
