import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
}

export function ImageCarousel({ images, interval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  }, [images.length]);

  useEffect(() => {
    if (!images || images.length <= 1 || isHovered) return;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (interval / 100));
      });
    }, 100);

    const timer = setInterval(nextImage, interval);
    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [images.length, interval, isHovered, nextImage]);

  if (!images || images.length === 0) return (
    <div className="w-full h-full bg-whisky-950/20 flex items-center justify-center">
      <Info className="w-8 h-8 text-white/20" />
    </div>
  );

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      x: direction > 0 ? 20 : -20
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      x: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
      x: direction < 0 ? 20 : -20
    })
  };

  const handleIndicatorClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-whisky-950 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
            scale: { duration: 1.2, ease: "easeOut" },
            x: { type: "spring", stiffness: 100, damping: 20 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt={`Whisky production step ${currentIndex + 1}`}
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-whisky-950/90 via-transparent to-whisky-950/30 pointer-events-none z-10" />

      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 z-30 pointer-events-none">
        <button 
          onClick={prevImage}
          className="p-2 rounded-full bg-black/40 text-white/50 hover:bg-amber-500 hover:text-black transition-all cursor-pointer pointer-events-auto backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={nextImage}
          className="p-2 rounded-full bg-black/40 text-white/50 hover:bg-amber-500 hover:text-black transition-all cursor-pointer pointer-events-auto backdrop-blur-md opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div 
          className="h-full bg-amber-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 z-30">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => handleIndicatorClick(i)}
            className="group relative p-1 transition-all"
          >
            <div className={cn(
              "h-1 rounded-full transition-all duration-500 bg-white/20",
              i === currentIndex ? "w-6 bg-amber-500" : "w-1.5 group-hover:bg-white/40"
            )} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 z-30 text-[11px] font-mono text-white/30 tracking-tightest pointer-events-none">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
