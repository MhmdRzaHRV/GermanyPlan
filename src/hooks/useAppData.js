import { useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const defaults = {
  documents: [],
  packing: [],
  finance: [],
  reminders: [],
  settings: { ticketBought: false },
  travel: { flightDate: "", flightTime: "", from: "", to: "", flightNumber: "", accommodation: "", notes: "" },
};

export function useAppData() {
  const [data, setData] = useState(() => ({
    ...defaults,
    ...load("appData", {}),
    settings: { ...defaults.settings, ...load("appData", {}).settings },
    travel: { ...defaults.travel, ...load("appData", {}).travel },
  }));

  useEffect(() => save("appData", data), [data]);

  function add(type, item) { setData((p) => ({ ...p, [type]: [...p[type], { id: Date.now(), createdAt: new Date().toISOString(), ...item }] })); }
  function update(type, id, changes) { setData((p) => ({ ...p, [type]: p[type].map((x) => (x.id === id ? { ...x, ...changes } : x)) })); }
  function remove(type, id) { if (window.confirm("این مورد حذف شود؟")) setData((p) => ({ ...p, [type]: p[type].filter((x) => x.id !== id) })); }
  function setSettings(changes) { setData((p) => ({ ...p, settings: { ...p.settings, ...changes } })); }
  function setTravel(changes) { setData((p) => ({ ...p, travel: { ...p.travel, ...changes } })); }

  return { ...data, add, update, remove, setSettings, setTravel };
}
