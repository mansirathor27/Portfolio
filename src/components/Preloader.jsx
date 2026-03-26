import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    "INITIALIZING NEURAL INTERFACE...",
    "SYNCING BIOMETRICS...",
    "LOADING ASSETS...",
    "ESTABLISHING SECURE CONNECTION...",
    "BOOTING SYSTEM..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [setLoading, texts.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-deep"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative h-48 w-48 flex items-center justify-center">
        {/* Glowing Rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyber-purple/20 border-t-cyber-cyan shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-cyber-neon/20 border-b-cyber-crimson shadow-[0_0_20px_rgba(255,0,85,0.3)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Percentage */}
        <div className="text-4xl font-bold text-white neon-text-glow">
          {progress}%
        </div>
      </div>

      <motion.div
        className="mt-8 h-1 w-64 overflow-hidden rounded-full bg-white/5"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </motion.div>

      <motion.p
        className="mt-4 text-xs tracking-[0.3em] text-cyber-cyan/60 uppercase"
        key={textIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {texts[textIndex]}
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
