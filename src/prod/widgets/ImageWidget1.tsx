import * as React from "react";
import { IContextProvider } from "../../uxp";
import {
  TitleBar,
  Loading,
  WidgetWrapper,
  Select,
  useToast,
  HorizontalScrollList,
  Tooltip,
  FilterPanel,
  ToggleFilter,
  DateRangePicker,
  Label,
  Button,
  useEventSubscriber
} from "uxp/components";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../common";

interface IWidgetProps {
  DefaultSite?: string;
  DefaultBuilding?: string;
  uxpContext?: IContextProvider;
  ViewMode?: string;
  instanceId?: string,
  isLeveldUp: boolean
}

const ImageWidget1: React.FunctionComponent<IWidgetProps> = (props) => {

  const ImageID = "1SFtzwvRvs-vbXg-n0jBQoYf_5Fxlc8Zm";
  const ImageID1 = "1SFtzwvRvs-vbXg-n0jBQoYf_5Fxlc8Zm";
  const [imagePath, setImagePath] = React.useState<string>(`https://lh3.googleusercontent.com/d/${ImageID}=w1000`);
  //const [imagePath, setImagePath] = React.useState<string>(`/src/prod/Images/Group16.png`);
  const imageBase64 = "";

  return (

    <div className="en-widget-container bcolor-widget" style={{ backgroundColor: "#00000052" }}>
      {props.isLeveldUp &&
        <img src={`${BASE_URL}/Resources/C2ODemo/img/smartfm_ubc_floor.png`} alt="Description" style={{ width: "100%", height: "auto", backgroundColor: '#78828cb0' }} />
      }
      {!props.isLeveldUp &&
        <img src={imagePath} alt="Description" style={{ width: "100%", height: "auto", backgroundColor: '#78828cb0' }} />
      }


      <div
        onClick={() => {
          window.open('https://smartfm.iviva.cloud/Apps/UXP/portal/low-energy', '_blank')
        }}
        style={{ textDecoration: 'underline', color: 'white', cursor: 'pointer', textAlign: 'right' }}
      >Gree Mark Energy Dashboard</div>
    </div>

  );
};
export default ImageWidget1;
