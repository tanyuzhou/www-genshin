import './Video.css';
import { useEffect, useRef, useState } from 'react';
import { gameManager } from '../core/GameManager';

export function Video() {
    const videoRef = useRef<HTMLVideoElement>(null);
    // 默认video不可见，为video添加hide class
    const [hide, setHide] = useState(true);
    useEffect(() => {
        setHide(false);
        setTimeout(() => {
            videoRef.current?.play();
        }, 500);
        videoRef.current?.addEventListener("ended", () => {
            location.reload();
        });
    }, [])

    return (
        <div className="video-container">
            <video ref={videoRef} preload='auto' playsInline={true} x5-playsinline="true" webkit-playsinline="true"
                    x5-video-player-type="h5" x5-video-player-fullscreen="false" src="/Genshin/BV1ic411D7xo.mp4" className={"video " + (hide ? "hide" : "")} />
        </div>
    )
}