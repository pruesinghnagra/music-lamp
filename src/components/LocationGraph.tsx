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

  // Connect artist to region
  const regionId = `region-${artist.region}`;
  if (!nodes.has(regionId)) {
    nodes.set(regionId, { id: regionId, name: artist.region, type: 'region' });
  }
  links.push({ source: artistId, target: regionId });

  // Connect artist to each genre
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

export default function ArtistGraph3D() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="type"
        nodeLabel="name"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => Math.random() * 0.01}
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node) => {
          // Create glowing spheres for region (location) nodes
          if (node.type === 'region') {
            // Inner glowing sphere
            const geometry = new THREE.SphereGeometry(5, 16, 16);
            const material = new THREE.MeshBasicMaterial({
              color: 0x00ff88,
              transparent: true,
              opacity: 0.8,
            });
            const sphere = new THREE.Mesh(geometry, material);

            // Outer glow effect
            const glowGeometry = new THREE.SphereGeometry(8, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
              color: 0x00ff88,
              transparent: true,
              opacity: 0.3,
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);

            // Group them together
            const group = new THREE.Group();
            group.add(sphere);
            group.add(glow);

            return group;
          }

          // Pink pulsing cubes for genres
          if (node.type === 'genre') {
            const geometry = new THREE.BoxGeometry(6, 6, 6);
            const material = new THREE.MeshStandardMaterial({
              color: 0xff1493, // Deep pink
              emissive: 0x330011,
              transparent: true,
              opacity: 0.9,
            });
            const cube = new THREE.Mesh(geometry, material);

            // Add pulsing animation
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const pulse = Math.sin(elapsed * 0.003) * 0.3 + 0.7;
              cube.scale.setScalar(pulse);
              requestAnimationFrame(animate);
            };
            animate();

            return cube;
          }

          // Default sprite text for artist and genre nodes
          const sprite = new SpriteText(node.name);
          sprite.color = node.color || '#ffffff';
          sprite.textHeight = 8;
          return sprite;
        }}
      />
    </div>
  );
}
