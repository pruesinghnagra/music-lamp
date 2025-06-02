import { useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';

import { getArtistsTopTracks } from '../api/spotify';
import { GraphNode, GraphLink } from '../types/Graph';

const textureCache = new Map<string, THREE.Texture>();

function makeAlbumSphere(imageUrl: string): THREE.Object3D {
  const geometry = new THREE.SphereGeometry(5, 32, 32);

  let material: THREE.MeshBasicMaterial;

  if (textureCache.has(imageUrl)) {
    material = new THREE.MeshBasicMaterial({
      map: textureCache.get(imageUrl),
    });
  } else {
    const texture = new THREE.TextureLoader().load(imageUrl);
    textureCache.set(imageUrl, texture);

    material = new THREE.MeshBasicMaterial({ map: texture });
  }

  return new THREE.Mesh(geometry, material);
}

function renderNodeObject(node: GraphNode): THREE.Object3D {
  if (node.type === 'album' && node.imageUrl) {
    return makeAlbumSphere(node.imageUrl);
  }

  const sprite = new SpriteText(node.name);
  sprite.color = node.type === 'artist' ? '#ffcc00' : '#ffffff';
  sprite.textHeight = node.type === 'artist' ? 12 : 6;
  return sprite;
}

export default function AmameliaGraph3D() {
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
    nodes: [],
    links: [],
  });
  const [audio] = useState(new Audio());

  function handleNodeClick(node: GraphNode) {
    if (node.type === 'track' && node.previewUrl) {
      audio.pause(); // stop any current playback
      audio.src = node.previewUrl;
      audio.play().catch((err) => console.error('Playback failed', err));
    }
  }

  useEffect(() => {
    async function buildGraph() {
      const tracks = await getArtistsTopTracks('7BjYtpKbFrgy8EX8REsjhW');

      const nodes = new Map<string, GraphNode>();
      const links: GraphLink[] = [];

      // Artist node
      const artistId = 'artist-Amamelia';
      nodes.set(artistId, {
        id: artistId,
        name: 'Amamelia',
        type: 'artist',
      });

      tracks.forEach((track: any) => {
        const trackId = `track-${track.id}`;
        const albumId = `album-${track.album.id}`;

        // Track node
        if (!nodes.has(trackId)) {
          nodes.set(trackId, {
            id: trackId,
            name: track.name,
            type: 'track',
            previewUrl: track.preview_url,
          });
        }

        // Album node
        if (!nodes.has(albumId)) {
          nodes.set(albumId, {
            id: albumId,
            name: track.album.name,
            type: 'album',
            imageUrl: track.album.images?.[0]?.url ?? '',
          });

          // Link from album = artist
          links.push({
            source: albumId,
            target: artistId,
          });
        }

        // Link from track = album
        links.push({
          source: trackId,
          target: albumId,
        });
      });

      setGraphData({ nodes: Array.from(nodes.values()), links });
    }

    buildGraph();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy="type"
        nodeLabel="name"
        nodeThreeObjectExtend={true}
        nodeThreeObject={renderNodeObject}
        onNodeClick={handleNodeClick}
        linkDirectionalParticles={10}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}
