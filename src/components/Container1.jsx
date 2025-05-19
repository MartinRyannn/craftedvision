import { useState, useEffect } from 'react';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import '../styles/styles.scss'

const Container1 = () => {
  const [showShootingStar, setShowShootingStar] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const createShootingStar = () => {
      if (!showShootingStar) {
        setShowShootingStar(true);
      }
    };

    const scheduleNextStar = () => {
      const delay = Math.random() * (15000 - 5000) + 5000;
      return setTimeout(createShootingStar, delay);
    };

    const timerId = scheduleNextStar();
    return () => clearTimeout(timerId);
  }, [showShootingStar]);

  const handleStarAnimationEnd = () => {
    setShowShootingStar(false);
  };

  const scrollToNext = () => {
    const containers = document.querySelectorAll('.scroll-section');
    if (containers[1]) {
      // Get the next section
      const nextSection = containers[1];
      // Use scrollIntoView for smoother animation
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={`container1 ${isLoaded ? 'loaded' : ''}`}>
      <div className="coverScreen">
        {showShootingStar && (
          <ShootingStar onAnimationEnd={handleStarAnimationEnd} />
        )}
        <div className="landingTop fade-in-up">
          <div className="topTextBox">
            <div className="topTextTop">Web Development Agency</div>
            <div className="topTextBot">Base On <span>Latvia</span></div>
          </div>
          <div className="topTextBox">
            <div className="topTextTop">24/7 Support</div>
            <div className="topTextBot"><span>craftedteam@gmail.com</span></div>
          </div>
        </div>
        <div className="leftSidebar fade-in-left">
          <div className="logo"><span>C</span>ra<span>V</span>i</div>
          <div className="sidebarText">
            <div className="textSection">
              <div className="textBox">Web Design</div>
              <div className="textBox">Domain Hosting</div>
              <div className="textBox">Site Management</div>
            </div>
            <div className="textSection">
              <div className="textBox">Modern Designs</div>
              <div className="textBox">Easy To Use</div>
              <div className="textBox">Responsive</div>
            </div>
            <div className="textSection">
              <div className="textBox">Budget Friendly</div>
              <div className="textBox">Fast Service</div>
            </div>
            <div className="textSection">
              <div className="textBox">Support</div>
            </div>
          </div>
        </div>
        <div className="mainTextContainer fade-in-up">
          <div className="mainText"><span>C</span>rafted <span>V</span>ision</div>
          <div className="paragraph">Providing Modern, Creative, and Impactful Websites That Elevate Your Brand and Drive Success!</div>
        </div>
        <div className="topRight fade-in-right">
          <button className="talkBtn">Let's Talk</button>
          <button className="menuButton"></button>
        </div>

        <div className="jumpBtn fade-in-up" onClick={scrollToNext}>
          <svg width="140" height="140" className="dashed-circle">
            <circle cx="70" cy="70" r="69" fill="none" stroke="rgba(255, 255, 255, 0.507)" strokeWidth="1.5" strokeDasharray="10,10" className="circle-path"/>
          </svg>
          <HiOutlineChevronDoubleDown className="arrowIcon" />
        </div>
        <div className="bottomBar fade-in-up">
          <div className="bottomText">
            <div className="scrolling-content">
              <span className="text-white">Premium Web Solutions</span> - 
              <span className="text-green">Cutting-Edge Development</span> - 
              <span className="text-white">24/7 Expert Support</span> - 
              <span className="text-green">Responsive Design</span> - 
              <span className="text-white">Cloud Hosting</span> - 
              <span className="text-green">SEO Optimization</span> - 
              <span className="text-white">Custom Solutions</span> - 
              <span className="text-green">Modern UI/UX</span> - 
              <span className="text-white">Secure & Scalable</span> - 
              <span className="text-green">Performance Focused</span>
            </div>
            <div className="scrolling-content" aria-hidden="true">
              <span className="text-white">Premium Web Solutions</span> - 
              <span className="text-green">Cutting-Edge Development</span> - 
              <span className="text-white">24/7 Expert Support</span> - 
              <span className="text-green">Responsive Design</span> - 
              <span className="text-white">Cloud Hosting</span> - 
              <span className="text-green">SEO Optimization</span> - 
              <span className="text-white">Custom Solutions</span> - 
              <span className="text-green">Modern UI/UX</span> - 
              <span className="text-white">Secure & Scalable</span> - 
              <span className="text-green">Performance Focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShootingStar = ({ onAnimationEnd }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 30;
  
  return (
    <div className="shooting-star" style={{ '--start-x': `${startX}%`, '--start-y': `${startY}%` }} onAnimationEnd={onAnimationEnd} />
  );
};

export default Container1;