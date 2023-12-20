/* eslint-disable react/no-unknown-property */
import { a } from '@react-spring/three';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import logoScene from '../assets/3d/logo.glb';

export function Logo ({...props}) {
  const logoRef = useRef();

  const { nodes, materials } = useGLTF(logoScene);
  useFrame(() => {
    // Rotate the logo around the vertical axis
    if (logoRef.current) {
      logoRef.current.rotation.y += -props.rotationSpeed || 0;
    }
  });
  return (
    <a.group ref={logoRef} {...props}>
      <group rotation={[-Math.PI / -256, 0, 0]}>
        <primitive object={nodes._rootJoint} />
        <mesh
          geometry={nodes.Object_247.geometry}
          material={materials.material}
          skeleton={nodes.Object_247.skeleton}
        />
        <mesh
          geometry={nodes.Object_248.geometry}
          material={materials.material_1}
          skeleton={nodes.Object_248.skeleton}
        />
        <mesh
          geometry={nodes.Object_249.geometry}
          material={materials.material_2}
          skeleton={nodes.Object_249.skeleton}
        />
        <mesh
          geometry={nodes.Object_250.geometry}
          material={materials.material_3}
          skeleton={nodes.Object_250.skeleton}
        />
        <mesh
          geometry={nodes.Object_251.geometry}
          material={materials.material_4}
          skeleton={nodes.Object_251.skeleton}
        />
        <mesh
          geometry={nodes.Object_252.geometry}
          material={materials.material_5}
          skeleton={nodes.Object_252.skeleton}
        />
      </group>
    </a.group>
  );
};
