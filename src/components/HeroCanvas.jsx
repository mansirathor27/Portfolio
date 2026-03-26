import React, { useRef } from 'react'; // Removed useMemo
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial, Grid } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

function Particles(props) {
  const ref = useRef();
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Rig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const HeroCanvas = () => {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#667eea" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0055" />
        
        <React.Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <Grid
              sectionSize={3}
              sectionThickness={1.5}
              sectionColor="#667eea"
              fadeDistance={30}
              cellSize={0.6}
              cellThickness={1}
              cellColor="#00d4ff"
              infiniteGrid
            />
          </group>

          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[1, 64, 64]} position={[0, 1, -2]}>
              <MeshDistortMaterial
                color="#764ba2"
                speed={4}
                distort={0.5}
                radius={1}
                emissive="#667eea"
                emissiveIntensity={0.5}
              />
            </Sphere>
          </Float>
          
          <Particles />
        </React.Suspense>
        <Rig />
      </Canvas>
    </CanvasContainer>
  );
};

export default HeroCanvas;