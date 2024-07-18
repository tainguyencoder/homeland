import { Link } from 'react-router-dom';

import { arrow } from '../assets/icons';

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1) return null;
  if (currentStage === 2) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Hi, I'm
          <span className="font-semibold mx-2 text-white">Tai Nguyen</span>
          👋
          <br />
          A Front-end Developer from Vietnam 🇻🇳
          <br />
        </p>

        <Link
          to="https://tainguyencoder.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-brutalism-white neo-btn"
        >
          Visit my portfolio
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Explore all of my personal projects <br />
          It might make you feel intrigued
        </p>

        <Link
          to="https://github.com/tainguyencoder?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-brutalism-white neo-btn"
        >
          Learn more
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className="info-box">
        <p className="font-medium text-center sm:text-xl">
          Feel like talking more with me ? <br />
          Connect with me !!!
        </p>

        <Link to="/contact" className="neo-brutalism-white neo-btn">
        Get in contact
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  if (currentStage === 5) {
    return (
      <div className="info-box">
        <p className="font-medium sm:text-xl text-center">
          Want me building stuff for you ?
          <br /> Hit me on LinkedIn
        </p>

        <Link
          to="https://www.linkedin.com/in/taithanhnguyen210396/"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-brutalism-white neo-btn"
        >
          Let's talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
