import { memo } from 'react';
import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, enableLocalization, registerCustomWidgetTemplate, } from '../uxp';
import { TitleBar, FilterPanel, WidgetWrapper } from "uxp/components";
import { IWDDesignModeProps } from "widget-designer/components";
import { loadSmplrJs, Smplr } from '@smplrspace/smplr-loader';
import { Space } from '@smplrspace/smplr-loader/dist/generated/smplr';
import {  Sensor, sensors, Stall, stalls } from './smplr-data';

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
    designer?: IWDDesignModeProps,
    uiProps?: any
}

const SmplrspaceProject: React.FunctionComponent<IWidgetProps> = (props) => {

    const spaceRef = React.useRef<Space>();
    const [viewerReady, setViewerReady] = React.useState(false)
    const [previousLevels, setPreviousLevels] = React.useState<number[]>([]);
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
            color: (d) =>'#ff3f34',
            alpha: 0.7,
            height: 1.9,
            onClick: d => {
                console.log(d);
                if (spaceRef.current) {
                    if(d.levelIndex!= undefined){
                        let levelIndex = d.levelIndex;
                        
                        spaceRef.current.includeLevels([levelIndex]);
                        //spaceRef.current.zoomIn();

                        // spaceRef.current.setCameraPlacement({
                        //     target: { x: 80, y: 0, z: 10 }, // Keep the building centered
                        //     radius: 50,  // Adjust distance (higher = farther)
                        //     animate: true,
                        //     //animationDuration: 1000 // Smooth transition
                        // });
                    }
                }
            }
        });

        spaceRef.current.addDataLayer<Sensor>({
            id: 'sensors',
            type: 'icon',
            data: sensors,
            //tooltip: (d) => `Sensor ${d.id}`,
            icon: {
              url: 'https://smartfm.iviva.cloud/Resources/C2ODemo/alarm.png',
              width: 500,
              height: 500,
            },
            width: 2,
        });

        
        
        return () => {
            spaceRef.current.removeDataLayer('stalls');
        };
    }, [viewerReady]);


    
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
            </div>

            <div style={{position:"absolute",left:"10px",top:"10px",width:"35px",height:"35px",backgroundColor:"red"}}
                onClick={() => {
                    
                }}
            >
            </div>
        </WidgetWrapper>
    )
};
export default SmplrspaceProject;