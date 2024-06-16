import { Temporal } from 'temporal-polyfill'
import bosch from './data.js';
import { Dial } from './Dial.js';

const trackpoints = bosch.TrainingCenterDatabase.Activities.Activity.Lap.Track.Trackpoint;
const byTime = trackpoints.sort(({ Time: a }, { Time: b }) => a.localeCompare(b));

const firstTime = Temporal.Instant.from(byTime[0].Time);

type TrackPoint = typeof trackpoints[0];

export const CurrentRaceInfo = ({ timePosition }: { timePosition: Temporal.Duration }) => {
    const tps = trackpoints;
    const nextPointIndex = byTime.findIndex(
        (tp) => 
            Temporal.Duration.compare(firstTime.until(Temporal.Instant.from(tp.Time)), timePosition) > 0
    );

    const prevPoint = byTime[nextPointIndex - 1];
    const nextPoint = byTime[nextPointIndex];

    const currentPointRatio = nextPoint === undefined
        ? 0
        : Temporal.Instant.from(prevPoint.Time).until(firstTime.add(timePosition)).total('millisecond') /
            Temporal.Instant.from(prevPoint.Time).until(Temporal.Instant.from(nextPoint.Time)).total('millisecond');

    const lerp = (a: number, b: number, ratio: number) => a*(1-ratio) + b*(ratio);
    
    const currentPoint = {
        ...prevPoint,
        DistanceMeters: lerp(Number(prevPoint.DistanceMeters), Number(nextPoint.DistanceMeters), currentPointRatio),
        Cadence: lerp(Number(prevPoint.Cadence), Number(nextPoint.Cadence), currentPointRatio),
        AltitudeMeters: lerp(Number(prevPoint.AltitudeMeters), Number(nextPoint.AltitudeMeters), currentPointRatio),
        Position: {
            LatitudeDegrees: lerp(Number(prevPoint.Position?.LatitudeDegrees), Number(nextPoint.Position?.LatitudeDegrees), currentPointRatio),
            LongitudeDegrees: lerp(Number(prevPoint.Position?.LongitudeDegrees), Number(nextPoint.Position?.LongitudeDegrees), currentPointRatio),
        }
    };

    const roundWith = (n: number, decimals: number) => Math.trunc(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
    const round3 = (n: number) => roundWith(n, 3);

    return (
        <ul>
            <li>
                {`Distance: ${roundWith(currentPoint.DistanceMeters, -1)}m`}
            </li>
            <li>
                {`Cadence: ${round3(Number(currentPoint.Cadence))}rpm`}
                {/* <Dial value={roundWith(Number(currentPoint.Cadence), 1)} /> */}
            </li>
            <li>
                {`Altitude: ${round3(Number(currentPoint.AltitudeMeters))}m`}
            </li>
            <li>
                {`Latitude: ${round3(Number(currentPoint.Position?.LatitudeDegrees))}deg`}
            </li>
            <li>
                {`Longitude: ${round3(Number(currentPoint.Position?.LongitudeDegrees))}deg`}
            </li>
        </ul>
    )
};
