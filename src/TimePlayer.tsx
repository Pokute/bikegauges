import { useCallback, useEffect, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import bosch from './data.js'
import { CurrentRaceInfo } from './CurrentRaceInfo.js';

export const TimePlayer = ({
    start,
    end,
    playbackSpeed = 1,
}: 
{
    start: Temporal.Instant,
    end: Temporal.Instant,
    playbackSpeed?: number,
}) => {
    const [currentTime, setCurrentTime] = useState<DOMHighResTimeStamp>(0);
    const [startedPlayTime, setStartedPlayTime] = useState<DOMHighResTimeStamp>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [prevFrameTime, setPrevFrameTime] = useState<DOMHighResTimeStamp>(0);
    const [firstFrameTime, setFirstFrameTime] = useState<DOMHighResTimeStamp>(0);
    const [currentFrameTime, setCurrentFrameTime] = useState<DOMHighResTimeStamp>(0);

    const [pausedStartFrameTime, setPausedStartFrameTime] = useState<DOMHighResTimeStamp>(0);

    useEffect(() => {
        if (isPlaying) {
            const id = requestAnimationFrame((millisecondsTime: number) => {
                // setCurrentTime(millisecondsTime);
                if (prevFrameTime) {
                    setCurrentTime(currentTime + (millisecondsTime - prevFrameTime));
                }
                setPrevFrameTime(millisecondsTime);
            });
            return () => {
                cancelAnimationFrame(id);
            }
        };
    }, [isPlaying, currentTime, prevFrameTime]);

    // if ((firstFrameTime === 0) && (currentFrameTime !== 0)) {
    //     setFirstFrameTime(currentFrameTime);
    //     // I guess we try to immediately re-render.
    //     return null;
    // }

    const currentMilliseconds = Math.trunc(currentTime);

    const play = () => {
        setIsPlaying(true);
        setStartedPlayTime(currentMilliseconds);
    };

    const stop = () => {
        setIsPlaying(false);
        // setPausedStartFrameTime(currentFrameTime);
        setPrevFrameTime(0);
    }

    return (
        <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            margin: 10,
        }}>
            <div>
                {start.toString()}
            </div>
            {
                isPlaying
                    ? (<button onClick={stop}>
                        Stop
                    </button>)
                    : (<button onClick={play}>
                        Play
                    </button>)
            }
            <div>
                {currentMilliseconds}
            </div>

            <div>
                {end.toString()}
            </div>
            <CurrentRaceInfo
                timePosition={Temporal.Duration.from({ milliseconds: currentMilliseconds })}
            />
        </div>
    )
};
