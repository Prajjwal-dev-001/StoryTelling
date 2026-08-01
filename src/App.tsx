import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import StoryTimeline from "./components/StoryTimeline";
import PhotoGallery from "./components/PhotoGallery";
import MemoryCounter from "./components/MemoryCounter";
import AdmirationCards from "./components/AdmirationCards";
import MemoryGarden from "./components/MemoryGarden";
import UnsentLetters from "./components/UnsentLetters";
import LessonsPromises from "./components/LessonsPromises";
import FinalLetter from "./components/FinalLetter";
import FinalSurprise from "./components/FinalSurprise";
import Ending from "./components/Ending";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ background: "#000" }}>
      {/* Loading Screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content */}
      {loaded && (
        <>
          {/* 1. Hero */}
          <Hero />

          <SectionDivider color="#c084fc" />

          {/* 2. Story Timeline */}
          <StoryTimeline />

          <SectionDivider color="#818cf8" />

          {/* 3. Photo Gallery */}
          <PhotoGallery />

          <SectionDivider color="#c084fc" />

          {/* 4. Memory Counter */}
          <MemoryCounter />

          <SectionDivider color="#a855f7" />

          {/* 5. Admiration Cards — 100 cards */}
          <AdmirationCards />

          <SectionDivider color="#6ee7b7" />

          {/* 6. Memory Garden */}
          <MemoryGarden />

          <SectionDivider color="#c084fc" />

          {/* 7. Unsent Letters */}
          <UnsentLetters />

          <SectionDivider color="#fbbf24" />

          {/* 8. Lessons & Promises */}
          <LessonsPromises />

          <SectionDivider color="#c084fc" />

          {/* 9. Final Letter */}
          <FinalLetter />

          <SectionDivider color="#818cf8" />

          {/* 10. Final Surprise */}
          <FinalSurprise />

          {/* 11. Ending */}
          <Ending />
        </>
      )}
    </div>
  );
}
