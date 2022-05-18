import React, { useState, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import particleOptions from './particles.json';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });
  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };
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
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prevState) => ({
                ...prevState,
                entries: count.entries,
              }));
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setInput('');
      setImageUrl('');
      setBox({});
      setRoute('');
      setIsSignedIn(false);
      setUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      });
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  return (
    <div className='App'>
      <Particles options={particleOptions} init={particlesInit} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === 'signin' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
