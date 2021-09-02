import { useEffect, useState } from "react";

const useWindowResizeHooks = (divRef) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: divRef.current.clientWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [divRef]);

  return dimensions;
};
export { useWindowResizeHooks };
