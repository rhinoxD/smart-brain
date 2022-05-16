import React, { useState, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Clarifai from 'clarifai';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import particleOptions from './particles.json';
import './App.css';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY,
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bouding_box
        );
      },
      function(err) {
        console.log(err);
      }
    );
  };
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  return (
    <div className='App'>
      <Particles options={particleOptions} init={particlesInit} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
