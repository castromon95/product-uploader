"use client";

import clsx from "clsx";
import { FunctionComponent, useEffect, useState } from "react";

export const ProgressBar: FunctionComponent = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + Math.floor(Math.random() * 10);
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div
      className={clsx(
        "w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700",
        { hidden: !progress }
      )}
    >
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
