import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOptions } from './getChartOptions';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  points: {
    depth: number,
    diveTime: number,
    temperature: number,
  }[]

};

export const DepthChart: FC<Props> = ({ points }): JSX.Element => {
  const [data, setData] = useState([]);
  const [diveTimeData, setDiveTimeData] = useState([]);

  useEffect(() => {
    const depth = [];
    const diveTime = [];
    const sortedData = [...points];

    sortedData.sort((a, b) => a.diveTime - b.diveTime);

    sortedData.forEach((item) => {
      depth.push(item.depth);
      diveTime.push(item.diveTime);
    });
    setDiveTimeData(diveTime);
    setData([{
      name: 'depth',
      type: 'area',
      data: depth,
    }]);
  }, [points]);

  return (
    <ReactApexChart
      options={getOptions(diveTimeData)}
      series={data}
      type="area"
      height={423}
      width={869}
    />
  );
};
