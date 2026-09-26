import { useEffect, useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { useAppData } from "./hooks/useAppData";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Documents from "./components/Documents";
import Packing from "./components/Packing";
import Finance from "./components/Finance";
import Reminders from "./components/Reminders";
import Travel from "./components/Travel";
import Settings from "./components/Settings";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

function App() {
  const tasks = useTasks();
  const data = useAppData();
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-bg", darkMode);
  }, [darkMode]);

  const pages = {
    dashboard: <Dashboard tasks={tasks} data={data} go={setPage} />,
    tasks: <Tasks {...tasks} />,
    documents: <Documents {...data} />,
    packing: <Packing {...data} />,
    finance: <Finance {...data} />,
    reminders: <Reminders {...data} />,
    travel: <Travel {...data} />,
    settings: <Settings {...data} darkMode={darkMode} setDarkMode={setDarkMode} />,
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} showTravel={data.settings.ticketBought} />
      <main className="main-content">{pages[page]}</main>
      <footer className="app-footer">© 2026 Mohammad Reza · GermanyPlan</footer>
    </div>
  );
}

export default App;
