import "./Preloader.less";
import { useEffect, useRef, useState } from "react"
import { useScheduler } from "./Scheduler";
import { MathUtils } from "../libs/xviewer";
import { gameManager } from "../core/GameManager";

export function Preloader() {
  const progressRef = useRef();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    if (progress >= 1) {
      // setVisible(false);
      // setTimeout(() => gameManager.emit("preloaded"), 1500);
      // 设置按钮可见
      setButtonVisible(true);
    }
  }, [progress])

  useScheduler((dt) => {
    dt = MathUtils.clamp(dt, 0.005, 0.3);
    let t = MathUtils.damp(progress, gameManager.progress, 170, dt);
    if (t === 0) return;
    if (t > 0.99) t = 1;
    setProgress(t);
  }, [progress]);

  const handleButtonClick = async () => {
    // TODO: 这里可以添加进入游戏的逻辑
    gameManager.emit("button-start-click");
    setVisible(false);
    setTimeout(() => gameManager.emit("preloaded"), 1500);
  };

  return (
    <div className="progress-container" style={{ opacity: visible ? "1" : "0" }}>
      <div className="progress-content" >
        <img className="Genshin" src={"Genshin/Genshin.png"} alt="图片" style={{ opacity: visible ? "1" : "0" }} />
        <div className="LoadingBar" style={{ opacity: visible ? "1" : "0" }}>
          <div className="progress-bar">
            <div ref={progressRef} className="progress" style={{ width: progress * 100 + "%" }}></div>
          </div>
          <div className="ball" style={{ left: "-2vmin" }}></div>
          <div className="ball" style={{ left: "40.8vmin", top: "-2.4vmin" }}></div>
          {/* <div style={{ paddingTop: "1vmin", fontSize: "1.4vmin" }}>为了您更好的体验，请在电脑端打开</div> */}
          {/* 加一个按钮，文字为原神启动 */}
          {buttonVisible && (
            <button className="ClickMe" onClick={handleButtonClick}>原神启动</button>
          )}
        </div>
      </div>
    </div>
  )
}
