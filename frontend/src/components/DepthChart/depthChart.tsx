import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOptions } from './getChartOptions';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DUMMY_DATA = [
  {
    depth: 2.74,
    divetime: 30,
    temperature: 287.2,
  },
  {
    depth: 10.74,
    divetime: 70,
    temperature: 245.4,
  },
  {
    depth: 12.74,
    divetime: 10,
    temperature: 217.8,
  },
  {
    depth: 120.74,
    divetime: 50,
    temperature: 285.7,
  },
  {
    depth: 8.74,
    divetime: 18,
    temperature: 299.0,
  },
  {
    depth: 45.74,
    divetime: 7,
    temperature: 310.5,
  },
  {
    depth: 3.74,
    divetime: 28,
    temperature: 210.9,
  },
  {
    depth: 0,
    divetime: 49,
    temperature: 210.9,
  },
  {
    depth: 14.74,
    divetime: 37,
    temperature: 210.9,
  },
];

const DepthChart: FC = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [divetimeData, setdivetimeData] = useState([]);

  useEffect(() => {
    const depth = [];
    const divetime = [];
    let sortedData = [];

    sortedData = [...DUMMY_DATA];

    sortedData.sort((a, b) => a.divetime - b.divetime);

    sortedData.forEach((item) => {
      depth.push(item.depth);
      divetime.push(item.divetime);
    });
    setdivetimeData(divetime);
    setData([{ name: 'depth', type: 'area', data: depth }]);
  }, []);

  return (
    <ReactApexChart
      options={getOptions(divetimeData)}
      series={data}
      type="area"
      height={423}
      width={869}
    />
  );
};

export default DepthChart;
