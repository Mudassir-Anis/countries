import { useEffect, useState } from "react";

export function useWindowSize() {
  const [winSize, setWinSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWinSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, []);
  return winSize;
}
