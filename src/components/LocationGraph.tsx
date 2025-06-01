import { useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';

import { GraphNode, GraphLink } from '../types/Graph';
import { Artist } from '../types/Artist';

import mockArtistData from '../../public/mock-artists.json';

const nodes = new Map<string, GraphNode>();
const links: GraphLink[] = [];

const artistData = mockArtistData as Artist[];

artistData.forEach((artist) => {
  const artistId = `artist-${artist.artistName}`;
  nodes.set(artistId, {
    id: artistId,
    name: artist.artistName,
    type: 'artist',
    region: artist.region,
  });

  const regionId = `region-${artist.region}`;
  if (!nodes.has(regionId)) {
    nodes.set(regionId, { id: regionId, name: artist.region, type: 'region' });
  }
  links.push({ source: artistId, target: regionId });

  artist.genre.forEach((genre) => {
    const genreId = `genre-${genre}`;
    if (!nodes.has(genreId)) {
      nodes.set(genreId, { id: genreId, name: genre, type: 'genre' });
    }
    links.push({ source: artistId, target: genreId });
  });
});

const graphData = {
  nodes: Array.from(nodes.values()),
  links: links,
};

function makeGlowingSphere(): THREE.Object3D {
  const geometry = new THREE.SphereGeometry(5, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.8,
  });
  const sphere = new THREE.Mesh(geometry, material);

  const glowGeometry = new THREE.SphereGeometry(8, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.3,
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);

  const group = new THREE.Group();
  group.add(sphere);
  group.add(glow);

  return group;
}

function makeGenreCube(): THREE.Object3D {
  const geometry = new THREE.BoxGeometry(6, 6, 6);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff1493,
    emissive: 0x330011,
    transparent: true,
    opacity: 0.9,
  });

  return new THREE.Mesh(geometry, material);
}

function renderNodeObject(node: GraphNode): THREE.Object3D {
  switch (node.type) {
    case 'region':
      return makeGlowingSphere();
    case 'genre':
      return makeGenreCube();
    default: {
      const sprite = new SpriteText(node.name);
      sprite.color = '#ffffff';
      sprite.textHeight = 8;
      return sprite;
    }
  }
}

export default function ArtistGraph3D() {
  const [layoutReady, setLayoutReady] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="type"
        nodeLabel="name"
        nodeThreeObjectExtend={true}
        nodeThreeObject={renderNodeObject}
        onEngineStop={() => setLayoutReady(true)}
        linkDirectionalParticles={15}
        linkDirectionalParticleSpeed={() => Math.random() * 0.01}
      />
    </div>
  );
}
