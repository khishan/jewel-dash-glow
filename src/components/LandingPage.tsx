import { useState } from "react";
import { Play } from "lucide-react";
import inaugurationBg from "@/assets/inauguration-bg.jpg";

interface LandingPageProps {
  onStartShow: () => void;
}

const LandingPage = ({ onStartShow }: LandingPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartShow = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStartShow();
      setIsLoading(false);
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${inaugurationBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-stage opacity-70"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-curtain-gold rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="landing-content z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent leading-tight">
          MNC Inauguration
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-curtain-gold mb-8 font-medium max-w-2xl mx-auto leading-relaxed">
          St. Joseph's Institute of Technology
        </p>
        
        {/* Decorative Line */}
        <div className="w-32 h-1 bg-gradient-gold mx-auto mb-12 rounded-full"></div>
        
        {/* Start Button */}
        <button
          onClick={handleStartShow}
          disabled={isLoading}
          className="btn-theater group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Preparing Show...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" />
                <span>Start Show</span>
              </>
            )}
          </div>
          
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
        
        {/* Event Info */}
        <div className="mt-16 text-muted-foreground text-lg">
          <p className="mb-2">Welcome to the Grand Opening Ceremony</p>
          <p className="text-sm opacity-75">Press "Start Show" to begin the presentation</p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-curtain-gold opacity-30"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-curtain-gold opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-curtain-gold opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-curtain-gold opacity-30"></div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;