// 3d integration of selected space of particular space

import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from '../uxp';
import { TitleBar, FilterPanel, WidgetWrapper, Button, Modal, useToast } from "uxp/components";
// import './styles.scss';
import { FC, useEffect } from 'react';
import { loadSmplrJs, Smplr } from '@smplrspace/smplr-loader';
import { Space } from '@smplrspace/smplr-loader/dist/generated/smplr';
// import { evolve, map } from 'ramda';
import { Beacon, beacons, Sensor, sensors, Stall, stalls } from './iot-data'
// import { compose, concat, propEq, find, filter, map, evolve } from 'ramda'
import { BASE_URL } from "./common";
// import DetailsLayer, { AssetDetails, LocationDetails } from "../Details/DetailsLayer";


interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

const INITIAL_MODE = '3d';
const occupancyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACyklEQVR4nO2YTYhNURzAf4yvMt5kwURKslA+krCZ2AiNj40NssEgCa9ZspnxMSnJZMGUWMhCGbGSjUQWxmfCkJFMUoPGSAbJ19O/zqvTce655717p3efzq/+m3vPOf/zP+f/dS8EAoFAIBAI+FIHrAAagRxVylbgC1BQMghspMpYDPzRjCiKPGugirhuMaIoV6kSaoCvDkPE3YZXcoMNQB7YBNQ7xo0AfjkMGfQwZB6wW8XZlLQMGA1ctJzqWsec2w5DxO1ct3naGP8d2J6GIfsiNiQKpkXMWe0I9kUOXTsjdP1Wt5ToNvQUasoJx1xxi8+GS22J0dfn0NWZxJC5joVF7sbMz6li6FMQJ8fo6k1iyJyYxa+RHpNidD1OsrhkoPeOxSV+0uR5mW7sxbaIhfuGoH9aE5EkPqkbS8wOYMCIjZkeDWMbcEvJfmCch64NwFtN1xNgISkyCpgNTPUYKxt+ajnZR0Ctx/waYBYwnZSoU7dxCXihbkVO6yHQASwBhlnmtZURV2OBJuA80AN8AN6pID8FrCqntZHNNRt1IEruWYrV6xLTaJPhuoUIeRZTUP8x4qzHorpIk7hcc0FbwOpVWrJhkaMl6voBrPMxJG+ZLFd8DjgMHFOt+E9jzEcts/Q7NvJK07Xe8n5AudcRoB24otohfcw3YEacIW8sJyhBet8Qc5xIi1rjuMOQQ5quB5b33RZdvZZxosMZ3IUEUuyHxkdkrW4ja5knXShBbsTFx8sEi+/R1sqpDNWl1RGzgHYl0NUe51ryIdOqAr7TUzrUB5fk/yJjgPnASiUL1DOdCcBe4EwJuk6q7xPpzIeUxogALahnl4FlZJha4EKJ8SRFMFOMBG6WGbB6Tak4zREZ6gCwWcnBiEwmdSsz3EmQfeRHRWboSWCIfExlhrylZfHtm3aRMerVP9+lniJjJ1Z604FAIBAI/Ff8Bctn99hqdLNAAAAAAElFTkSuQmCC'


