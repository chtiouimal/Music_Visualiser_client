/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const url =
  "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/assets%2FvoteIcon.gltf?alt=media&token=8743b313-b208-4738-9596-8678498b656b";

export default function MvVoteIcon({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(url);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle.geometry}
        material={materials["Material.001"]}
        position={[0, 1.9, -0.05]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["Material.003"]}
        position={[0, 1.54, 0]}
        scale={1.51}
      />
    </group>
  );
}

useGLTF.preload(url);