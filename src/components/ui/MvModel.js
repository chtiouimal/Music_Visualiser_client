import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { Suspense, useContext, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";

function MvModel({ url, data, circlePos, rotateObj, ...props }) {
  const { dataContext } = useContext(PlayerContext);
  const group = useRef();
  const ref = useRef();
  const texture = useTexture(url);
  const disc = useTexture(
    "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/Backgrounds%2Fdisc_texture.png?alt=media&token=f29e142d-ce4d-422c-a03c-d24a7b956e5a",
  );

  useFrame(
    ({ clock }) =>
      rotateObj && (ref.current.rotation.z = clock.getElapsedTime()),
  );

  return (
    <Suspense callback={null}>
      <mesh ref={group} {...props}>
        <planeBufferGeometry attach="geometry" args={[2.2, 2.8]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      <mesh
        ref={ref}
        size={props.size}
        rotation={props.rotation}
        position={circlePos}
      >
        <circleBufferGeometry attach="geometry" args={[4, 100]} />
        <meshBasicMaterial attach="material" map={disc} />
      </mesh>
    </Suspense>
  );
}

export default MvModel;
