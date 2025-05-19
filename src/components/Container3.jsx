import { useState, useEffect } from 'react';
import '../styles/styles3.scss';

function Container3() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const projects = [
    {
      type: "Web Design",
      title: "Modern Cafe Website",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "Web Design",
      title: "Creative Agency Portfolio",
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "E-commerce",
      title: "Fashion Store Website",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "UI/UX Design",
      title: "Travel App Interface",
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "Branding",
      title: "Tech Startup Identity",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "Web Design",
      title: "Educational Platform",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "UI/UX Design",
      title: "Travel App Interface",
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "Branding",
      title: "Tech Startup Identity",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      type: "Web Design",
      title: "Educational Platform",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const displayedProjects = isExpanded ? projects : projects.slice(0, 6);

  const toggleExpand = () => {
    if (isExpanded) {
      setIsClosing(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsClosing(false);
      }, 800);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section className={`container3 ${isExpanded ? 'expanded' : ''} ${isLoaded ? 'loaded' : ''} ${isClosing ? 'closing' : ''}`}>
      <div className="topHeading3">
        <div className="miniHeading cwhite nopad">Our Work</div>
        <h1 className="largeHeading cgreen nopad">Our Latest Creative Work</h1>
      </div>
      
      <div className="projectsSmallBox">
        {displayedProjects.map((project, index) => (
          <div 
            className="project"
            key={index}
            style={{"--delay": `${index * 0.08}s`}}
          >
            <div className="projectImg">
              <img src={project.image} alt={project.title} />
              <div className="overlay">
                <div className="project-info">
                  <span className="view-project">View Project</span>
                </div>
              </div>
            </div>
            <div className="projectTitleBox">
              <div className="projectTitle small">{project.type}</div>
              <div className="projectTitle">{project.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="buttonContainer">
        <button 
          className={`toggleBtn ${isExpanded ? 'expanded' : ''}`}
          onClick={toggleExpand}
        >
          <span className="button-text">{isExpanded ? 'Show Less' : 'See More'}</span>
          <span className="button-icon"></span>
        </button>
      </div>
    </section>
  );
}

export default Container3;