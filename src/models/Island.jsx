/* eslint-disable react/no-unknown-property */
import { a } from '@react-spring/three';
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import islandScene from '../assets/3d/island.glb';

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.05 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.7 && normalizedRotation <= 5:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });


  // useFrame(({ clock }) => {
  //   if (!isRotating) {
  //     const elapsedTime = clock.getElapsedTime();
  //     const rotationY = elapsedTime * 0;

  //     islandRef.current.rotation.set(0, rotationY, 0);

  //     // Normalize the rotation value
  //     const normalizedRotation =
  //       ((rotationY % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  //     // Tính toán currentStage dựa trên góc xoay
  //     switch (true) {
  //       case normalizedRotation >= 0 && normalizedRotation < (2 * Math.PI) / 3:
  //         setCurrentStage(1);
  //         break;
  //       case normalizedRotation >= (2 * Math.PI) / 3 && normalizedRotation < (4 * Math.PI) / 3:
  //         setCurrentStage(2);
  //         break;
  //       case normalizedRotation >= (4 * Math.PI) / 3 && normalizedRotation < (2 * Math.PI):
  //         setCurrentStage(3);
  //         break;
  //       default:
  //         setCurrentStage(null);
  //     }
  //   }
  // });

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.Final_Bridge1_SF_Bridge_Mat001_0.geometry}
        material={materials['SF_Bridge_Mat.001']}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Roof_Final_0.geometry}
        material={materials.SF_Roof_Final}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Roof_Final_0_1.geometry}
        material={materials.SF_Roof_Final}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Roof_Final_0_2.geometry}
        material={materials.SF_Roof_Final}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Roof_Final_0_3.geometry}
        material={materials.SF_Roof_Final}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Rocks_Mat_0.geometry}
        material={materials.SF_Rocks_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Windows_Mat_0.geometry}
        material={materials.SF_Windows_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_1.geometry}
        material={materials.SF_Windows_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Windows_Mat_0_2.geometry}
        material={materials.SF_Windows_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Bush_Mat_0.geometry}
        material={materials.SF_Bush_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0.geometry}
        material={materials.SF_TreeWood_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_TreeWood_Mat_0_1.geometry}
        material={materials.SF_TreeWood_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_TreeLeaf_Mat_0.geometry}
        material={materials.SF_TreeLeaf_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_HouseSupport_Mat_0.geometry}
        material={materials.SF_HouseSupport_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_HouseJoins_Mat_0.geometry}
        material={materials.SF_HouseJoins_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Chimney_Mat_0.geometry}
        material={materials.SF_Chimney_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_CutRock_Mat_0.geometry}
        material={materials.SF_CutRock_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Stalagmites_Mat_0.geometry}
        material={materials.SF_Stalagmites_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_WoodTex_Mat_0.geometry}
        material={materials.SF_WoodTex_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_PlasterTex_Mat_0.geometry}
        material={materials.SF_PlasterTex_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_StoneBrick_Mat_0.geometry}
        material={materials.SF_StoneBrick_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Island_Mat_0.geometry}
        material={materials.SF_Island_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_LampGlass_Mat_0.geometry}
        material={materials.SF_LampGlass_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Lamp_Mat_0.geometry}
        material={materials.SF_Lamp_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Candle_Mat_0.geometry}
        material={materials.SF_Candle_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Grass_Mat_0.geometry}
        material={materials.SF_Grass_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Rail_Mat_0.geometry}
        material={materials.SF_Rail_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0.geometry}
        material={materials.SF_GrassCards_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_1.geometry}
        material={materials.SF_GrassCards_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_2.geometry}
        material={materials.SF_GrassCards_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_GrassCards_Mat_0_3.geometry}
        material={materials.SF_GrassCards_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Sack_Mat_0.geometry}
        material={materials.SF_Sack_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_MineCart_Mat_0.geometry}
        material={materials.SF_MineCart_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Bridge_Mat_0.geometry}
        material={materials.SF_Bridge_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Door_Mat_0.geometry}
        material={materials.SF_Door_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Water_Mat_0.geometry}
        material={materials.SF_Water_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_Final_Water001_0.geometry}
        material={materials['Final_Water.001']}
      />
      <mesh
        geometry={nodes.Final_Bridge1_Final_Rocks2_Mat_0.geometry}
        material={materials.Final_Rocks2_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_Black_0.geometry}
        material={materials.Black}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_ButterFly_Mat_0.geometry}
        material={materials.SF_ButterFly_Mat}
      />
      <mesh
        geometry={nodes.Final_Bridge1_SF_Lillypad_Mat_0.geometry}
        material={materials.SF_Lillypad_Mat}
      />
    </a.group>
  );
}
