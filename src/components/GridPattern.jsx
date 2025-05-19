import React from 'react';
import { Phone, PenTool, FastForward, Layout, Wrench, Sliders, Gift, Smile } from 'lucide-react';
import '../styles/GridPattern.scss';

const features = [
    { icon: <Phone size={40} />, text: 'FREE CONSULTATIONS' },
    { icon: <PenTool size={40} />, text: 'CUSTOM DESIGN' },
    { icon: <FastForward size={40} />, text: 'FAST SERVICES' },
    { icon: <Layout size={40} />, text: 'MODERN WEBSITES' },
    { icon: <Wrench size={40} />, text: 'MAINTENANCE' },
    { icon: <Sliders size={40} />, text: 'EASY CUSTOMISATION' },
    { icon: <Gift size={40} />, text: 'EXTRA SERVICES' },
    { icon: <Smile size={40} />, text: 'CUSTOMER SATISFACTION' },
];

const GridPattern = () => {
    return (
        <div className="grid-container">
            {features.map((feature, index) => (
                <div key={index} className="grid-item">
                    <div className="icon">{feature.icon}</div>
                    <p>{feature.text}</p>
                </div>
            ))}
        </div>
    );
};

export default GridPattern;
