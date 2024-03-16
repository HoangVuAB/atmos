import { OrbitControls } from '@react-three/drei';

import { Background } from './Background';
import { Airplane } from './Airplane';
import { Cloud } from './Cloud';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <Background />
      <Airplane
        scale={[0.0015, 0.0015, 0.0015]}
        rotation-y={Math.PI}
        rotation-x={Math.PI / 16}
        position-y={0.1}
      />

      <Cloud scale={[0.2, 0.3, 0.6]} position={[-2, 1, 3]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[-1, 3, 5]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[1, 3, 4]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[4, 5, 1]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[3, -2, 0]} />
    </>
  );
};
