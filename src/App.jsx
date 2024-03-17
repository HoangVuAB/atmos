/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';

import { Experience } from './components/Experience';

function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={['#ececec']} />

        <ScrollControls pages={20} damping={1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
