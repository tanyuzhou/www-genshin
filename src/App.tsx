import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Menu } from './pages/Menu'
import { Preloader } from './pages/Preloader'
import { Video } from './pages/Video'
import { gameManager } from './core/GameManager'
import { unscheduleDelay } from './pages/Scheduler'
import { Canvas } from './pages/Canvas'

export function App() {
  const [loading, setLoading] = useState(true);
  const [gaming, setGaming] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    gameManager.on("preloaded", () => {
      setLoading(false)
      setGaming(true)
      setPlaying(false)
    });
    gameManager.on("restart", () => {
      setLoading(false)
      setGaming(false)
      setPlaying(true)

      gameManager.emit("video");
    });
    gameManager.on("video-end", () => {
      setLoading(true)
      setGaming(false)
      setPlaying(false)
    });

    // 视频预加载
    fetch("/Genshin/BV1ic411D7xo.mp4")

    return () => {
      gameManager.reset();
      unscheduleDelay();
    }
  }, [gameManager.restartCount])

  return (
    <>
      <Canvas />
      {loading && <Preloader />}
      {gaming && <Menu />}
      {playing && <Video />}
    </>
  )
}
