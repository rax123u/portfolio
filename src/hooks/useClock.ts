import { useEffect, useState } from "react";

/** Live HH:MM in the given time zone, refreshed every 15 seconds. */
export function useClock(timeZone = "Asia/Karachi") {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
