import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import inaugurationBg from "@/assets/inauguration-bg.jpg";

interface SlideshowProps {
  isVisible: boolean;
  onClose: () => void;
}

const Slideshow = ({ isVisible, onClose }: SlideshowProps) => {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Start curtain opening animation
      const timer1 = setTimeout(() => {
        setCurtainsOpen(true);
      }, 500);

      // Show content after curtains open
      const timer2 = setTimeout(() => {
        setShowContent(true);
        
        // Start background music
        if (audioRef.current) {
          audioRef.current.play().catch(console.log);
        }
      }, 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setCurtainsOpen(false);
      setShowContent(false);
      
      // Stop background music
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${inaugurationBg})`,
        }}
      />
      
      {/* Stage Background */}
      <div className="absolute inset-0 bg-gradient-stage"></div>

      {/* Curtains */}
      <div className={curtainsOpen ? "curtain-opened" : ""}>
        <div className="curtain-left">
          {/* Curtain fold details */}
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-curtain-burgundy to-curtain-red-dark shadow-lg"></div>
          <div className="absolute inset-y-0 right-8 w-4 bg-curtain-red-dark opacity-60"></div>
        </div>
        
        <div className="curtain-right">
          {/* Curtain fold details */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-curtain-burgundy to-curtain-red-dark shadow-lg"></div>
          <div className="absolute inset-y-0 left-8 w-4 bg-curtain-red-dark opacity-60"></div>
        </div>
      </div>

      {/* Slideshow Content */}
      {showContent && (
        <>
          {/* Animated Text */}
          <div className="slideshow-text">
            <div className="space-y-4">
              <div className="text-center">
                Hosting
              </div>
              <div className="text-center font-black">
                MNC
              </div>
              <div className="text-center text-5xl md:text-6xl lg:text-7xl">
                at
              </div>
              <div className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                St. Joseph's Institute of Technology
              </div>
            </div>
          </div>

          {/* Spotlight Effects */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-radial-gradient opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-radial-gradient opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-curtain-gold rounded-full opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-60 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-300 group"
        aria-label="Close slideshow"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        {/* Using a royalty-free ceremonial music URL - replace with actual file */}
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        {/* Fallback: Generate audio tone if no file available */}
      </audio>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle, hsl(var(--curtain-gold)) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
};

export default Slideshow;