import React, {
    useRef,
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import WaveSurfer from "wavesurfer.js";
import "./Waveform.css";
import { useTranslation } from 'react-i18next';

const Waveform = forwardRef(({ url }, ref) => {
    const containerRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        if (!containerRef.current) return;

        const wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: "#60a5fa",
            progressColor: "#3b82f6",
            cursorColor: "#facc15",
            barWidth: 2,
            barGap: 1,
            responsive: true,
            height: 100,
            url,
        });

        wavesurfer.on("ready", () => {
            console.log("Waveform is ready");
        });

        wavesurfer.on("finish", () => {
            setIsPlaying(false);
        });

        wavesurferRef.current = wavesurfer;

        return () => {
            wavesurfer.destroy();
        };
    }, [url]);


    useImperativeHandle(ref, () => ({
        getCurrentTime: () => {
            const seconds = wavesurferRef.current?.getCurrentTime() ?? 0;
            return Math.floor(seconds * 1000); // Convert to milliseconds
        },
    }));

    const togglePlay = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause();
            setIsPlaying((prev) => !prev);
        }
    };

    return (
        <div className="waveform-container">
            <div ref={containerRef} className="waveform" />
            <button onClick={togglePlay} className="play-button">
                {isPlaying ? t("Waveform.pause") : t("Waveform.play")}
            </button>
        </div>
    );
});

export default Waveform;