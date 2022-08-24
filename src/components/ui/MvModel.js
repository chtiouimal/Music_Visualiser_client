import { Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PlayerContext } from "../../context/PlayerContext";
import MvVoteModal from "../../feautres/vote";
import MvHeart from "./MvHeartIcon";
import MvVoteIcon from "./MvVoteIcon";

function MvModel({
  url,
  data,
  circlePos,
  rotateObj,
  heartPos,
  heartRot,
  votePos,
  voteRot,
  ...props
}) {
  const { dataContext, setDataContext } = useContext(PlayerContext);
  const [scale, setScale] = useState(0.19);
  const [voted, setVoted] = useState(false);
  const [visible, setVisible] = useState(false);
  const group = useRef();
  const ref = useRef();
  const texture = useTexture(url);
  const disc = useTexture(
    "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/Backgrounds%2Fdisc_texture.png?alt=media&token=f29e142d-ce4d-422c-a03c-d24a7b956e5a",
  );

  useEffect(() => {
    data._id === dataContext.voted && setVoted(true);
    localStorage.getItem("voted") &&
      data._id === localStorage.getItem("voted") &&
      setVoted(true);
    return () => {
      setVoted(false);
    };
  }, [dataContext]);

  useFrame(
    ({ clock }) =>
      rotateObj && (ref.current.rotation.z = clock.getElapsedTime()),
  );

  const showModal = () => {
    setVisible(true);
  };

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
      {!voted && (
        <MvVoteIcon
          onClick={showModal}
          scale={scale}
          position={votePos}
          rotation={voteRot}
          onPointerOver={() => setScale(0.2)}
          onPointerOut={() => setScale(0.19)}
        />
      )}
      {visible && <MvVoteModal setVisible={setVisible} track={data._id} />}
      {voted && (
        <MvHeart
          scale={scale - 0.1}
          position={heartPos}
          rotation={heartRot}
          onPointerOver={() => setScale(0.1)}
          onPointerOut={() => setScale(0.09)}
        />
      )}
    </Suspense>
  );
}

export default MvModel;
