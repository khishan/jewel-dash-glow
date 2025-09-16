import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
}

const AudioPlayer = ({ isPlaying }: AudioPlayerProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startCeremonialMusic();
    } else {
      stopMusic();
    }

    return () => {
      stopMusic();
    };
  }, [isPlaying]);

  const startCeremonialMusic = () => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;

      // Create gain node for volume control
      gainNodeRef.current = audioContext.createGain();
      gainNodeRef.current.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNodeRef.current.connect(audioContext.destination);

      // Create a ceremonial-style ambient sound
      const createTone = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          if (!audioContextRef.current || !gainNodeRef.current) return;

          const oscillator = audioContextRef.current.createOscillator();
          const toneGain = audioContextRef.current.createGain();
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
          
          // Fade in and out
          toneGain.gain.setValueAtTime(0, audioContextRef.current.currentTime);
          toneGain.gain.linearRampToValueAtTime(0.03, audioContextRef.current.currentTime + 0.5);
          toneGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);
          
          oscillator.connect(toneGain);
          toneGain.connect(gainNodeRef.current);
          
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + duration);
        }, delay);
      };

      // Create a ceremonial bell-like pattern
      const playBellSequence = () => {
        // Main ceremonial tones (like temple bells)
        createTone(523.25, 3, 0);     // C5
        createTone(659.25, 2.5, 1000); // E5
        createTone(783.99, 2, 2500);   // G5
        createTone(1046.50, 1.5, 4000); // C6
        
        // Ambient undertones
        createTone(261.63, 8, 500);    // C4 - long sustain
        createTone(329.63, 6, 1500);   // E4 - medium sustain
        
        // Schedule next sequence
        setTimeout(playBellSequence, 8000);
      };

      playBellSequence();
    } catch (error) {
      console.log("Audio context not supported:", error);
    }
  };

  const stopMusic = () => {
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return null; // This component doesn't render anything
};

export default AudioPlayer;