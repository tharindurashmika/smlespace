import * as React from "react";
import { IContextProvider } from "../../uxp";
import './alarm-summary.scss';
import { BASE_URL } from "../common";
import { DataGrid, DataTable, DropDownButton, useToast } from "uxp/components";
import AssetListComponent from "./AssetListComponent";

interface IunvsrchProps {
    LocationKey: string,
    uxpContext?: IContextProvider,
    instanceId?: string

    NewCritical: string
    NewNonCritical: string
    AckCritical: string
    AckNonCritical: string
    ClosedCritical: string
    ClosedNonCritical: string
    TotalCritical: string
    TotalNonCritical: string
    IsBuilding: string
    LocationID: string
}
const AlarmSummary: React.FunctionComponent<IunvsrchProps> = (props) => {
    const [NewCritical, setNewCritical] = React.useState<string>("0");
    const [NewNonCritical, setNewNonCritical] = React.useState<string>("0");
    const [AckCritical, setAckCritical] = React.useState<string>("0");
    const [AckNonCritical, setAckNonCritical] = React.useState<string>("0");
    const [ClosedCritical, setClosedCritical] = React.useState<string>("0");
    const [ClosedNonCritical, setClosedNonCritical] = React.useState<string>("0");
    const [TotalCritical, setTotalCritical] = React.useState<string>("0");
    const [TotalNonCritical, setTotalNonCritical] = React.useState<string>("0");


    // const AssetList = [
    //     {
    //         Type: "Fault",
    //         Description: "VALVE CTRL is not Commanded to Open fully.",
    //         Status: "Critical",
    //         ObjectID: "CABE.FCU.2401-0001 CABE-8010-2",
    //         Level: "2",
    //         ParentLocationKey: "9",
    //         GrandParentLocationKey: "3",
    //         IsVertical: "0",
    //         LocationKey: "19",
    //         LocationID: "Plant A - Valve Station",
    //         DateTime: "2025-04-01 08:15:00"
    //     },
    //     {
    //         Type: "Comfort",
    //         Description: "Temperature is above the set threshold.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.AHU.1101-0002 CABE-7010-1",
    //         Level: "1",
    //         ParentLocationKey: "7",
    //         GrandParentLocationKey: "2",
    //         IsVertical: "1",
    //         LocationKey: "15",
    //         LocationID: "Office Block B - Meeting Room",
    //         DateTime: "2025-04-01 08:45:00"
    //     },
    //     {
    //         Type: "Prediction",
    //         Description: "Motor vibration nearing failure threshold.",
    //         Status: "Critical",
    //         ObjectID: "CABE.PUMP.3301-0003 CABE-6010-4",
    //         Level: "3",
    //         ParentLocationKey: "11",
    //         GrandParentLocationKey: "4",
    //         IsVertical: "0",
    //         LocationKey: "20",
    //         LocationID: "Pump House - Zone C",
    //         DateTime: "2025-04-01 09:10:00"
    //     },
    //     {
    //         Type: "Sensor",
    //         Description: "Humidity sensor disconnected.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.5501-0004 CABE-9010-6",
    //         Level: "2",
    //         ParentLocationKey: "5",
    //         GrandParentLocationKey: "1",
    //         IsVertical: "1",
    //         LocationKey: "18",
    //         LocationID: "Data Center - Rack Area",
    //         DateTime: "2025-04-01 09:30:00"
    //     },
    //     {
    //         Type: "Fault",
    //         Description: "Fan speed command mismatch.",
    //         Status: "Critical",
    //         ObjectID: "CABE.FAN.2402-0005 CABE-8010-2",
    //         Level: "2",
    //         ParentLocationKey: "9",
    //         GrandParentLocationKey: "3",
    //         IsVertical: "0",
    //         LocationKey: "19",
    //         LocationID: "Main Hall - Ventilation System",
    //         DateTime: "2025-04-01 10:00:00"
    //     },
    //     {
    //         Type: "Comfort",
    //         Description: "CO2 level is above the comfort range.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.1201-0006 CABE-7010-1",
    //         Level: "1",
    //         ParentLocationKey: "7",
    //         GrandParentLocationKey: "2",
    //         IsVertical: "1",
    //         LocationKey: "15",
    //         LocationID: "Conference Room - Floor 2",
    //         DateTime: "2025-04-01 10:30:00"
    //     },
    //     {
    //         Type: "Prediction",
    //         Description: "Bearing wear predicted within next 48 hours.",
    //         Status: "Critical",
    //         ObjectID: "CABE.PUMP.3401-0007 CABE-6010-4",
    //         Level: "3",
    //         ParentLocationKey: "11",
    //         GrandParentLocationKey: "4",
    //         IsVertical: "0",
    //         LocationKey: "20",
    //         LocationID: "Mechanical Room - Basement",
    //         DateTime: "2025-04-01 11:00:00"
    //     },
    //     {
    //         Type: "Sensor",
    //         Description: "Airflow sensor reporting null values.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.5601-0008 CABE-9010-6",
    //         Level: "2",
    //         ParentLocationKey: "5",
    //         GrandParentLocationKey: "1",
    //         IsVertical: "1",
    //         LocationKey: "18",
    //         LocationID: "Ventilation Duct - Section A",
    //         DateTime: "2025-04-01 11:30:00"
    //     },
    //     {
    //         Type: "Fault",
    //         Description: "Compressor overload detected.",
    //         Status: "Critical",
    //         ObjectID: "CABE.COMP.2501-0009 CABE-8010-3",
    //         Level: "2",
    //         ParentLocationKey: "9",
    //         GrandParentLocationKey: "3",
    //         IsVertical: "0",
    //         LocationKey: "19",
    //         LocationID: "HVAC Zone 1",
    //         DateTime: "2025-04-01 12:00:00"
    //     },
    //     {
    //         Type: "Comfort",
    //         Description: "Light level too low for occupied space.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.LIGHT.1301-0010 CABE-7010-1",
    //         Level: "1",
    //         ParentLocationKey: "7",
    //         GrandParentLocationKey: "2",
    //         IsVertical: "1",
    //         LocationKey: "15",
    //         LocationID: "Training Room - East Wing",
    //         DateTime: "2025-04-01 12:30:00"
    //     },
    //     {
    //         Type: "Prediction",
    //         Description: "Filter clogging estimated within next 72 hours.",
    //         Status: "Critical",
    //         ObjectID: "CABE.FILTER.3501-0011 CABE-6010-4",
    //         Level: "3",
    //         ParentLocationKey: "11",
    //         GrandParentLocationKey: "4",
    //         IsVertical: "0",
    //         LocationKey: "20",
    //         LocationID: "AHU Room - Roof Top",
    //         DateTime: "2025-04-01 13:00:00"
    //     },
    //     {
    //         Type: "Sensor",
    //         Description: "CO sensor reading out of range.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.5701-0012 CABE-9010-6",
    //         Level: "2",
    //         ParentLocationKey: "5",
    //         GrandParentLocationKey: "1",
    //         IsVertical: "1",
    //         LocationKey: "18",
    //         LocationID: "Parking Garage - Level B1",
    //         DateTime: "2025-04-01 13:30:00"
    //     },
    //     {
    //         Type: "Fault",
    //         Description: "Damper stuck in closed position.",
    //         Status: "Critical",
    //         ObjectID: "CABE.DAMPER.2601-0013 CABE-8010-2",
    //         Level: "2",
    //         ParentLocationKey: "9",
    //         GrandParentLocationKey: "3",
    //         IsVertical: "0",
    //         LocationKey: "19",
    //         LocationID: "Fire Exit - Stairwell D",
    //         DateTime: "2025-04-01 14:00:00"
    //     },
    //     {
    //         Type: "Comfort",
    //         Description: "Zone temperature deviating from comfort setpoint.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.ZONE.1401-0014 CABE-7010-1",
    //         Level: "1",
    //         ParentLocationKey: "7",
    //         GrandParentLocationKey: "2",
    //         IsVertical: "1",
    //         LocationKey: "15",
    //         LocationID: "Reception Area - Main Lobby",
    //         DateTime: "2025-04-01 14:30:00"
    //     },
    //     {
    //         Type: "Prediction",
    //         Description: "Chiller expected to reach failure in 7 days.",
    //         Status: "Critical",
    //         ObjectID: "CABE.CHILL.3601-0015 CABE-6010-4",
    //         Level: "3",
    //         ParentLocationKey: "11",
    //         GrandParentLocationKey: "4",
    //         IsVertical: "0",
    //         LocationKey: "20",
    //         LocationID: "Chiller Plant - Rear Side",
    //         DateTime: "2025-04-01 15:00:00"
    //     },
    //     {
    //         Type: "Sensor",
    //         Description: "Voltage spike detected by sensor.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.5801-0016 CABE-9010-6",
    //         Level: "2",
    //         ParentLocationKey: "5",
    //         GrandParentLocationKey: "1",
    //         IsVertical: "1",
    //         LocationKey: "18",
    //         LocationID: "Electrical Room - Core B",
    //         DateTime: "2025-04-01 15:30:00"
    //     },
    //     {
    //         Type: "Fault",
    //         Description: "AHU fan failure.",
    //         Status: "Critical",
    //         ObjectID: "CABE.FAN.2701-0017 CABE-8010-2",
    //         Level: "2",
    //         ParentLocationKey: "9",
    //         GrandParentLocationKey: "3",
    //         IsVertical: "0",
    //         LocationKey: "19",
    //         LocationID: "AHU Zone - North Wing",
    //         DateTime: "2025-04-01 16:00:00"
    //     },
    //     {
    //         Type: "Comfort",
    //         Description: "Humidity below desired range.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.HUM.1501-0018 CABE-7010-1",
    //         Level: "1",
    //         ParentLocationKey: "7",
    //         GrandParentLocationKey: "2",
    //         IsVertical: "1",
    //         LocationKey: "15",
    //         LocationID: "Server Room - Floor 3",
    //         DateTime: "2025-04-01 16:30:00"
    //     },
    //     {
    //         Type: "Prediction",
    //         Description: "Sensor battery will deplete in 3 days.",
    //         Status: "Critical",
    //         ObjectID: "CABE.SENSOR.5901-0019 CABE-6010-4",
    //         Level: "3",
    //         ParentLocationKey: "11",
    //         GrandParentLocationKey: "4",
    //         IsVertical: "0",
    //         LocationKey: "20",
    //         LocationID: "Control Unit - North Plant",
    //         DateTime: "2025-04-01 17:00:00"
    //     },
    //     {
    //         Type: "Sensor",
    //         Description: "Occupancy sensor intermittent failure.",
    //         Status: "Non-Critical",
    //         ObjectID: "CABE.SENSOR.6001-0020 CABE-9010-6",
    //         Level: "2",
    //         ParentLocationKey: "5",
    //         GrandParentLocationKey: "1",
    //         IsVertical: "1",
    //         LocationKey: "18",
    //         LocationID: "Office Entry - West Wing",
    //         DateTime: "2025-04-01 17:30:00"
    //     }
    // ];

    const AssetList = [
        // New Critical
        {
            Type: "Fault",
            Description: "AHU CHW Valve Control",
            Status: "Critical",
            ObjectID: "AHU L24",
            Level: "2",
            ParentLocationKey: "9",
            GrandParentLocationKey: "3",
            IsVertical: "0",
            LocationKey: "19",
            LocationID: "L-24",
            DateTime: "2025-04-06 12:45",
            status: "new"
        },

        // Attended Non-Critical (2)
        {
            Type: "Comfort",
            Description: "Room temperature slightly above threshold.",
            Status: "Non-Critical",
            ObjectID: "CABE.AHU.1101-0002",
            Level: "1",
            LocationID: "Office Block B - Meeting Room",
            DateTime: "2025-04-01 09:00:00",
            status: "attended"
        },
        {
            Type: "Sensor",
            Description: "CO2 levels above comfort range.",
            Status: "Non-Critical",
            ObjectID: "CABE.SENSOR.1201-0006",
            Level: "1",
            LocationID: "Conference Room - Floor 2",
            DateTime: "2025-04-01 10:30:00",
            status: "attended"
        },

        // Closed Critical (11)
        {
            Type: "Fault",
            Description: "Damper failure in air handling unit.",
            Status: "Critical",
            ObjectID: "CABE.FCU-L24-005",
            Level: "2",
            LocationID: "L-24",
            DateTime: "2025-04-01 11:00:00",
            status: "closed"
        },
        {
            Type: "Fault",
            Description: "Compressor overload detected.",
            Status: "Critical",
            ObjectID: "CABE.COMP.2501-0009",
            Level: "2",
            LocationID: "HVAC Zone 1",
            DateTime: "2025-04-01 12:00:00",
            status: "closed"
        },
        {
            Type: "Prediction",
            Description: "Bearing wear predicted in 48 hours.",
            Status: "Critical",
            ObjectID: "CABE.PUMP.3401-0007",
            Level: "3",
            LocationID: "Mechanical Room - Basement",
            DateTime: "2025-04-01 11:00:00",
            status: "closed"
        },
        {
            Type: "Fault",
            Description: "Fan speed command mismatch.",
            Status: "Critical",
            ObjectID: "CABE.FAN.2402-0005",
            Level: "2",
            LocationID: "Main Hall - Ventilation System",
            DateTime: "2025-04-01 10:00:00",
            status: "closed"
        },
        {
            Type: "Prediction",
            Description: "Chiller expected to reach failure in 7 days.",
            Status: "Critical",
            ObjectID: "CABE.CHILL.3601-0015",
            Level: "3",
            LocationID: "Chiller Plant - Rear Side",
            DateTime: "2025-04-01 15:00:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "Voltage spike detected by sensor.",
            Status: "Critical",
            ObjectID: "CABE.SENSOR.5801-0016",
            Level: "2",
            LocationID: "Electrical Room - Core B",
            DateTime: "2025-04-01 15:30:00",
            status: "closed"
        },
        {
            Type: "Fault",
            Description: "AHU fan failure.",
            Status: "Critical",
            ObjectID: "CABE.FAN.2701-0017",
            Level: "2",
            LocationID: "AHU Zone - North Wing",
            DateTime: "2025-04-01 16:00:00",
            status: "closed"
        },
        {
            Type: "Prediction",
            Description: "Sensor battery will deplete in 3 days.",
            Status: "Critical",
            ObjectID: "CABE.SENSOR.5901-0019",
            Level: "3",
            LocationID: "Control Unit - North Plant",
            DateTime: "2025-04-01 17:00:00",
            status: "closed"
        },
        {
            Type: "Prediction",
            Description: "Motor vibration nearing failure threshold.",
            Status: "Critical",
            ObjectID: "CABE.PUMP.3301-0003",
            Level: "3",
            LocationID: "Pump House - Zone C",
            DateTime: "2025-04-01 09:10:00",
            status: "closed"
        },
        {
            Type: "Fault",
            Description: "Damper stuck in closed position.",
            Status: "Critical",
            ObjectID: "CABE.DAMPER.2601-0013",
            Level: "2",
            LocationID: "Fire Exit - Stairwell D",
            DateTime: "2025-04-01 14:00:00",
            status: "closed"
        },
        {
            Type: "Fault",
            Description: "Water leakage detected near main valve.",
            Status: "Critical",
            ObjectID: "CABE.VALVE.9999-0001",
            Level: "2",
            LocationID: "Plant A - Valve Station",
            DateTime: "2025-04-01 08:15:00",
            status: "closed"
        },

        // Closed Non-Critical (8)
        {
            Type: "Comfort",
            Description: "Zone temperature deviating from setpoint.",
            Status: "Non-Critical",
            ObjectID: "CABE.ZONE.L24-020",
            Level: "1",
            LocationID: "L-24",
            DateTime: "2025-04-01 13:45:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "Humidity below desired range.",
            Status: "Non-Critical",
            ObjectID: "CABE.HUM.L24-019",
            Level: "2",
            LocationID: "L-24",
            DateTime: "2025-04-01 13:15:00",
            status: "closed"
        },
        {
            Type: "Comfort",
            Description: "Light level too low for occupied space.",
            Status: "Non-Critical",
            ObjectID: "CABE.LIGHT.1301-0010",
            Level: "1",
            LocationID: "Training Room - East Wing",
            DateTime: "2025-04-01 12:30:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "CO sensor reading out of range.",
            Status: "Non-Critical",
            ObjectID: "CABE.SENSOR.5701-0012",
            Level: "2",
            LocationID: "Parking Garage - Level B1",
            DateTime: "2025-04-01 13:30:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "Airflow sensor reporting null values.",
            Status: "Non-Critical",
            ObjectID: "CABE.SENSOR.5601-0008",
            Level: "2",
            LocationID: "Ventilation Duct - Section A",
            DateTime: "2025-04-01 11:30:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "Humidity sensor disconnected.",
            Status: "Non-Critical",
            ObjectID: "CABE.SENSOR.5501-0004",
            Level: "2",
            LocationID: "Data Center - Rack Area",
            DateTime: "2025-04-01 09:30:00",
            status: "closed"
        },
        {
            Type: "Sensor",
            Description: "Occupancy sensor intermittent failure.",
            Status: "Non-Critical",
            ObjectID: "CABE.SENSOR.6001-0020",
            Level: "2",
            LocationID: "Office Entry - West Wing",
            DateTime: "2025-04-01 17:30:00",
            status: "closed"
        },
        {
            Type: "Comfort",
            Description: "Humidity below desired range.",
            Status: "Non-Critical",
            ObjectID: "CABE.HUM.1501-0018",
            Level: "1",
            LocationID: "Server Room - Floor 3",
            DateTime: "2025-04-01 16:30:00",
            status: "closed"
        }
    ];

    const [AlarmSummaryData, setAlarmSummaryData] = React.useState<any[]>([]);
    const [FilteredAlarmSummaryData, setFilteredAlarmSummaryData] = React.useState<any[]>([]);

    React.useEffect(() => {
        // debugger
        if (props.IsBuilding === "false") {
            // debugger
            const filteredData = AssetList.filter(item => item.LocationID === props.LocationID);
            setFilteredAlarmSummaryData(filteredData);
        } else {
            setAlarmSummaryData(AssetList);
        }
    }, [props.LocationKey, props.LocationID, props.IsBuilding]);

    let toast = useToast();
    // React.useEffect(() => {
    //     if (props.LocationKey != null && props.LocationKey != undefined) {
    //         GetDetails();
    //     }
    // }, [props.LocationKey]);

    function GetDetails() {
        props.uxpContext?.executeAction("DTHardcodeData", 'GetAlarmSummary', {
            LocationKey: props.LocationKey
        }, { json: true })
            .then(res => {

                if (res.length > 0) {
                    setNewCritical(res[0].NewCritical);
                    setNewNonCritical(res[0].NewNonCritical);
                    setAckCritical(res[0].AckCritical);
                    setAckNonCritical(res[0].AckNonCritical);
                    setClosedCritical(res[0].ClosedCritical);
                    setClosedNonCritical(res[0].ClosedNonCritical);
                    let ttlcrit = parseFloat(res[0].NewCritical) + parseFloat(res[0].AckCritical) + parseFloat(res[0].ClosedCritical);
                    let ttlnooncrit = parseFloat(res[0].NewNonCritical) + parseFloat(res[0].AckNonCritical) + parseFloat(res[0].ClosedNonCritical);
                    setTotalCritical(ttlcrit.toString());
                    setTotalNonCritical(ttlnooncrit.toString());
                }
                else {
                    setNewCritical("0");
                    setNewNonCritical("0");
                    setAckCritical("0");
                    setAckNonCritical("0");
                    setClosedCritical("0");
                    setClosedNonCritical("0");
                    setTotalCritical("0");
                    setTotalNonCritical("0");
                }
            })
            .catch(e => {
                console.log("except: ", e);
                toast.error("Something went wrong");
                setNewCritical("0");
                setNewNonCritical("0");
                setAckCritical("0");
                setAckNonCritical("0");
                setClosedCritical("0");
                setClosedNonCritical("0");
                setTotalCritical("0");
                setTotalNonCritical("0");
            })
    }

    function renderGridItem(item: any, key: number) {
        let cls = (item.Source.toLowerCase())
        return (
            <div className="dt-alarm-summary-list-item">
                <table><tbody><tr>
                    <td>
                        <img src={`${BASE_URL}/Resources/DashboardIntegration/icon/QI/${item.Type == "Fault" ? "Escalation.png" : (item.Type == "Comfort" ? "ACMV.png" : (item.Type == "Energy" ? "Energy.png" : "Data.png"))}`} className="dt-warndata-notification-image" />
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label">
                            {item.AlarmDescription}
                        </div>
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label">
                            {item.Location}
                        </div>
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label">
                            {item.AlarmDateTime}
                        </div>
                    </td>
                    <td>
                        <div className={`dt-alarm-summary-list-icon-container`}>
                            <div className={`dt-alarm-summary-list-view-more-icon`}></div>
                        </div>
                    </td>
                </tr></tbody></table>
            </div>
        )
    }

    return (<div id="dt-alarm-summary-main-widget-id" className="dt-alarm-summary-main">
        <div className="dt-alarm-summary-container">
            <div className="dt-alarm-summary-title">
                Alarm Summary
                <div className="dt-alarm-summary-title-icon"></div>
            </div>
            <div style={{ width: "100%", height: "10px", borderTop: "solid 1px #e3e3e3" }}></div>

            <table><tbody><tr>
                <td style={{ paddingRight: "5px" }}><div style={{ width: "100px" }} title="Non-Attended Critical Alarms" className="dt-alarm-summary-critical">Critical - {props.TotalCritical}</div></td>
                <td><div style={{ width: "130px" }} title="Non-Attended Non-Critical Alarms" className="dt-alarm-summary-non-critical">Non Critical -  {props.TotalNonCritical}</div></td>
            </tr></tbody></table>

            <div style={{ width: "100%", height: "7px" }}></div>
            <div className="">
                <div className="dt-alarm-summary-full-page-content">
                    <div className="dt-alarm-summary-left-panel">
                        <div className="dt-alarm-summary-label">New</div>
                    </div>
                    <div className="dt-alarm-summary-right-panel">
                        <table style={{ float: "right", width: "fit-content" }}><tbody><tr>
                            <td style={{ paddingRight: "5px" }}>
                                <div className="dt-alarm-summary-critical">{props.NewCritical}</div>
                            </td>
                            <td>
                                <div className="dt-alarm-summary-non-critical">{props.NewNonCritical}</div>
                            </td>
                        </tr></tbody></table>
                    </div>
                </div>
                <div style={{ width: "100%", height: "7px" }}></div>
                <div className="dt-alarm-summary-full-page-content">
                    <div className="dt-alarm-summary-left-panel">
                        <div className="dt-alarm-summary-label">Attended</div>
                    </div>
                    <div className="dt-alarm-summary-right-panel">
                        <table style={{ float: "right", width: "fit-content" }}><tbody><tr>
                            <td style={{ paddingRight: "5px" }}>
                                <div className="dt-alarm-summary-critical">{props.AckCritical}</div>
                            </td>
                            <td>
                                <div className="dt-alarm-summary-non-critical">{props.AckNonCritical}</div>
                            </td>
                        </tr></tbody></table>
                    </div>
                </div>
                <div style={{ width: "100%", height: "7px" }}></div>
                <div className="dt-alarm-summary-full-page-content">
                    <div className="dt-alarm-summary-left-panel">
                        <div className="dt-alarm-summary-label">Closed</div>
                    </div>
                    <div className="dt-alarm-summary-right-panel">
                        <table style={{ float: "right", width: "fit-content" }}><tbody><tr>
                            <td style={{ paddingRight: "5px" }}>
                                <div className="dt-alarm-summary-critical">{props.ClosedCritical}</div>
                            </td>
                            <td>
                                <div className="dt-alarm-summary-non-critical">{props.ClosedNonCritical}</div>
                            </td>
                        </tr></tbody></table>
                    </div>
                </div>

                <div className="dt-alarm-summary-asset-list-container">
                    <AssetListComponent
                        LocationKey={props.LocationKey}
                        uxpContext={props.uxpContext}
                        instanceId={props.instanceId}
                        dataList={props.IsBuilding == "false" ? FilteredAlarmSummaryData : AlarmSummaryData}
                    />
                </div>
            </div>
        </div>
    </div>)
};
export default AlarmSummary;