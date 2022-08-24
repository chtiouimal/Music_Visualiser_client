import { Html } from "@react-three/drei";
import React, { useContext, useState } from "react";
import { MailOutlined, CloseOutlined } from "@ant-design/icons";
import { MvInput } from "../../components";
import { Button } from "antd";
import { PlayerContext } from "../../context/PlayerContext";

function VoteModake({ setVisible, track }) {
  const { dataContext, setDataContext } = useContext(PlayerContext);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  const closeModal = () => {
    setVisible(false);
    setValue("");
  };

  const voteAction = async () => {
    if (value === "") {
      setStatus("error");
    }
    if (value !== "") {
      setDataContext({ ...dataContext, voted: track });
      localStorage.setItem("voted", track);
      setValue("");
      setVisible(false);
    }
  };

  return (
    <Html center>
      <div className="mv-vote-modal">
        <div className="mv-modal-header">
          <h3 className="mv-small-title">Vote</h3>
          <CloseOutlined onClick={closeModal} />
        </div>
        <span className="mv-small-text">Enter your email to vote</span>
        <div style={{ position: "relative" }}>
          <MvInput
            status={status}
            placeholder="Email"
            prefix={<MailOutlined />}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {status === "error" && (
            <span
              className="mv-small-text mv-danger"
              style={{ position: "absolute", bottom: -24, left: 16 }}
            >
              You need to enter your email to vote
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginLeft: "auto",
            padding: "8px 0",
          }}
        >
          <Button type="link" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="primary" ghost onClick={voteAction}>
            Vote
          </Button>
        </div>
      </div>
    </Html>
  );
}

export default VoteModake;
