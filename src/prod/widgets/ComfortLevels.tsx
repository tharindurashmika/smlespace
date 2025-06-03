import * as React from "react";
import { IContextProvider } from "../../uxp";
import './ComfortLevels.scss';
import { DataGrid, Modal } from "uxp/components";

interface IComfortLevelsProps {
    LocationID: string,
    IsLevelSelected: string,
    uxpContext?: IContextProvider,
    instanceId?: string,
    TemperaturePercentage: string,
    HumidityPercentage: string,
    CO2Percentage: string,
    TempRange: string,
    HumidityRange: string,
    CO2Range: string,

}

const ComfortLevels: React.FunctionComponent<IComfortLevelsProps> = (props) => {

    const [selectedType, setSelectedType] = React.useState<string>('')
    const [selectedTypeRange, setSelectedTypeRange] = React.useState<string>('')
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [RoomList, setRoomList] = React.useState<any[]>([])

    const RoomDataList = [
        { LocationFullName: "Meeting Room - Block A", LocationID: "L-01", Temperature: 27.5, Humidity: 75, CO2Level: 1680 },
        { LocationFullName: "Server Room - Floor 3", LocationID: "L-02", Temperature: 21.0, Humidity: 70, CO2Level: 1200 },
        { LocationFullName: "Training Room - East Wing", LocationID: "L-03", Temperature: 24.8, Humidity: 68, CO2Level: 1120 },
        { LocationFullName: "Warehouse Office", LocationID: "L-17", Temperature: 26.0, Humidity: 73, CO2Level: 1850 },
        { LocationFullName: "Security Office", LocationID: "L-18", Temperature: 22.6, Humidity: 71, CO2Level: 1590 },
        { LocationFullName: "Manager Cabin - Block C", LocationID: "L-19", Temperature: 23.4, Humidity: 75, CO2Level: 1680 },
        { LocationFullName: "Meeting Room 1", LocationID: "L-24", Temperature: 28.5, Humidity: 0, CO2Level: 0 }
    ];

    const handleModalOpen = (type: string, range: string) => {
        setSelectedType(type);
        setSelectedTypeRange(range)
        setShowModal(true);
    };

    // React.useEffect(() => {
    //     let filteredList = RoomDataList;

    //     if (props.IsLevelSelected == 'true') {
    //         let list = RoomDataList.filter(room => room.LocationID === 'L-24');
    //         setRoomList(list)
    //     } else {
    //         setRoomList(RoomDataList)
    //     }
    // }, [props.IsLevelSelected])
    React.useEffect(() => {
        let filteredList = RoomDataList;

        // First filter by LocationID if IsLevelSelected is true
        if (props.IsLevelSelected === 'true') {
            filteredList = filteredList.filter(room => room.LocationID === 'L-24');
        }

        // Filter out rooms with Temperature, Humidity, or CO2Level == 0
        filteredList = filteredList.filter(room => {
            if (selectedType === 'Temperature') {
                return Number(room.Temperature) !== 0;
            } else if (selectedType === 'Humidity') {
                return Number(room.Humidity) !== 0;
            } else if (selectedType === 'CO2') {
                return Number(room.CO2Level) !== 0;
            }
            return true; // if none selected, return all
        });

        setRoomList(filteredList);
    }, [props.IsLevelSelected, showModal]);

    function renderGridItem(item: any, key: number) {

        return (
            <div key={key} className="table-row">
                <span>{item.LocationID}</span>
                <span style={{ width: '250px' }}>{item.LocationFullName}</span>
                <span>
                    {selectedType == 'Temperature' && `${item.Temperature}°C`}
                    {selectedType == 'Humidity' && `${item.Humidity}%`}
                    {selectedType == 'CO2' && `${item.CO2Level} ppm`}
                </span>
            </div>
        )
    }

    return (
        <div id="dt-comfortlevel-main-widget-id" className="dt-comfortlevel-main">
            <div className="dt-comfortlevel-header">
                <div className="dt-comfortlevel-title-icon">
                    <i className="uxp-icon uxp-icon-thermometer" />
                </div>
                <span className="dt-comfortlevel-title">
                    Comfort Levels - {props.LocationID}
                </span>
            </div>

            <div className="dt-comfortlevel-content">
                <div className="dt-comfortlevel-card" onClick={() => handleModalOpen('Temperature', props.TempRange)}>
                    <div className="dt-comfortlevel-icon temperature" />
                    <div className="dt-comfortlevel-info">
                        <div className="dt-percentage">{props.TemperaturePercentage || '0%'} of rooms</div>
                        <div className="dt-range">Temperature within {props.TempRange || 'N/A'}</div>
                    </div>
                </div>

                <div className="dt-comfortlevel-card" onClick={() => handleModalOpen('CO2', props.CO2Range)}>
                    <div className="dt-comfortlevel-icon co2" />
                    <div className="dt-comfortlevel-info">
                        <div className="dt-percentage">{props.CO2Percentage || '0%'} of rooms</div>
                        <div className="dt-range">CO2 within {props.CO2Range || 'N/A'}</div>
                    </div>
                </div>

                <div className="dt-comfortlevel-card" onClick={() => handleModalOpen('Humidity', props.HumidityRange)}>
                    <div className="dt-comfortlevel-icon humidity" />
                    <div className="dt-comfortlevel-info">
                        <div className="dt-percentage">{props.HumidityPercentage || '0%'} of rooms</div>
                        <div className="dt-range">Humidity within {props.HumidityRange || 'N/A'}</div>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                onOpen={() => { }}
                onClose={() => setShowModal(false)}
                title={`Rooms - ${selectedType} outside ${selectedTypeRange}`}
                className="dt-comfort-modal"
            >
                <div className="comfort-modal">
                    {/* <h2 className="modal-title">Floor-wise {selectedType.toUpperCase()} Levels</h2> */}
                    {RoomList.length > 0 &&
                        <div className="comfort-table">
                            <div className="table-header">
                                <span>Floor</span>
                                <span>Location</span>
                                <span>{selectedType === 'Temperature' ? 'Temperature (°C)' : selectedType === 'CO2' ? 'CO₂ (ppm)' : 'Humidity (%)'}</span>
                            </div>

                            <DataGrid
                                data={RoomList}
                                renderItem={renderGridItem}
                                columns={1}
                            />
                            {/* {RoomDataList.map((room, index) => (
                            <div key={index} className="table-row">
                                <span>{room.LocationID}</span>
                                <span>{room.LocationFullName}</span>
                                <span>
                                    {selectedType === 'temperature' && `${room.Temperature}°C`}
                                    {selectedType === 'humidity' && `${room.Humidity}%`}
                                    {selectedType === 'co2' && `${room.CO2Level} ppm`}
                                </span>
                            </div>
                        ))} */}
                        </div>
                    }
                    {RoomList.length == 0 &&
                        <div>No Data</div>
                    }

                </div>
            </Modal>
        </div>
    );
};

export default ComfortLevels;
