import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = () => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      const newScale = 0.5 + window.scrollY / 1000;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <pointLight intensity={10} />
      <spotLight 
        position={[-20, 50, 10]} 
        angle={0.12}
        penumbra={10}
        intensity={100}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene} 
        scale={0.5}
        position={[0, -1.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25}}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxDistance={30}
          minDistance={10}
          maxPolarAngle={Math.PI}
          minPolarAngle={Math.PI / 4}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas