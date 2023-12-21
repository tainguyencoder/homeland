/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Loader, HomeInfo } from '../components';
import { Sky, Island, Bird, Dragon } from '../models';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustDragonForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [19, 19, 19];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [29, 29, 29];
      screenPosition = [0, -2, -4];
    }


    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth <= 365) {
      screenScale = [0.6, 0.6, 0.6];
      screenPosition = [0, -6.5, -43.4];
    } else if (window.innerWidth <= 640) {
      screenScale = [0.7, 0.7, 0.7];
      screenPosition = [0, -6.5, -43.4];
    } else if (window.innerWidth <= 768) {
      screenScale = [0.7, 0.7, 0.7];
      screenPosition = [0, -6.5, -43.4];
    } else if (window.innerWidth <= 1024) {
      screenScale = [0.8, 0.8, 0.8];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1.05, 1.05, 1.05];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [dragonScale, dragonPosition] = adjustDragonForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />

          <Sky
            isRotating={isRotating}
            rotationSpeed={0.001}
            position={[0, 0, 0]}
          />

          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.2, 5, 0]}
            scale={islandScale}
          />
          <Dragon
            isRotating={isRotating}
            position={dragonPosition}
            rotation={[0, 20.2, 0]}
            scale={dragonScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
