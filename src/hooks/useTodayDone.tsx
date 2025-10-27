import { useState, useEffect } from "react";
import { STORAGE_KEY } from "../utils/storage";
import { getTodayDateKey } from "../utils/getTodayDateKey";
import { parsedRoot } from "../utils/storage";

/* 
- on call check if there's a gratitude item in localStorage with today's date as dateKey
- on call attach an eventlistener for local storage:
    - if there's a change, check again if there's an item in localStorage with today's date as dateKey
- return true if today has an entry, else false
*/

export default function useTodayDone() {
  const [isTodayDone, setIsTodayDone] = useState(() => checkIsTodayDone());
  const checkIsTodayDone = () =>
    !!parsedRoot(localStorage.getItem(STORAGE_KEY))?.entriesByDate?.[
      getTodayDateKey()
    ];

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
