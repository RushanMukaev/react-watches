import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

interface clockProps {
  id: number;
  title: string;
  offset: number;
  onRemove: () => void;
}

export default function Clock({ id, title, offset, onRemove }: clockProps) {
  const [time, setTime] = useState(getTime(offset));

  function getTime(offset: number) {
    return moment()
      .utcOffset(offset * 60)
      .format("HH:mm:ss");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      didUpdatingClock();
    }, 1000);

    return () => willUnmountClock(interval);
  }, [offset]);

  function didUpdatingClock() {
    setTime(getTime(offset));
  }

  function willUnmountClock(interval: number) {
    clearInterval(interval);
  }

  return (
    <div className="watch">
      <h2>
        {title}:<br />
        {time}
      </h2>
      <button className="cross" onClick={onRemove}>
        x
      </button>
    </div>
  );
}
