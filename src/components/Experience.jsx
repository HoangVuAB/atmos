import * as THREE from 'three';
import { Float, PerspectiveCamera, Text, useScroll } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { Background } from './Background';
import { Airplane } from './Airplane';
import { Cloud } from './Cloud';

// line number of point
const LINE_NB_POINTS = 1000;
const CURVE_DISTACE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

export const Experience = () => {
  // curve to plane follow

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -CURVE_DISTACE),
        new THREE.Vector3(100, 0, -2 * CURVE_DISTACE),
        new THREE.Vector3(-100, 0, -3 * CURVE_DISTACE),
        new THREE.Vector3(100, 0, -4 * CURVE_DISTACE),
        new THREE.Vector3(0, 0, -5 * CURVE_DISTACE),
        new THREE.Vector3(0, 0, -6 * CURVE_DISTACE),
        new THREE.Vector3(0, 0, -7 * CURVE_DISTACE),
      ],
      false,
      'catmullrom',
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    // adjust shape width
    shape.moveTo(0, -0.02);
    shape.lineTo(0, 0.02);
    return shape;
  }, [curve]);

  const cameraGroup = useRef();

  const scroll = useScroll();

  useFrame((_state, delta) => {
    const scrollOffset = Math.max(0, scroll.offset);

    const curPoint = curve.getPoint(scrollOffset);

    // make camear follow the curve
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    //  Make a group look ahead on the curve
    const lookAtPoint = curve.getPoint(
      Math.min(scroll.offset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );

    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);

    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    // Air plane rotation handle
    const tanget = curve.getTangent(scrollOffset + CURVE_AHEAD_AIRPLANE);
    const nonLerpLookAt = new THREE.Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tanget.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tanget.z, tanget.x);
    angle = -Math.PI / 2 + angle;
    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4; // make angle stronger

    // LIMIT PLANE ANGLE
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
  });

  const airplane = useRef();

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}

      <group ref={cameraGroup}>
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />

        <Background />
        <group ref={airplane}>
          <Float rotationIntensity={0.2} floatIntensity={3}>
            <Airplane
              scale={[0.001, 0.001, 0.001]}
              rotation-y={Math.PI}
              rotation-x={Math.PI / 16}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>

      {/* TEXT  */}

      <group position={[-3, 0, -20]}>
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.22}
          maxWidth={2.4}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque
          officia fugiat quasi! Facere, atque. Iste delectus odit nobis expedita
          iusto id exercitationem voluptatum enim, laboriosam aliquid eius
          dolorum. Enim, nulla!
        </Text>
      </group>
      <group position={[1, 0, -10]}>
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.22}
          maxWidth={2.4}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          voluptatibus cum officiis, perferendis ratione est magnam sunt nihil
          facilis maiores? Quod commodi modi illo dolor dicta libero officiis
          deleniti sed!
        </Text>
      </group>
      <group position={[-3, 0, -20]}>
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.22}
          maxWidth={2.4}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore,
          quas! Sunt, harum temporibus? Aspernatur, commodi, similique adipisci
          quis quos facere, repellendus dolorem aut quo minus perspiciatis!
          Voluptates sunt obcaecati nulla.
        </Text>
      </group>

      {/* LINE  */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color="white" opacity={1} transparent />
        </mesh>
      </group>

      <Cloud scale={[0.2, 0.3, 0.6]} position={[-2, 1, 3]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[-1, 3, 5]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[1, 3, 4]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[4, 5, 1]} />
      <Cloud scale={[0.2, 0.3, 0.6]} position={[3, -2, 0]} />
    </>
  );
};
