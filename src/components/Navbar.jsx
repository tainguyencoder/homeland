import { NavLink } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Logo } from '../models';

const Navbar = () => {
  const adjustLogoForScreenSize = () => {
    let screenScale;

    if (window.innerWidth <= 365) {
      screenScale = [1.6, 1.6, 1.6];
    } else if (window.innerWidth <= 640) {
      screenScale = [1.8, 1.8, 1.8];
    } else if (window.innerWidth <= 768) {
      screenScale = [2.2, 2.2, 2.2];
    } else if (window.innerWidth <= 1024) {
      screenScale = [2.6, 2.6, 2.6];
    } else {
      screenScale = [3, 3, 3];
    }

    return screenScale;
  };

  const logoScale = adjustLogoForScreenSize();
  return (
    <header className="header">
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
            <Logo rotationSpeed={0.01} scale={logoScale} position={[-3, -2.5, 0.5]} />
          </Suspense>
        </Canvas>
      </section>
      {/* <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-blue-600' : 'text-black'
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? 'text-blue-600' : 'text-black'
          }
        >
          PROJECTS
        </NavLink>
      </nav> */}
    </header>
  );
};

export default Navbar;
