/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Torri(props) {
  const { nodes, materials } = useGLTF('./models/toori.glb');
  return (
    <group {...props} dispose={null}>
      <group position={[0, 2.884, 0]} scale={0.01}>
        <group position={[212.386, -288.372, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh.geometry}
            material={materials.Rojo}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_1.geometry}
            material={materials.Amarillo}
          />
        </group>
        <group position={[-212.386, -288.372, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh001.geometry}
            material={materials.Rojo}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh001_1.geometry}
            material={materials.Amarillo}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Forma.geometry}
          material={materials.Rojo}
          position={[0, 118.49, 0]}
          scale={[1.081, 1, 1]}
        />
        <group position={[0, 227.544, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003.geometry}
            material={materials.Rojo}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh003_1.geometry}
            material={materials.Material}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/toori.glb');