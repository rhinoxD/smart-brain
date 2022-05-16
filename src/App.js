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
  const [box, setBox] = useState({});
  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = +image.width;
    const height = +image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayFaceBox = (box) => {
    setBox(box);
  };
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));
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
      <FaceRecognition box={box} imageUrl={imageUrl} />
    </div>
  );
}

export default App;
