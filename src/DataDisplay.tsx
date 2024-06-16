import { TimePlayer } from './TimePlayer.js';
import bosch from './data.js';
import 'temporal-polyfill/global';

const hmmData = bosch.TrainingCenterDatabase.Activities.Activity.Lap;

export const DataDisplay = ({
    data,
}: 
{
    data?: any;
}) => {
    const trackpoints = hmmData.Track.Trackpoint;
    // trackpoints[0].Time
    const byTime = trackpoints.sort(({ Time: a }, { Time: b }) => a.localeCompare(b));
    const minTime = byTime.at(0)?.Time ?? 'not found';
    const maxTime = byTime.at(-1)?.Time ?? 'not found';
    return (
        <div>
            <ul>
                <li>minTime: {minTime}</li>
                <li>maxTime: {maxTime}</li>
            </ul>
            <TimePlayer
                start={Temporal.Instant.from(minTime)}
                end={Temporal.Instant.from(minTime)}
            />
        </div>
    );
};