export const IOT: React.FunctionComponent<IWidgetProps> = (props) => {

    const spaceRef = React.useRef<Space>();

    const [viewerReady, setViewerReady] = React.useState(false);
    const [modalId, setModalId] = React.useState(null)
    const [onOpen, setOnOpen] = React.useState(true)


    // handle 2d/3d modes
    const [mode, setMode] = React.useState<'2d' | '3d'>(INITIAL_MODE);
    const onModeChange = React.useCallback(setMode, []);


    // start viewer
    useEffect(() => {
        // we recommend using the default value 'esm' in your code but stackblitz required 'umd'
        loadSmplrJs('umd')
            .then((smplr) => {
                spaceRef.current = new smplr.Space({
                    spaceId: 'spc_j50p1j5y',
                    clientToken: 'pub_245931da5bad4cdc8a8b3b12c74b4b6d',
                    containerId: 'test',
                    // autoplay: true,
                });
                spaceRef.current.startViewer({
                    preview: false,
                    mode,
                    allowModeChange: true,
                    onModeChange,
                    onReady: () => {
                        setViewerReady(true)
                        const orbitBtn = document.querySelector('[class*="mode-toggle"] button');
                        if (orbitBtn) (orbitBtn as HTMLElement).click();
                    },
                    onError: (error) => console.error('Could not start viewer', error),
                });

            })
            .catch((error) => console.error(error));
    }, []);

    let [modalItem, setModelItem] = React.useState<any>(
        {
            "id": '',
            "type": ''
        })

    // const modalItem = compose(
    //     find(propEq('id', modalId)),
    // )(sensors)

    // show data when viewer ready

    function fakeUserInteraction() {
        const event = new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        document.dispatchEvent(event);
    }
    useEffect(() => {
        if (!viewerReady) {
            return;
        }
        fakeUserInteraction();
        spaceRef.current.addDataLayer<Stall>({
            id: 'stalls',
            type: 'polygon',
            data: stalls,
            // tooltip: (d) => `${d.name} - ${d.hits} occupied`,
            tooltip: (d) => `FCU-L24-021`,
            color: (d) =>
                d.hits < 8 ? '#3aa655' : d.hits < 16 ? '#c08727' : '#ff3f34',
            alpha: 0.7,
            height: mode === '3d' ? 1.9 : 0.0045,
            onClick: d => {
                setModalId(d.name)
                setModelItem({ id: d.name, type: 'stalls', occ: d.hits })
            }
        });

        // setModalId('FCU-L24-021')
        return () => {
            spaceRef.current.removeDataLayer('stalls');
            spaceRef.current.removeDataLayer('sensors');
            // spaceRef.current.removeDataLayer('beacons');
            // spaceRef.current.removeDataLayer('beacons-range');
        };
    }, [viewerReady, mode]);

    let renderTooltipWithModal = () => {
        // let _id = id
        let _title = ''
        let _type = ''

        console.log(modalId)
        console.log(modalItem)
        if (modalItem["type"] == 'point') {
            _title = `Sensor ${modalItem.id}`
            _type = 'sensors'
        } else {
            _title = `${modalItem.id}`
            _type = 'rooms'
        }
        return (
            <Modal
                // title={`Sensor ${modalId}`}
                // title={
                //     <div>
                //         <img src="https://smartfm.iviva.cloud/Resources/CMAT/img/uxpicons/asset-colored.svg" class="dt-details-box-main-title-icon">
                //         FCU-L24-021
                //     </div>
                // }
                // title={
                //     <div style={{color:"white",backgroundColor:"#424242",width:"100%"}}>
                //         <div className="InsightPopup-ColumnDevideX" style= {{width:"100%"}}>
                //             <div className="InsightPopup-ColumnX" style= {{width:"5%"}}>
                //                 <div className="Insight-fauldetiontable-insighticon-container">
                //                     <div className="Insight-fauldetiontable-insighticon"></div>
                //                 </div>
                //             </div>
                //             <div className="InsightPopup-ColumnX" style= {{width:"45%"}}>
                //                 <div style={{marginLeft:"-28px",paddingTop:"3px"}}>Insight</div>
                //             </div>
                //             <div className="InsightPopup-ColumnX" style= {{width:"50%"}}>
                //                 <div style={{paddingTop:"3px",float:"right"}}>{AssetID}</div>
                //             </div>
                //         </div>
                //     </div>
                // }
                show={modalId}
                onClose={() => {
                    setModalId(null)
                    setOnOpen(false)
                    setModelItem({})
                }}
                className="dt-custom-modal"

            >
                {/* <div className='tool-tips'>
                    <Button className='incident-management' title='Incident Management' onClick={() => window.open('https://demo.iviva.cloud/Apps/UXP/dashboards/IM20230728034')}></Button>
                    <Button className='corrective-workorder' title='Corrective Workorder' onClick={() => window.open('https://demo.iviva.cloud/apps/ivivafacility/wsp-workorders')}></Button>
                </div>
                <div className="tooltip-list">
                    <div className="tooltip-item" style={{ display: 'flex', gap: '5px' }}>
                        <img style={{ width: '15px', height: '15px' }} src="https://demo.iviva.cloud/Resources/DigitalTwin/icon/comfort.svg"></img>
                        <div>Incident Management 5</div>
                    </div>
                    <div className="tooltip-item" style={{ display: 'flex', gap: '5px' }}>
                        <img style={{ width: '15px', height: '15px' }} src="https://demo.iviva.cloud/Resources/DigitalTwin/icon/workorder.svg"></img>
                        <div>Corrective Workorders 6</div>
                    </div>

                    {_type == 'rooms' && <div className="tooltip-item" style={{ display: 'flex', gap: '5px' }}>
                        <img style={{ width: '15px', height: '15px' }} src={occupancyImage}></img>
                        <div>{`Occupancy :${modalItem.occ}`}</div>
                    </div>}

                </div> */}
                <div className="iot-fault-card-fault-card">
                    <div style={{ display: 'flex', gap: '5px', borderBottom: "1px solid #424242", paddingBottom: "5px", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                        <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                            <img src={`${BASE_URL}/Resources/CMAT/img/uxpicons/asset-colored.svg`} className='dt-details-box-main-title-icon' />
                            <h3 className="device-id">FCU-L24-021</h3>
                        </div>
                        <div className="iot-fault-card-box-close-button-position">
                            <div className="iot-fault-card-box-close-button"
                                onClick={() => {
                                    setModalId(null)
                                    setOnOpen(false)
                                    setModelItem({})
                                }}
                            >
                                <div className="iot-fault-card-box-close-button-icon"></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: "center" }}>
                        <div className="iot-fault-card-fault-card-location-icon"></div>
                        <h4 className="device-id">B2 Tower.L24.Room21</h4>
                    </div>

                    <div className="device-details">
                        <p><strong>Brand:</strong> Carrier</p>
                        <p><strong>Model:</strong>42CT</p>
                        <p><strong>SerialNo:</strong> 4EO-6KL-HK7</p>
                        <p><strong>Year Of First Administration:</strong> 2023</p>
                    </div>

                    <div className="fault-section">
                        <p className="fault-title">Fault Detected</p>
                        <h4>FCU CHW Valve Control</h4>

                        <ul className="fault-reasons">
                            <li className="reason-item">Return Air Temperature (28°C) is greater than threshold</li>
                            <li className="reason-item">Control Valve is not commanded to open fully</li>
                            <li className="reason-item">which can be further ramped up</li>
                        </ul>
                    </div>

                    <div className="recommendations">
                        <p className="recommendation-title">Recommendations</p>
                        <ol>
                            <li>Check the maximum command value set</li>
                            <li>If no maximum value is configured, please review system settings</li>
                        </ol>
                    </div>
                </div>

            </Modal>
        )
    }

    const [DetailType, setDetailType] = React.useState<string>(null);
    const [Details, setDetails] = React.useState<any>(null);

    React.useEffect(() => {
        // if (props.LocationKey != null && props.LocationKey != undefined) {
        // GetDetails();
        // }
    }, [viewerReady, mode]);

    let toast = useToast();
    function GetDetails() {
        setDetailType(null);
        setDetails(null);
        props.uxpContext?.executeAction("DTHardcodeData", 'GetObjectDetails', {
            LocationKey: 19
        }, { json: true })
            .then(res => {
                debugger
                setDetailType(res.length > 0 ? res[0].Type : null);
                setDetails(res.length > 0 ? res[0] : null);
            })
            .catch(e => {
                setDetailType(null);
                setDetails(null);
                console.log("except: ", e);
                toast.error("Something went wrong");
            })
    }

    return (
        // <WidgetWrapper>
        <>
            <TitleBar title='B2 Tower'></TitleBar>

            <div className="smplr-wrapper">
                <div id="test" className="smplr-embed"></div>
            </div>

            {/* {modalId && <Modal
                title="Sensor Data"
                show={modalId}
                onClose={() => {
                    setModalId(null)
                    setOnOpen(false)
                }}

            >
                <div className="iot-fault-card-fault-card">
                    <h3 className="device-id">CABE-FCUW-2401-001</h3>

                    <div className="device-details">
                        <p><strong>Brand:</strong> Brand</p>
                        <p><strong>Model:</strong> Model</p>
                        <p><strong>SerialNo:</strong> 4EO-6KL-HK7</p>
                        <p><strong>Year Of First Administration:</strong> 2023</p>
                    </div>

                    <div className="fault-section">
                        <p className="fault-title">Fault Detected</p>
                        <h4>FCU CHW Valve Control</h4>

                        <ul className="fault-reasons">
                            <li className="reason-item">Return Air Temperature (28°C) is greater than threshold</li>
                            <li className="reason-item">Control Valve is not commanded to open fully</li>
                            <li className="reason-item">which can be further ramped up</li>
                        </ul>
                    </div>

                    <div className="recommendations">
                        <p className="recommendation-title">Recommendations</p>
                        <ol>
                            <li>Check the maximum command value set</li>
                            <li>If no maximum value is configured, please review system settings</li>
                        </ol>
                    </div>

                    <div className="buttons">
                        <button className="view-button">View Trend</button>
                        <button className="view-button">View GUI</button>
                    </div>
                </div>
            </Modal>} */}
            {modalId && renderTooltipWithModal()}


        </>
        // </WidgetWrapper>
    )
}

// function showAlert(arg0: string): void {
//     throw new Error("Function not implemented.");
// }
