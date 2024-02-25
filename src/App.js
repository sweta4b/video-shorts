import React from 'react';
import { videoData } from './videoData';
import './App.css';
import SingleReel from './SingleReel';

export default function App() {
  return (
    <div className="App">
      <center>
        <div className="video-container" id="video-container">
          {videoData.map((list, i) => (
            <SingleReel
              key={i}
              url={list.url}
              title={list.title}
            />
          ))}
        </div>
      </center>
    </div>
  )
}

