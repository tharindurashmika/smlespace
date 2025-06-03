import * as React from "react";
import { IContextProvider } from "../../uxp";
import './AssetListComponent.scss';
// import { BASE_URL } from "../../common";
import { DataGrid, DataTable, DropDownButton, useToast } from "uxp/components";

interface IunvsrchProps {
    LocationKey: string,
    uxpContext?: IContextProvider,
    instanceId?: string,
    dataList?: any[],
}
const AssetListComponent: React.FunctionComponent<IunvsrchProps> = (props) => {

    const [AssetList, setAssetList] = React.useState<any[]>(props.dataList || []);
    const [BASE_URL, setBASE_URL] = React.useState<string>("");

    React.useEffect(() => {
        let d = props.dataList
        // debugger
        setAssetList(d)
    }, [props.dataList]);

    function renderGridItem(item: any, key: number) {
        //let cls = (item.Source.toLowerCase())
        return (
            <div className="dt-alarm-summary-list-item">
                <table><tbody><tr>
                    <td>
                        <div className={`dt-alarm-summary-list-type-icon-container`}>
                            <div className={`dt-alarm-summary-list-icon-${item.Type.toLowerCase()} ${item.Status.toLowerCase()}-status-icon`}></div>
                        </div>
                        {/* <img src={`${BASE_URL}/Resources/DashboardIntegration/icon/QI/${item.Type == "Fault" ? "Escalation.png" : (item.Type == "Comfort" ? "ACMV.png" : (item.Type == "Energy" ? "Energy.png" : "Data.png"))}`} className="dt-warndata-notification-image" /> */}
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label" style={{ width: "150px" }}>
                            {item.ObjectID}
                        </div>
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label" style={{ width: "150px", paddingLeft: "10px", color: `${item.Status.toLowerCase() == 'critical' ? '#b82f2f' : '#e4ac77'}` }}>
                            <DropDownButton

                                className="dt-alarm-summary-list-dropdown"
                                content={() => <div>{item.Description}</div>}
                                showOnHover={true}
                            >
                                {/* <div className="dt-alarm-summary-list-type-icon-container">
                                    <div className="dt-alarm-summary-list-see-more-icon"></div>
                                </div> */}
                                {item.Description.length > 40
                                    ? item.Description.slice(0, 40) + "..."
                                    : item.Description}

                            </DropDownButton>
                        </div>
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label" style={{ width: "150px" }}>
                            {item.LocationID}
                        </div>
                    </td>
                    <td>
                        <div className="dt-alarm-summary-list-label" style={{ width: "110px" }}>
                            {item.DateTime}
                        </div>
                    </td>
                    {/* <td>
                        <div title="view" className={`dt-alarm-summary-list-icon-container`}>
                            <div className={`dt-alarm-summary-list-view-more-icon`}></div>
                        </div>
                    </td> */}
                </tr></tbody></table>
            </div>
        )
    }

    return (
        <div className="alarm-summary-list" style={{ width: "100%", height: "100%" }}>
            <DataGrid
                data={AssetList}
                renderItem={renderGridItem}
                columns={1}
                className="dt-alarm-summary-list"
            />
        </div>
    );
};
export default AssetListComponent;