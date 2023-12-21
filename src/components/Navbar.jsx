import { NavLink } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Logo } from '../models';

const Navbar = () => {
  const adjustLogoForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth <= 365) {
      screenScale = [1, 1, 1];
      screenPosition = [-4, 0, 0.5];
    } else if (window.innerWidth <= 640) {
      screenScale = [1.7, 1.7, 1.7];
      screenPosition = [-4, 0.5, 0.5];
    } else if (window.innerWidth <= 768) {
      screenScale = [2.3, 2.3, 2.3];
      screenPosition = [-3, -2.5, 0.5];
    } else if (window.innerWidth <= 1024) {
      screenScale = [2.6, 2.6, 2.6];
      screenPosition = [-3, -2.5, 0.5];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [-3, -2.5, 0.5];
    }

    return [screenScale, screenPosition];
  };

  const [logoScale, logoPosition] = adjustLogoForScreenSize();
  return (
    <header className="header">
      <NavLink to="/">
        <section>
          <Canvas camera={{ near: 0.1, far: 100 }}>
            <Suspense>
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
              <Logo
                rotationSpeed={0.01}
                scale={logoScale}
                position={logoPosition}
              />
            </Suspense>
          </Canvas>
        </section>
      </NavLink>
    </header>
  );
};

export default Navbar;
