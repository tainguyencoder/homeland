import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import dragonScene from "../assets/3d/dragon.glb";

export function Dragon({ isRotating, ...props }) {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(dragonScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  // Use an effect to control the dragon's animation based on 'isRotating'
  useEffect(() => {
    if (isRotating) {
      actions["RideFlyRun"].play();
    } else {
      actions["RideFlyRun"].stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}