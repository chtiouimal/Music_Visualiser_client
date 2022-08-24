import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function MvHeart({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/assets%2Fheart.gltf?alt=media&token=52cc9022-0788-45f5-b13e-1fc206be7960",
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Color}
        position={[1, 1.02, -0.11]}
        rotation={[0, 0, -Math.PI / 4]}
      />
    </group>
  );
}

useGLTF.preload(
  "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/assets%2Fheart.gltf?alt=media&token=52cc9022-0788-45f5-b13e-1fc206be7960",
);
