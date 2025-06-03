import { memo } from 'react';
import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, enableLocalization, registerCustomWidgetTemplate, } from '../uxp';
import { TitleBar, FilterPanel, WidgetWrapper, useUpdateWidgetProps, Modal } from "uxp/components";
import { IWDDesignModeProps } from "widget-designer/components";
import { loadSmplrJs, Smplr } from '@smplrspace/smplr-loader';
import { Furniture, Space } from '@smplrspace/smplr-loader/dist/generated/smplr';
import { Bell, bells, Carpet, carpets, Furnitures, furnitures, Sensors, sensors, Stall, stalls, Zoneicon, zoneicon, zones, Zones } from './smplr-data';
import DraggableWidget from './widgets/DraggableWidget_C';
import AlarmSummary from './widgets/alarm-summary';
import ImageWidget1 from './widgets/ImageWidget1';
import EnergyGuage from './widgets/EnergyGuage';
import { BASE_URL } from './common';

import './smplrspace.scss'
import Occupancy from './widgets/occupancy';
import ComfortLevels from './widgets/ComfortLevels';
import { faL } from '@fortawesome/free-solid-svg-icons';

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
    designer?: IWDDesignModeProps,
    uiProps?: any
    childwidgets?: any;
    onchangechildwidget?: (childwidgets: any) => void
}

