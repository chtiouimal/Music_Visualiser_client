import { Progress } from "antd";
import React, { useEffect, useState } from "react";

function MvProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(30);
    }, 1000);

    setTimeout(() => {
      setPercent(60);
    }, 2000);

    setTimeout(() => {
      setPercent(100);
    }, 3000);
  }, []);

  return <Progress percent={percent} />;
}

export default MvProgressBar;
