import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useContext, useRef } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import MvScene from "./MvScene";

function MvCanvas({ value }) {
  const { dataContext } = useContext(PlayerContext);
  const url =
    "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/Backgrounds%2FMuseum-1.png?alt=media&token=724ccd1e-1647-4325-9888-1ee8e46014ae";

  const Controls = (props) => {
    const { camera, gl } = useThree();
    const ref = useRef();

    useFrame(() => ref.current.update());

    return (
      <OrbitControls
        ref={ref}
        target={[0, 0, 0]}
        {...props}
        args={[camera, gl.domElement]}
        maxAzimuthAngle={dataContext.maxDistance}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={dataContext.minDistance}
        minPolarAngle={Math.PI / 2}
      />
    );
  };

  return (
    <Canvas camera={{ position: [0, 0, 0.1], rotation: [0, 0, 0] }}>
      <PlayerContext.Provider value={value}>
        <Controls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.2}
          autoRotate={false}
          rotateSpeed={-0.2}
        />
        <MvScene url={url} />
      </PlayerContext.Provider>
    </Canvas>
  );
}

export default MvCanvas;
