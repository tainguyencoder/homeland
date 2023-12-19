import { a } from '@react-spring/three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import skyScene from '../assets/3d/sky.glb';

export function Sky({ isRotating, ...props }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  // useFrame((_, delta) => {
  //   if (isRotating) {
  //     skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
  //   }
  // });
  useFrame(() => {
    // Rotate the logo around the vertical axis
    if (skyRef.current) {
      skyRef.current.rotation.y += props.rotationSpeed || 0;
    }
  });
  return (
    <group rotation={[-Math.PI / -2, 0, 0]}>
    <mesh ref={skyRef} scale={500} rotation={[-Math.PI / 2, 0, 0]}>
      {/* use the primitive element when you want to directly embed a complex 3D model or scene */}
      <primitive object={sky.scene} />
    </mesh>

    </group>
  );
}
