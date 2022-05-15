import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import particleOptions from './particles.json';
import './App.css';

function App() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  return (
    <div className='App'>
      <Particles options={particleOptions} init={particlesInit} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
