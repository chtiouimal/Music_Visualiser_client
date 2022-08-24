import React, { Suspense, useContext, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import MvModel from "./MvModel";
import { getSelectedCollections } from "../../services/collection";
import { cameraPosition, objectParams } from "../../utils/params.constants";
import { PlayerContext } from "../../context/PlayerContext";
import { TextureLoader } from "three";

function MvScene({ url }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [rotateObj, setRotateObj] = useState(false);

  const { dataContext, setDataContext } = useContext(PlayerContext);

  useEffect(() => {
    getSelectedCollections()
      .then((res) => {
        setData(res.data.data);
        setSuccess(res.data.success);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Suspense callback={null}>
      <mesh>
        <ambientLight intensity={1} />
        <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
        />
      </mesh>
      {success &&
        data?.songs.map((e, i) => (
          <MvModel
            key={e._id}
            url={e.coverArt}
            data={e}
            onDoubleClick={() => {
              setDataContext({
                ...dataContext,
                currentMusic: e,
                isplaying: !dataContext.isplaying,
                maxDistance:
                  dataContext.maxDistance === 32 ? cameraPosition[i] : 32,
                minDistance:
                  dataContext.minDistance === -32 ? cameraPosition[i] : -32,
              });
              setRotateObj(!rotateObj);
            }}
            rotateObj={rotateObj}
            scale={3}
            heartPos={objectParams[i].heartIcon.position}
            heartRot={objectParams[i].heartIcon.rotation}
            votePos={objectParams[i].voteIcon.position}
            voteRot={objectParams[i].voteIcon.rotation}
            circlePos={objectParams[i].coverArt.circlePosition}
            position={objectParams[i].coverArt.position}
            rotation={objectParams[i].coverArt.rotation}
          />
        ))}
    </Suspense>
  );
}

export default MvScene;
