"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loading screen in this session
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");
    
    if (hasLoadedBefore) {
      setIsLoading(false);
      return;
    }

    // Show loading screen for 3 seconds on first load
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoadedBefore", "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated logo container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.1, 1],
              opacity: [0, 1, 1]
            }}
            transition={{ 
              duration: 1.2,
              times: [0, 0.6, 1],
              ease: "easeOut"
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 blur-3xl bg-[#2d9bf0]/30 rounded-full -z-10"
            />
            
            {/* Logo */}
            <motion.div
              animate={{ 
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image 
                src={ayewarLogo} 
                alt="Ayewar" 
                width={200} 
                height={80}
                className="w-auto h-20 md:h-24"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 flex items-center gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 rounded-full bg-[#2d9bf0]"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
