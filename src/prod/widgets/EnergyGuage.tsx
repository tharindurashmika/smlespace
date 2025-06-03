import React from "react";
import styled from "styled-components";
// import GaugeChart from "react-gauge-chart";
import "./EnergyGuage.scss";
import * as Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import solidGauge from "highcharts/modules/solid-gauge";
// import titleicon from '../../images/lightning-blue.png'
// import titleicon from '../../images/lightning-blue.png'
import './widgetbackground.scss'
import { IContextProvider } from "../../uxp";


HighchartsMore(Highcharts);
solidGauge(Highcharts);

interface WidgetProps {
  title: string;
  value: number; // The gauge value (e.g., 304)
  unit: string; // Unit of measurement (e.g., kWh/m2/yr)
  maxvalue: number;
  uxpContext?: IContextProvider;
  ViewMode?: string;
  instanceId?: string,
  isLeveledUp: boolean
}

const Widget: React.FC<WidgetProps> = (props) => {
  //const gaugePercent = Math.min(Math.max(value / maxvalue, 0), 1);
  const chartOptions = (value: number, label: string, color: string) => ({
    chart: {
      type: "solidgauge",
      backgroundColor: "transparent",
      height: "100%",
      //spacing: [0, 0, 0, 0],
      margin: [0, 0, 30, 0],
    },
    title: {
      text: label, // Your title text
      align: "center", // Aligns the title at the center
      verticalAlign: "bottom", // Places the title at the top
      style: {
        fontSize: "10px", // Customize font size
        color: "#ffffff", // Customize color
      },

      //margin: 20, // Space between title and the chart
    },
    // pane: {
    //   startAngle: 0,
    //   endAngle: 360,
    //   background: {
    //     backgroundColor: "#e6e6e6",
    //     innerRadius: "85%",
    //     outerRadius: "100%",
    //     shape: "arc",
    //   },
    // },
    pane: {
      startAngle: -180,
      endAngle: 180,
      background: [
        {
          // Thin white line (background)
          outerRadius: '98%', // Slightly larger to center within value line
          innerRadius: '95%', // Adjust thickness
          backgroundColor: '#ffffff', // White line
          borderWidth: 0,
        },
      ],
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 2000, // Max value for the chart
      stops: [[1, color]], // Gradient color
      lineWidth: 0,
      tickWidth: 0,
      minorTickWidth: 0,
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          borderWidth: 0, // Hides the border
          style: {
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ffffff", // Adjust color as needed
          },
          verticalAlign: "middle", // Center vertically
          y: 0, // Fine-tune vertical alignment
          format: `<div style="text-align:center">
            <span style="font-size:24px;color:${color};line-height:1;">${value}</span><br/>
            <span style="font-size:12px;color:white;">kWh/m²/yr</span>
          </div>`,
        },

      },
    },
    series: [
      {
        name: label,
        data: [value],
        innerRadius: '88%', // Matches the white line's inner radius
        radius: '102%', // Matches the white line's outer radius
        dataLabels: {
          format: `<div style="text-align:center">
                <span style="font-size:18px;color:${color}">${value}</span><br/>
                <span style="font-size:8px;color:white">kWh/m²/yr</span>
              </div>`,
        },
      },
    ],
    credits: {
      enabled: false,
    },
  });

  const widgetRef = React.useRef<HTMLDivElement>(null);
  const [gaugeSize, setGaugeSize] = React.useState("80%");

  const adjustFontSize = (width: number) => {
    if (widgetRef.current) {
      //         const widgetWidth = widgetRef.current.offsetWidth;

      //         // Calculate font sizes based on widget width
      //         document.documentElement.style.setProperty('--widget-title-size', `${widgetWidth * 0.6}px`);
      // console.log("widgetWidth"+widgetWidth * 0.6);
      const widgetWidth = widgetRef.current.offsetWidth;

      // Set 80% of the widget's width for gauge size
      const gaugeSize = widgetWidth * 0.8; // 80% of the widget width
      document.documentElement.style.setProperty(
        "--circular-gauge-size",
        `${gaugeSize}px`
      );
      //console.log("Updated Gauge Widget:", widgetWidth);
      //console.log("Updated Gauge Size:", gaugeSize);

      const newGaugeSize = `${widgetWidth * 0.8}px`; // 80% of width
      setGaugeSize(newGaugeSize); // Update state to trigger re-render
    }
  };

  React.useEffect(() => {
    const currentWidget = widgetRef.current;

    if (currentWidget) {
      // Initialize ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect) {
            adjustFontSize(entry.contentRect.width); // Pass the updated width
          }
        }
      });

      resizeObserver.observe(currentWidget);

      // Cleanup observer on component unmount
      return () => resizeObserver.unobserve(currentWidget);
    }
  }, []);

  return (
    <div className="en-widget-container bcolor-widget" ref={widgetRef} style={{ backgroundColor: "#00000052" }}>
      <div ref={widgetRef}>
        <span className="header-title">
          {/* <img className="bolt-icon" src={titleicon} alt="" /> {title} */}
          <span className="bolt-icon">⚡</span> {props.title}
        </span>
        <hr
          style={{
            width: "100%",
            borderColor: "#424242",
            borderStyle: "solid",
          }}
        />
      </div>

      <div >
        <div>

          <div className="circular-gauge-container">
            <div
              className="circular-gauge"
              style={{
                width: gaugeSize,
                height: gaugeSize,
              }}
            >
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions(props.isLeveledUp ? 900 : 1200, "Current", "#715aff")}
              />
            </div>
            <div className="circular-gauge">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions(props.isLeveledUp ? 1600 : 1800, "Prediction", "#5ec0ff")}
              />
            </div>
          </div>
          <div
            onClick={() => {
              window.open('https://smartfm.iviva.cloud/Apps/UXP/portal/building-energy-performance', '_blank')
            }}
            style={{ textDecoration: 'underline', color: 'white', cursor: 'pointer', position: 'absolute', top: '175px', right: '10px' }}
          >Building Energy Performance</div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
