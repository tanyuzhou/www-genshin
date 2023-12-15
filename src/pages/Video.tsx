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
            <video ref={videoRef} preload='auto' playsInline={true} src="/Genshin/BV1ic411D7xo.mp4" className={"video " + (hide ? "hide" : "")} />
        </div>
    )
}