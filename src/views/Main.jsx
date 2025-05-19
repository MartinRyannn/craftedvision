import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import Container1 from "../components/Container1";
import Container2 from "../components/Container2";
import Container3 from "../components/Container3";
import Container4 from "../components/Container4";
import Container5 from '../components/Container5';
import '../styles/LoadingScreen.scss'

function Main() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);
  const mainWrapperRef = useRef(null);
  const loadStartTime = useRef(Date.now());
  const scrollTimeout = useRef(null);
  const sectionRefs = useRef([]);
  
  // Initialize section refs
  const setSectionRef = (el, index) => {
    sectionRefs.current[index] = el;
  };

  const preloadContent = useCallback(async () => {
    if (!mainWrapperRef.current) return;

    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    let currentScroll = 0;
    let loadedElements = 0;
    let totalElements = 0;

    const trackProgress = (loaded, total) => {
      loadedElements = loaded;
      totalElements = total;
      const progress = Math.min((loadedElements / totalElements) * 100, 100);
      setLoadingProgress(progress);
    };

    const loadImagesInView = async () => {
      const images = document.querySelectorAll('img');
      const videos = document.querySelectorAll('video');
      
      totalElements = images.length + videos.length;
      if (totalElements === 0) {
        trackProgress(1, 1);
        return;
      }

      const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            loadedElements++;
            trackProgress(loadedElements, totalElements);
            resolve();
          } else {
            img.onload = () => {
              loadedElements++;
              trackProgress(loadedElements, totalElements);
              resolve();
            };
            img.onerror = () => {
              loadedElements++;
              trackProgress(loadedElements, totalElements);
              resolve();
            };
          }
        });
      });

      const videoPromises = Array.from(videos).map(video => {
        return new Promise((resolve) => {
          if (video.readyState >= 4) {
            loadedElements++;
            trackProgress(loadedElements, totalElements);
            resolve();
          } else {
            video.onloadeddata = () => {
              loadedElements++;
              trackProgress(loadedElements, totalElements);
              resolve();
            };
            video.onerror = () => {
              loadedElements++;
              trackProgress(loadedElements, totalElements);
              resolve();
            };
          }
        });
      });

      await Promise.all([...imagePromises, ...videoPromises]);
    };

    const simulateScroll = async () => {
      while (currentScroll < totalHeight) {
        window.scrollTo(0, currentScroll);
        await new Promise(resolve => setTimeout(resolve, 100));
        currentScroll += viewportHeight / 2;
        await loadImagesInView();
      }
      window.scrollTo(0, 0);
    };

    await simulateScroll();
    const minimumLoadingTime = 4000;
    const timeElapsed = Date.now() - loadStartTime.current;
    
    if (timeElapsed < minimumLoadingTime) {
      await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - timeElapsed));
    }

    setPreloadComplete(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
    if (loading) {
      preloadContent();
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading, preloadContent]);

  useEffect(() => {
    if (preloadComplete) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [preloadComplete]);

  // Set up Intersection Observer to detect which section is visible
  useEffect(() => {
    if (loading) return; // Don't set up observer while loading
    
    // Options for the observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Consider element visible when 50% is in view
    };
    
    // Callback when intersection changes
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the index from the data attribute
          const sectionIndex = parseInt(entry.target.dataset.index, 10);
          
          // Update active section
          setActiveSection(sectionIndex);
          
          // Update dots
          const dots = document.querySelectorAll('.scrollDot');
          if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
              if (index === sectionIndex) {
                dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
            });
          }
        }
      });
    };
    
    // Create observer
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Get all sections and observe them
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((section, index) => {
      // Add data-index attribute to each section
      section.dataset.index = index;
      observer.observe(section);
    });
    
    // Clean up
    return () => {
      if (observer) {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      }
    };
  }, [loading]);
  
  // Show/hide scrollbar based on user activity
  useEffect(() => {
    let scrollbarTimeout;
    const handleUserActivity = () => {
      const scrollbar = document.querySelector('.scrollbarContainer');
      if (scrollbar) {
        scrollbar.classList.remove('hidden');
        clearTimeout(scrollbarTimeout);
        scrollbarTimeout = setTimeout(() => {
          scrollbar.classList.add('hidden');
        }, 3000); // Hide after 3 seconds of inactivity
      }
    };

    // Show scrollbar on mouse movement or scroll
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    
    // Initial trigger to show scrollbar
    handleUserActivity();

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      clearTimeout(scrollbarTimeout);
    };
  }, [loading]);
  
  // Set scrolling state when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      setIsScrolling(true);
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('.scroll-section');
    if (sections[index]) {
      // Use scrollIntoView for smoother scrolling
      sections[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active section immediately for better UX
      setActiveSection(index);
      
      // Update dots directly
      const dots = document.querySelectorAll('.scrollDot');
      if (dots && dots.length > 0) {
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      setIsScrolling(true);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };
  


  return (
    <div className="mainWrapper" ref={mainWrapperRef}>
      {loading && (
        <div className={`loading-screen ${preloadComplete ? 'fade-out' : ''}`}>
          <svg className="filters">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
                <stop offset="50%" stopColor="rgba(255,255,255,0.8)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="loading-content">
            <div className="logo">
              <div className="logo-text">
                <span className="letter special">C</span>
                <span className="letter">r</span>
                <span className="letter">a</span>
                <span className="letter">f</span>
                <span className="letter">t</span>
                <span className="letter">e</span>
                <span className="letter">d</span>
                <span className="letter special">V</span>
                <span className="letter">i</span>
                <span className="letter">s</span>
                <span className="letter">i</span>
                <span className="letter">o</span>
                <span className="letter">n</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${loadingProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className={`scrollbarContainer fade-in-right ${loading ? 'hidden' : ''}`}>
        <div className="scrollBox">
          <div className="scrollBoxBar" />
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`scrollDot ${index === 0 ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              data-index={index}
            />
          ))}
          <div className="scrollBoxBar" />
        </div>
      </div>

      <div className="scroll-section" data-index="0"><Container1 /></div>
      <div className="scroll-section" data-index="1"><Container4 /></div>
      <div className="scroll-section" data-index="2"><Container3 /></div>
      <div className="scroll-section" data-index="3"><Container2 /></div>
      <div className="scroll-section" data-index="4"><Container5 /></div>
    </div>
  );
}

export default Main;