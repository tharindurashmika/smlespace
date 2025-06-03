import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { BASE_URL } from '../common';
import axios, { AxiosResponse } from 'axios';
import { IContextProvider, } from '../../uxp';
import { useToast } from "uxp/components";
import "./DraggableWidget.scss";

interface Positions {
  width: number,
  height: number,
  x: number,
  y: number,
  lockstatus: boolean
}

interface IsubProps {
  id: string,
  children: React.ReactNode,
  uxpContext?: IContextProvider
  onresize: (updatedposition: Positions) => void
  position: Positions
}

const DraggableWidget: React.FunctionComponent<IsubProps> = (props) => {
  const toast = useToast();
  const [isLocked, setIsLocked] = useState(false); // Lock state
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  }); // Widget position and size

  // const DraggableWidget: React.FC<{ id: string; children: React.ReactNode }> = ({
  //   id,
  //   children,
  // }) => {
  //   const [isLocked, setIsLocked] = useState(false); // Lock state
  //   const [position, setPosition] = useState({
  //     x: 50,
  //     y: 50,
  //     width: 200,
  //     height: 100,
  //   }); // Widget position and size


  //   // Load position from localStorage
  //   useEffect(() => {
  //     // const savedPosition = localStorage.getItem(`widget-${props.id}`);
  //     // if (savedPosition) {console.log("savedPosition: ", savedPosition);
  //     //   setPosition(JSON.parse(savedPosition));
  //     //   GetSizePosition(props.id)
  //     // }
  //     GetSizePosition(props.id)
  //   }, [props.id]);

  // Load position from localStorage
  useEffect(() => {
    if (!!props.position) {
      setPosition(props.position);
      setIsLocked(props.position.lockstatus)
    }
  }, [props.position]);

  // useEffect(() => {location.reload();

  // }, [props.position]);


  async function UpdateSizePosition(width: number, height: number, x: number, y: number, islock: boolean, islockshouldupdate: boolean) {
    // let lockstatus = 0
    // if (islockshouldupdate){
    //     if (!islock){
    //         lockstatus = 1
    //     } 
    // }
    // else{
    //     lockstatus = 0
    // }
    // console.log("lockstatus: ", lockstatus);

    // let response = GetSizePosition(props.id)
    // let execurl = `${BASE_URL}/api/DashboardIntegration/DIWidgetSizePosition/UpdateSizePosition`;
    // axios.get(`${execurl}?apikey=${props.uxpContext?.apiKey}&id=${props.id}&width=${width}&height=${height}&x=${x}&y=${y}&isLocked=${lockstatus}`)
    // .then(response => {
    //     let res= response.data;
    //     //toast.success("Successfully Updated !");
    //     //console.log(props.id, "Successfully Updated !");
    //     GetSizePosition(props.id)
    // })
    // .catch(e => {
    //     console.log("except: ", e);
    //     toast.error("Something went wrong");
    // })

    let lockstatus = false
    if (islockshouldupdate) {
      if (!islock) {
        lockstatus = true
      }
    }
    else {
      lockstatus = false
    }

    console.log("response.data: width:", width, 'height: ', height, 'x: ', x, 'y: ', y);

    props.onresize({ width, height, x, y, lockstatus })
  }

  // function GetSizePosition(id: string)
  // {
  //     let execurl = `${BASE_URL}/api/DashboardIntegration/DIWidgetSizePosition/GetSizePositionDetails`;
  //     axios.get(`${execurl}?apikey=${props.uxpContext?.apiKey}&id=${props.id}`)
  //     .then(response => {
  //         let res :any[] = response.data;
  //         if(res.length>0){
  //             //console.log("response.data: ", response.data);

  //             const convertedObject = {
  //                 width: parseInt(res[0].width, 10),
  //                 height: parseInt(res[0].height, 10),
  //                 x: parseInt(res[0].x, 10),
  //                 y: parseInt(res[0].y, 10),
  //               };

  //             // console.log(convertedObject);
  //             setPosition(convertedObject);

  //             let lock = res[0].isLocked
  //             //setIsLocked(lock);

  //             if (lock == 0)
  //             {
  //                 setIsLocked(false);
  //             }
  //             else{
  //                 setIsLocked(true);
  //             }     
  //         }
  //     })
  //     .catch(e => {
  //         console.log("except: ", e);
  //         toast.error("Something went wrong");
  //     })
  // }

  // Save position to localStorage whenever it changes
  const handlePositionChange = (e: any, d: any) => {
    const newPosition = { ...position, x: d.x, y: d.y };
    //console.log("WidgetnewPosition: ", newPosition);
    console.log(" width:", position.width + " height:", position.height + " x:", d.x + " y:", d.y);
    setPosition(newPosition);
    UpdateSizePosition(position.width, position.height, d.x, d.y, false, false)
    //localStorage.setItem(`widget-${props.id}`, JSON.stringify(newPosition));
  };

  const handleResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
    const newSize = {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    };
    //console.log("WidgetnewSize: ", newSize);
    console.log(" width:", parseInt(ref.style.width, 10) + " height:", parseInt(ref.style.height, 10) + " x:", position.x + " y:", position.y);
    setPosition(newSize);
    UpdateSizePosition(parseInt(ref.style.width, 10), parseInt(ref.style.height, 10), position.x, position.y, false, false)
    //localStorage.setItem(`widget-${props.id}`, JSON.stringify(newSize));
  };

  // Handle double-click to toggle lock/unlock
  const toggleLock = () => {
    setIsLocked(!isLocked);
    // console.log("isLockedisLocked: ", isLocked); 
    UpdateSizePosition(position.width, position.height, position.x, position.y, isLocked, true)
  };

  return (
    <Rnd
      bounds="parent"
      size={{ width: position.width, height: position.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={handlePositionChange}
      onResizeStop={handleResize}
      enableResizing={!isLocked}
      disableDragging={isLocked}
      className={`draggable-widget ${isLocked ? 'locked' : ''}`} // Add class dynamically
      onDoubleClick={toggleLock}
    >
      {props.children}
    </Rnd>

  );
};

export default DraggableWidget;
