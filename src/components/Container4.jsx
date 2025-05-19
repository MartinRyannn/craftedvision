import React, { useState } from 'react';
import { Phone, PenTool, FastForward, Layout, Wrench, Sliders, Gift, Smile } from 'lucide-react';
import '../styles/styles4.scss'; 

const features = [
  { 
    icon: <Phone size={32} />, 
    title: 'Free Consultations',
    description: 'Get expert advice on your project needs'
  },
  { 
    icon: <PenTool size={32} />, 
    title: 'Custom Design',
    description: 'Tailored solutions for your unique brand'
  },
  { 
    icon: <FastForward size={32} />, 
    title: 'Fast Services',
    description: 'Quick turnaround without compromising quality'
  },
  { 
    icon: <Layout size={32} />, 
    title: 'Modern Websites',
    description: 'Cutting-edge web development solutions'
  },
  { 
    icon: <Wrench size={32} />, 
    title: 'Maintenance',
    description: 'Ongoing support and updates'
  },
  { 
    icon: <Sliders size={32} />, 
    title: 'Easy Customization',
    description: 'Flexible solutions that grow with you'
  },
  { 
    icon: <Gift size={32} />, 
    title: 'Extra Services',
    description: 'Additional features to enhance your project'
  },
  { 
    icon: <Smile size={32} />, 
    title: 'Customer Satisfaction',
    description: 'Your success is our priority'
  }
];

const Container4 = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="services-container">
      <div className="services-header">
        <span className="subtitle">Our Services</span>
        <h2 className="title">Elevating Your Digital Presence</h2>
      </div>
      
      <div className="services-grid">
        {features.map((feature, index) => (
          <div
            className={`service-card ${hoveredIndex === index ? 'hovered' : ''}`}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="service-content">
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Container4;