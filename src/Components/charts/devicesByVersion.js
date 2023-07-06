import React, { useEffect, useState } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Label,
} from 'recharts';


const DevicesByVersion = ({data}) => {

    const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

 if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }


const CustomTooltip = ({ active, payload, label }) => {
  const tooltipStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  return (
    active && payload && payload.length ? (
      <div className="custom-tooltip" style={tooltipStyle}>
        <p className="tooltip-label" style={labelStyle}>{`Version: ${label}`}</p>
        <p className="tooltip-value">{`Devices: ${payload[0].value}`}</p>
      </div>
    ) : null
  );
};

  return (
       <ResponsiveContainer width={'99%'} height={300}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="version">
          <Label value="Version" offset={-2} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="Devices" offset={-21} position="insideLeft" />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Bar dataKey="devices" fill="#0E6186" />
      </BarChart>
    </ResponsiveContainer>

  );
};


export default DevicesByVersion;