const SmplrspaceProject: React.FunctionComponent<IWidgetProps> = (props) => {

    const spaceRef = React.useRef<Space>();
    const [viewerReady, setViewerReady] = React.useState(false)
    const [previousLevels, setPreviousLevels] = React.useState<number[]>([]);
    const [levelIndex, setLevelIndex] = React.useState<number>(0);
    const [selectedLevelIndex, setSelectedLevelIndex] = React.useState<number | null>(null);
    const [LevelSelected, setLevelSelected] = React.useState<boolean>(false);
    const [modalId, setModalId] = React.useState(null)
    const [onOpen, setOnOpen] = React.useState(null)

    const [faultType, setFaultType] = React.useState<'asset' | 'comfort'>('asset');

    let [modalItem, setModelItem] = React.useState<any>(
        {
            "id": '',
            "type": ''
        })
    // const [allLevels, setAllLevels] = React.useState<number[]>([
    //     1, 2, 3, 4, 5, 6, 7, 8,
    //     9, 10, 11, 12, 13, 14, 15,
    //     16, 17, 18, 19, 20, 21,
    //     22, 23, 24, 25, 26, 27, 28, 29, 30
    // ]);
    const [allLevels, setAllLevels] = React.useState<number[]>(Array.from({ length: 30 }, (_, i) => i)); // 0 to 29


    React.useEffect(() => {
        loadSmplrJs('umd')
            .then((smplr) => {
                spaceRef.current = new smplr.Space({
                    spaceId: 'spc_j50p1j5y',
                    clientToken: 'pub_245931da5bad4cdc8a8b3b12c74b4b6d',
                    containerId: 'smplr-container',
                });
                spaceRef.current.startViewer({
                    //preview: false,
                    //mode,
                    allowModeChange: true,
                    //onModeChange,
                    //onReady: (viewer:any) => setViewerReady(true),
                    onReady: () => setViewerReady(true),
                    onError: (error) => console.error('Could not start viewer', error),
                });
            })
            .catch((error) => console.error(error));
    }, []);

    React.useEffect(() => {
        if (!viewerReady) {
            return;
        }
        spaceRef.current.addDataLayer<Stall>({
            id: 'stalls',
            type: 'polygon',
            data: stalls,
            tooltip: (d) => `FCU-L24-021`,
            color: (d) => '#0f83a6',
            // color: (d) => '#ff3f34',
            height: 1.9,
            onClick: d => {
                console.log(d);

                setLevelSelected(true);
                const viewer = (spaceRef.current as any).viewerRef;
                viewer.current.centerCam()
                let levelIndex = d.levelIndex as number;
                console.log("levelIndex: ", levelIndex);
                setSelectedLevelIndex(levelIndex);
                spaceRef.current.includeLevels([levelIndex]);
                setTimeout(() => {
                    const viewer = (spaceRef.current as any).viewerRef;

                    console.log("viewer: ", viewer);
                    if (viewer) {

                        viewer.current.centerCam()

                    }
                }, 1000);
                if (spaceRef.current && d.levelIndex !== undefined) {
                    spaceRef.current.removeDataLayer("bells");
                    spaceRef.current.removeDataLayer("stalls");
                    spaceRef.current.addDataLayer<Stall>({
                        id: 'stalls',
                        type: 'polygon',
                        data: stalls,
                        tooltip: (d) => `FCU-L24-021`,
                        color: (d) => '#e00022',
                        // color: (d) => '#ff3f34',
                        height: 1.9,
                        onClick: d => {
                            console.log(d);

                            if (spaceRef.current && d.levelIndex !== undefined) {
                                // <-- Store it
                                setLevelIndex(levelIndex);
                                setModalId(d.name);
                                setModelItem({ id: d.name, type: 'polygon', available: d.available });

                            }
                        }
                    });
                }
            }
        });


        spaceRef.current.addDataLayer<Sensors>({
            id: 'sensors',
            type: 'point',
            data: sensors,
            tooltip: (d) => `${d.name} - Occupancy: ${d.value}`,
            color: (d) => `${d.color}`,
            alpha: 0.7,
            shape: 'sphere', // Added shape property
        });




        spaceRef.current.addDataLayer<Bell>({
            id: 'bells',
            type: 'icon',
            data: bells,
            //tooltip: (d) => `Sensor ${d.id}`,
            icon: {
                url: 'https://smartfm.iviva.cloud/Resources/C2ODemo/alarm.png',
                width: 500,
                height: 500,
            },

            width: 2,
            onClick: d => {
                console.log(d);

                setLevelSelected(true);
                const viewer = (spaceRef.current as any).viewerRef;
                viewer.current.centerCam()
                const ln: number = d.position.levelIndex;
                debugger
                console.log("levelIndex: ", ln);
                setSelectedLevelIndex(ln);
                spaceRef.current.includeLevels([ln]);
                setTimeout(() => {
                    const viewer = (spaceRef.current as any).viewerRef;

                    console.log("viewer: ", viewer);
                    if (viewer) {

                        viewer.current.centerCam()

                    }
                }, 1000);
                spaceRef.current.removeDataLayer("bells");
                spaceRef.current.removeDataLayer("stalls");
                spaceRef.current.removeDataLayer("zones");
                if (spaceRef.current && d.position.levelIndex !== undefined) {
                    spaceRef.current.addDataLayer<Stall>({
                        id: 'stalls',
                        type: 'polygon',
                        data: stalls,
                        tooltip: (d) => `${d.label}`,
                        color: (d) => '#0f83a6',
                        // color: (d) => '#ff3f34',
                        height: 1.9,
                        onClick: d => {
                            console.log(d);

                            if (spaceRef.current && d.levelIndex !== undefined) {
                                // <-- Store it
                                setLevelIndex(d.levelIndex);
                                setOnOpen(true)
                                setFaultType('asset')
                                setModalId(d.name);
                                setModelItem({ id: d.name, type: 'polygon', available: d.available });

                            }
                        }
                    });

                    spaceRef.current.addDataLayer<Zones>({
                        id: 'zones',
                        type: 'polygon',
                        data: zones,
                        tooltip: (d) => `${d.label}`,
                        color: (d) => '#cdcccc',
                        // color: (d) => '#ff3f34',
                        height: 0.9,
                        onClick: d => {
                            console.log(d);
                            setOnOpen(true);
                            setFaultType('comfort');
                        }
                    });

                    spaceRef.current.addDataLayer<Zoneicon>({
                        id: 'Zoneicon',
                        type: 'icon',
                        data: zoneicon,
                        //tooltip: (d) => `Sensor ${d.id}`,
                        icon: {
                            url: 'https://smartfm.iviva.cloud/resources/C2ODemo/high-temperature.png',
                            width: 800,
                            height: 800,
                        },

                        width: 4,
                        onClick: d => { }
                    });

                    spaceRef.current.addDataLayer<Carpet>({
                        id: 'carpets',
                        type: 'polygon',
                        data: carpets,
                        // tooltip: (d) => `${d.label}`,
                        color: (d) => '#285231',
                        // color: (d) => '#ff3f34',
                        height: 0.1
                    });
                }
            }
        });

        spaceRef.current.addDataLayer<Furnitures>({
            id: 'furnitures',
            type: 'furniture',
            data: furnitures,
            // tooltip: (d) => `${d.name}`,
            color: (d) => `${d.color}`,
            // alpha: 0.7,
            // shape: 'cube', // Added shape property
        });


        return () => {
            spaceRef.current.removeDataLayer('stalls');
            spaceRef.current.removeDataLayer("bells");
        };
    }, [viewerReady]);

    const updatewidgetprops = useUpdateWidgetProps()

    function HandleChildWidgetsChange(childwidgets: any) {
        updatewidgetprops(props.instanceId, { childwidgets: childwidgets })
    }

    const childWidgetRef = React.useRef(props.childwidgets)
    function HandleWidgetProps(widgetid: string, widgetprops: any) {
        // console.log("HandleWidgetProps: ", widgetid , 'widgetprops: ' , widgetprops , 'props.instanceId: ', props.instanceId, {'childwidgets':{...props?.childwidgets||{},[widgetid]:widgetprops}});
        // updatewidgetprops(props.instanceId, {'childwidgets':{...props?.childwidgets||{},[widgetid]:widgetprops}})

        //props.onchangechildwidget({...props?.childwidgets||{},[widgetid]:widgetprops})
        const updated = { ...childWidgetRef.current, [widgetid]: widgetprops }

        childWidgetRef.current = updated

        // props.onchangechildwidget(updated)
        HandleChildWidgetsChange(updated)
    }


    // const [position, setPosition] = React.useState({ x: 100, y: 100 });
    // const dragging = React.useRef(false);
    // const offset = React.useRef({ x: 0, y: 0 });

    const [position1, setPosition1] = React.useState({ x: 10, y: 100 });
    const dragging1 = React.useRef(false);
    const offset1 = React.useRef({ x: 0, y: 0 });

    const [position2, setPosition2] = React.useState({ x: 1080, y: 100 });
    const dragging2 = React.useRef(false);
    const offset2 = React.useRef({ x: 0, y: 0 });

    const [position3, setPosition3] = React.useState({ x: 1080, y: 300 });
    const dragging3 = React.useRef(false);
    const offset3 = React.useRef({ x: 0, y: 0 });

    const [position4, setPosition4] = React.useState({ x: 1079, y: 512 });
    const dragging4 = React.useRef(false);
    const offset4 = React.useRef({ x: 0, y: 0 });

    const [position5, setPosition5] = React.useState({ x: 10, y: 490 });
    const dragging5 = React.useRef(false);
    const offset5 = React.useRef({ x: 0, y: 0 });

    // React.useEffect(() => {
    //     if (LevelSelected) {
    //         setPosition4({ x: 340, y: 55 });
    //         setPosition5({ x: 740, y: 55 });
    //     }
    // }, [LevelSelected])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        if (id == "1") {
            dragging1.current = true;
            offset1.current = {
                x: e.clientX - position1.x,
                y: e.clientY - position1.y,
            };
        } else if (id == "2") {
            dragging2.current = true;
            offset2.current = {
                x: e.clientX - position2.x,
                y: e.clientY - position2.y,
            };
        } else if (id == "3") {
            dragging3.current = true;
            offset3.current = {
                x: e.clientX - position3.x,
                y: e.clientY - position3.y,
            };
        } else if (id == "4") {
            dragging4.current = true;
            offset4.current = {
                x: e.clientX - position4.x,
                y: e.clientY - position4.y,
            };
        } else if (id == "5") {
            dragging5.current = true;
            offset5.current = {
                x: e.clientX - position5.x,
                y: e.clientY - position5.y,
            };
        }

        document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging1.current) {
            setPosition1({
                x: e.clientX - offset1.current.x,
                y: e.clientY - offset1.current.y,
            });
        }

        if (dragging2.current) {
            setPosition2({
                x: e.clientX - offset2.current.x,
                y: e.clientY - offset2.current.y,
            });
        }

        if (dragging3.current) {
            setPosition3({
                x: e.clientX - offset3.current.x,
                y: e.clientY - offset3.current.y,
            });
        }

        if (dragging4.current) {
            setPosition4({
                x: e.clientX - offset4.current.x,
                y: e.clientY - offset4.current.y,
            });
        }

        if (dragging5.current) {
            setPosition5({
                x: e.clientX - offset5.current.x,
                y: e.clientY - offset5.current.y,
            });
        }
    };

    const handleMouseUp = () => {
        dragging1.current = false;
        dragging2.current = false;
        dragging3.current = false;
        dragging4.current = false;
        dragging5.current = false;
        document.body.style.cursor = 'default';
    };

    // Attach global listeners once
    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    let renderTooltipWithModal = (type: string) => {
        let _title = ''
        let _type = ''

        console.log(modalId)
        console.log(modalItem)
        if (modalItem["type"] == 'polygon') {
            _title = `Room: ${modalItem.id}`
            _type = 'rooms'
        } else {
            _title = `${modalItem.id}`
            _type = 'desks'
        }
        debugger
        if (type == 'comfort') {
            return (
                <Modal
                    title={_title}
                    show={onOpen}
                    onClose={() => {
                        setModalId(null)
                        setOnOpen(false)
                        setModelItem({})
                    }}
                    className="dt-custom-modal"
                >
                    <div className="iot-fault-card-fault-card">
                        <div style={{ display: 'flex', gap: '5px', borderBottom: "1px solid #424242", paddingBottom: "5px", alignItems: "center", justifyContent: "space-between", position: "relative", height: '40px' }}>
                            <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                                <div className='dt-details-box-main-title-icon iot-fault-card-fault-card-icon'></div>
                                <h3 className="device-id">Meeting Room 1</h3>
                            </div>
                            <div className="iot-fault-card-box-close-button-position">
                                <div className="iot-fault-card-box-close-button"
                                    onClick={() => {
                                        setModalId(null)
                                        setOnOpen(false)
                                        setModelItem({})
                                    }}
                                    title='Close'
                                >
                                    <div className="iot-fault-card-box-close-button-icon"></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', alignItems: "center", height: '20px' }}>
                            <div className="iot-fault-card-fault-card-location-icon"></div>
                            <h4 className="device-id" style={{ fontSize: '15px' }}>80 Robinson Road.L-24.Meeting Room 01</h4>
                        </div>

                        <div style={{ alignContent: 'center', padding: '3px', borderRadius: '5px', display: 'flex', gap: '5px', flexDirection: 'column' }}>

                            <div className='iot-fault-card-fault-card-header' >
                                <h4 style={{ margin: '0' }}>Comfort Failure Detected</h4>
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '5px' }}>
                                    <div className="fault-card-cwo"
                                        onClick={() => {
                                            window.open('https://smartfm.iviva.cloud/Apps/UXP/screen/root-cause-analysis?ak=7&atk=59&aklist=9,10&space=2', '_blank')
                                        }}
                                    >RCA</div>
                                    <div className="fault-card-cwo"
                                        onClick={() => {
                                            window.open('https://smartfm.iviva.cloud/Apps/IvivaDX/apps/14/details/14', '_blank')
                                        }}
                                    >CWO</div>
                                </div>
                            </div>
                            <div className="fault-section">


                                <ul className="fault-reasons">
                                    <li className="reason-item">Temperature is out of desired range (22-26) °C</li>
                                </ul>
                                {/* <div className="en-widget-container bcolor-widget" style={{ backgroundColor: "#00000052" }}> */}
                                <img src={`${BASE_URL}/Resources/C2ODemo/img/smartfm_comfortfailure2025april.png`} alt="Description" style={{ width: "100%", height: "auto" }} />
                                {/* </div> */}
                            </div>
                        </div>

                    </div>

                </Modal>
            )
        } else {
            return (
                <Modal
                    title={_title}
                    show={onOpen}
                    onClose={() => {
                        setModalId(null)
                        setOnOpen(false)
                        setModelItem({})
                    }}
                    className="dt-custom-modal"
                >
                    <div className="iot-fault-card-fault-card">
                        <div style={{ display: 'flex', gap: '5px', borderBottom: "1px solid #424242", paddingBottom: "5px", alignItems: "center", justifyContent: "space-between", position: "relative", height: '40px' }}>
                            <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                                <img src={`${BASE_URL}/Resources/CMAT/img/uxpicons/asset-colored.svg`} className='dt-details-box-main-title-icon' />
                                <h3 className="device-id">AHU L24</h3>
                            </div>
                            <div className="iot-fault-card-box-close-button-position">
                                <div className="iot-fault-card-box-close-button"
                                    onClick={() => {
                                        setModalId(null)
                                        setOnOpen(false)
                                        setModelItem({})
                                    }}
                                    title='Close'
                                >
                                    <div className="iot-fault-card-box-close-button-icon"></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', alignItems: "center", height: '20px' }}>
                            <div className="iot-fault-card-fault-card-location-icon"></div>
                            <h4 className="device-id" style={{ fontSize: '15px' }}>80 Robinson Road.L-24</h4>
                        </div>

                        <div className="device-details">
                            <p><strong>Brand:</strong> Carrier</p>
                            <p><strong>Model:</strong> 39TD</p>
                            <p><strong>Serial No:</strong> 4EO-6KL-HK7</p>
                            <p><strong title='Year of Manufacture'>YOM:</strong> 2023</p>
                        </div>

                        <div style={{ alignContent: 'center', padding: '3px', backgroundColor: 'whitesmoke', borderRadius: '5px', display: 'flex', gap: '5px', flexDirection: 'column' }}>

                            <div className='iot-fault-card-fault-card-header'>
                                <div
                                    style={{ display: 'flex', gap: '5px', alignItems: "center" }}
                                >
                                    {/* <div className="iot-fault-card-fault-card-header-icon"></div> */}
                                    <div className="dt-alarm-summary-list-type-icon-container">
                                        <div className="dt-alarm-summary-list-icon-fault critical-status-icon"></div>
                                    </div>
                                    <h4 className="fault-card-header">Fault Detected</h4>
                                </div>
                                <p>2025-04-06 12:45</p>
                                <div className="fault-card-cwo"
                                    onClick={() => {
                                        window.open('https://smartfm.iviva.cloud/Apps/IvivaDX/apps/14/details/11', '_blank')
                                    }}
                                >CWO</div>
                                {/* <div className='asset-fault-detail-ppup-work-order-status'>
                                    New
                                </div> */}

                            </div>
                            <div className="fault-section">
                                <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}>
                                    <h4>AHU CHW Valve Control</h4>
                                    <div className='asset-fault-detail-ppup-work-order-status'

                                        onClick={() => {
                                            window.open('https://smartfm.iviva.cloud/Apps/UXP/screen/fault-detection-details?timk=66', '_blank')
                                        }}>
                                        Fault Insights
                                    </div>
                                </div>

                                <ul className="fault-reasons">
                                    <li className="reason-item">Supply Air Temperature (20°C) is greater than its setpoint range ((16+1)°C)</li>
                                    <li className="reason-item">Chilled Water Valve Control is not commanded to open fully.</li>
                                    <li className="reason-item">The current control value 50% which can be further ramped up.</li>
                                </ul>
                            </div>

                            <div className="recommendations">
                                <p className="recommendation-title">Recommendations</p>
                                <ul className='fault-reasons'>
                                    <li className="reason-item">Check the maximum command value set for the control valve.</li>
                                    <li className="reason-item">If no maximum value is configured, please review the internal operational logic of the chilled water valve control with the BMS contractor.</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </Modal>
            )
        }
    }

    // let renderTooltipWithModalComfort = () => {
    //     let _title = ''
    //     let _type = ''

    //     console.log(modalId)
    //     console.log(modalItem)
    //     if (modalItem["type"] == 'polygon') {
    //         _title = `Room: ${modalItem.id}`
    //         _type = 'rooms'
    //     } else {
    //         _title = `${modalItem.id}`
    //         _type = 'desks'
    //     }
    //     return (

    //     )
    // }

    return (
        <WidgetWrapper>
            <div className="smlp-full-area">
                <div
                    id='smplr-container'
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'whitesmoke'
                    }}
                />
                <div className="dt2d-view-loging-user-profile-position">
                    <div className="dt2d-view-loging-user-profile-container">
                        {/* <UserProfile /> */}
                    </div>
                </div>


            </div>
            {onOpen && renderTooltipWithModal(faultType)}
            {/* {modalId && renderTooltipWithModalComfort()} */}
            {/* {renderTooltipWithModalComfort()} */}
            {/* <div className='smlp-full-area-title-bar' style={{ zIndex: '99', paddingInlineStart: '25px', paddingTop: '15px', fontSize: '16px', fontWeight: 'bold' }}>80 Robinson Road</div> */}
            {<div
                onMouseDown={(e) => handleMouseDown(e, '1')}
                style={{
                    position: 'absolute',
                    left: position1.x,
                    top: position1.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '370px',
                    width: '400px',
                }}
            >
                <AlarmSummary
                    LocationKey={''}
                    uxpContext={props.uxpContext}
                    NewCritical={LevelSelected ? '1' : '1'}
                    NewNonCritical={LevelSelected ? '0' : '0'}
                    AckCritical={LevelSelected ? '0' : '0'}
                    AckNonCritical={LevelSelected ? '0' : '2'}
                    ClosedCritical={LevelSelected ? '1' : '11'}
                    ClosedNonCritical={LevelSelected ? '2' : '8'}
                    TotalCritical={LevelSelected ? '1' : '1'}
                    TotalNonCritical={LevelSelected ? '0' : '0'}
                    IsBuilding={LevelSelected ? 'false' : 'true'}
                    LocationID={LevelSelected ? 'L-24' : '80 Robinson Road'}
                />
            </div>
            }
            {<div
                onMouseDown={(e) => handleMouseDown(e, '2')}
                style={{
                    position: 'absolute',
                    left: position2.x,
                    top: position2.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '160px',
                    width: '340px',
                }}
            >
                <ImageWidget1
                    isLeveldUp={LevelSelected}

                ></ImageWidget1>
            </div>
            }
            {<div
                onMouseDown={(e) => handleMouseDown(e, '3')}
                style={{
                    position: 'absolute',
                    left: position3.x,
                    top: position3.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '300px',
                    width: '340px',
                }}
            >
                <EnergyGuage
                    title="Energy Use Intensity"
                    value={304}
                    unit="kWh/m2/yr"
                    maxvalue={500}
                    isLeveledUp={LevelSelected}
                ></EnergyGuage>
            </div>
            }

            <div
                onMouseDown={(e) => handleMouseDown(e, '4')}
                style={{
                    position: 'absolute',
                    left: position4.x,
                    top: position4.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '200px',
                    width: '400px',
                }}
            >
                <Occupancy
                    LocationID={LevelSelected ? '80 Robinson Road.L-24' : '80 Robinson Road'}
                    uxpContext={props.uxpContext}
                    instanceId={props.instanceId}
                    CurrentOccupancy={LevelSelected ? '5' : '150'}
                    TotalCapacity={LevelSelected ? '25' : '200'}
                />
            </div>

            <div
                onMouseDown={(e) => handleMouseDown(e, '5')}
                style={{
                    position: 'absolute',
                    left: position5.x,
                    top: position5.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '200px',
                    width: '500px',
                }}
            >
                <ComfortLevels
                    LocationID={LevelSelected ? '80 Robinson Road - L24' : '80 Robinson Road'}
                    IsLevelSelected={LevelSelected ? 'true' : 'false'}
                    TemperaturePercentage={LevelSelected ? '90%' : '84%'}
                    HumidityPercentage={LevelSelected ? '66%' : '36%'}
                    CO2Percentage={LevelSelected ? '54%' : '4%'}
                    TempRange={'23° - 25.5°'}
                    HumidityRange={LevelSelected ? '0% - 65%' : '0% - 65%'}
                    CO2Range={'800ppm - 1100ppm'}
                    uxpContext={props.uxpContext}
                    instanceId={props.instanceId}
                />
            </div>


            <div
                onMouseDown={(e) => handleMouseDown(e, '5')}
                style={{
                    position: 'absolute',
                    left: position5.x,
                    top: position5.y,
                    cursor: 'grab',
                    padding: '10px 20px',
                    height: '200px',
                    width: '500px',
                }}
            >
                <ComfortLevels
                    LocationID={LevelSelected ? '80 Robinson Road - L24' : '80 Robinson Road'}
                    IsLevelSelected={LevelSelected ? 'true' : 'false'}
                    TemperaturePercentage={LevelSelected ? '10%' : '84%'}
                    HumidityPercentage={LevelSelected ? '0%' : '36%'}
                    CO2Percentage={LevelSelected ? '0%' : '4%'}
                    TempRange={'23° - 25.5°'}
                    HumidityRange={LevelSelected ? '0% - 65%' : '0% - 65%'}
                    CO2Range={'800ppm - 1100ppm'}
                    uxpContext={props.uxpContext}
                    instanceId={props.instanceId}
                />
            </div>

            <div className='smlp-full-area-title-bar' style={{}}>
                <div className="smlp-full-area-title-bar-building-icon"></div>
                <div className="smlp-full-area-title-bar-building-name">80 Robinson Road</div>
            </div>
            {LevelSelected && <div style={{ position: "absolute", left: "10px", top: "80px" }}
                onClick={() => {
                    setSelectedLevelIndex(null)
                    setViewerReady(false)
                    setLevelSelected(false)
                    setModalId(null)
                    loadSmplrJs('umd')
                        .then((smplr) => {
                            spaceRef.current = new smplr.Space({
                                spaceId: 'spc_j50p1j5y',
                                clientToken: 'pub_245931da5bad4cdc8a8b3b12c74b4b6d',
                                containerId: 'smplr-container',
                            });
                            spaceRef.current.startViewer({
                                //preview: false,
                                //mode,
                                allowModeChange: true,
                                //onModeChange,
                                //onReady: (viewer:any) => setViewerReady(true),
                                onReady: () => setViewerReady(true),
                                onError: (error) => console.error('Could not start viewer', error),
                            });
                        })
                        .catch((error) => console.error(error));
                }}
                className="smlp-full-area-reverse-buildingview-icon-container"
                title='View Full Building'
            >
                <div className="smlp-full-area-reverse-buildingview-icon"></div>
            </div>}
        </WidgetWrapper>
    )
};
export default SmplrspaceProject;