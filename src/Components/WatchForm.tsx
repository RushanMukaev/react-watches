import Clock from "./Clock";
import { useState } from "react";

interface Clock {
  id: number;
  title: string;
  offset: number;
}

export default function WatchForm() {
  const [clocks, setClocks] = useState<Clock[]>([]);
  const [title, setTitle] = useState("");
  const [timeOffset, setTimeOffset] = useState("");

  function didMountingClock() {
    if (title && timeOffset) {
      const offset = parseInt(timeOffset);
      if (!isNaN(offset)) {
        setClocks([...clocks, { id: Date.now(), title, offset }]);
        setTitle("");
        setTimeOffset("");
      }
    }
  }

  function willUnmountingClock(id: number) {
    setClocks(clocks.filter((clock) => clock.id !== id));
  }

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <div className="name">
          <label htmlFor="nameInput">Название</label>
          <input
            type="text"
            id="nameInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="offset">
          <label htmlFor="offsetInput">Временная зона</label>
          <input
            type="number"
            id="offsetInput"
            value={timeOffset}
            onChange={(e) => setTimeOffset(e.target.value)}
          />
        </div>
        <button className="btn" onClick={didMountingClock}>
          Добавить
        </button>
      </div>

      <div className="clocks">
        {clocks.map((clock) => (
          <Clock
            key={clock.id}
            id={clock.id}
            title={clock.title}
            offset={clock.offset}
            onRemove={() => willUnmountingClock(clock.id)}
          />
        ))}
      </div>
    </div>
  );
}
