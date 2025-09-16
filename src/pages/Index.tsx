import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Slideshow from "@/components/Slideshow";
import AudioPlayer from "@/components/AudioPlayer";

const Index = () => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleStartShow = () => {
    setShowSlideshow(true);
    setIsAudioPlaying(true);
  };

  const handleCloseShow = () => {
    setShowSlideshow(false);
    setIsAudioPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingPage onStartShow={handleStartShow} />
      <Slideshow isVisible={showSlideshow} onClose={handleCloseShow} />
      <AudioPlayer isPlaying={isAudioPlaying} />
    </div>
  );
};

export default Index;
