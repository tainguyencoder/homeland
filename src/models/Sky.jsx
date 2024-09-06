import { a } from '@react-spring/three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import skyScene from '../assets/3d/sky.glb';

export function Sky() {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  return (
    <mesh ref={skyRef} rotation={[0, Math.PI*2, 0]}>
      <primitive object={sky.scene} />
    </mesh>
  );
}
