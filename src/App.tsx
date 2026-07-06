import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
// import JournalPage from "./pages/JournalPage";
import Layout from "./layout/Layout";
import JournalPage from "./pages/JournalPage";
import PracticePage from "./pages/PracticePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
