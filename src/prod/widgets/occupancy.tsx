import * as React from "react";
import { IContextProvider } from "../../uxp";
import './occupancy.scss';

interface IOccupancyProps {
    LocationID: string,
    uxpContext?: IContextProvider,
    instanceId?: string,
    CurrentOccupancy?: string,
    TotalCapacity?: string,
    LocationKey?: string,
}

const Occupancy: React.FunctionComponent<IOccupancyProps> = (props) => {
    const current = parseInt(props.CurrentOccupancy || '0');
    const total = parseInt(props.TotalCapacity || '0');
    const occupancyPercent = total > 0 ? Math.round((current / total) * 100) : 0;
    const availablePercent = 100 - occupancyPercent;

    return (
        <div id="dt-occupancy-main-widget-id" className="dt-occupancy-main">
            <div className="dt-occupancy-header">
                <div className="dt-occupancy-title-icon"></div>
                <span className="dt-occupancy-title">TOTAL OCCUPANCY - <span style={{fontSize:"1.05rem"}}>{props.LocationID}</span></span>
            </div>
            <div className="dt-occupancy-location">{props.LocationKey}</div>
            <div className="dt-occupancy-counts">
                <div className="dt-count-current">{current}</div>
                <div className="dt-count-label">CURRENT OCCUPANCY</div>
                <div className="dt-count-total">{total}</div>
                <div className="dt-count-label">TOTAL CAPACITY</div>
            </div>
            <div className="dt-occupancy-bar">
                <div className="dt-occupancy-bar-filled" style={{ width: `${occupancyPercent}%` }}>
                    <span>{occupancyPercent}%</span>
                </div>
                <div className="dt-occupancy-bar-empty" style={{ width: `${availablePercent}%` }}>
                    <span>{availablePercent}%</span>
                </div>
            </div>
        </div>
    );
};

export default Occupancy;
