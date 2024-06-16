import './Dial.css';

import { CSSProperties } from "react";

export const Dial = ({ value }: { value: number }) => (
    <div className="gauge"
        style={{
            '--gauge-bg': '#088478',
            '--gauge-value': value,
            '--gauge-display-value': value,
        } as CSSProperties }
     >
        <div className="ticks">
            <div className="tithe" style={{'--gauge-tithe-tick':1} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':2} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':4} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':6} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':7} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':8} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':3} as CSSProperties}></div>
            <div className="tithe" style={{'--gauge-tithe-tick':9} as CSSProperties}></div>
            <div className="min"></div>
            <div className="mid"></div>
            <div className="max"></div>
        </div>
        <div className="tick-circle"></div>
        <div className="needle">
            <div className="needle-head"></div>
        </div>
        <div className="labels">
            <div className="value-label"></div>
        </div>
    </div>)