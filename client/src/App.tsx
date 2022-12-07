import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import BarSong from "./components/BarSong/BarSong";
import ModalDetailMV from "./components/Modal/ModalDetailMV";
import ModalLyric from "./components/Modal/ModalLyric";
import Sidebar from "./components/Sidebar";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import DetailPlaylist from "./pages/DetailPlaylist/DetailPlaylist";
import HomePage from "./pages/HomePage/HomePage";
import MVPage from "./pages/MVPage/MVPage";
import NotFound from "./pages/NotFound/NotFound";
import RankPage from "./pages/RankPage/RankPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const [audioApp, setAudioApp] = useState<HTMLAudioElement | null>(null);
  return (
    <div className="relative">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlist/:id" element={<DetailPlaylist />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/mv" element={<MVPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BarSong setAudioApp={setAudioApp} />
      <ModalDetailMV />
      <ModalLyric audioApp={audioApp} />
    </div>
  );
}

export default App;
