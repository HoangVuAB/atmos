/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';

import { Experience } from './components/Experience';
// import { Overlay } from './components/Overlay';

function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={['#ececec']} />

        <ScrollControls pages={20} damping={0.5}>
          <Experience />
        </ScrollControls>
      </Canvas>
      {/* <Overlay /> */}
    </>
  );
}

export default App;
