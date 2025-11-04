import { useState, useEffect } from "react";
import { getTodayDateKey } from "../utils/getTodayDateKey";
import { getParsedRoot } from "../utils/storage";

const checkIsTodayDone = () =>
  !!getParsedRoot()?.entriesByDate?.[getTodayDateKey()];

/* 
- on call check if there's a gratitude item in localStorage with today's date as dateKey
- on call attach an eventlistener for local storage:
    - if there's a change, check again if there's an item in localStorage with today's date as dateKey
- return true if today has an entry, else false
*/

export default function useTodayDone() {
  const [isTodayDone, setIsTodayDone] = useState(() => checkIsTodayDone());

  useEffect(() => {
    function onStorageChange() {
      const newValue = checkIsTodayDone();
      if (newValue !== isTodayDone) setIsTodayDone(newValue);
    }

    window.addEventListener("storage", onStorageChange);

    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return isTodayDone;
}
