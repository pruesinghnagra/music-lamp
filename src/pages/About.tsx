import { useEffect, useState } from 'react';
import { fetchArtists } from '../utilities/fetch-artists';

function About() {
  useEffect(() => {
    fetchArtists().then((data) => {
      return console.log(data);
    });
  }, []);

  return <h1>what is here?</h1>;
}

export default About;
