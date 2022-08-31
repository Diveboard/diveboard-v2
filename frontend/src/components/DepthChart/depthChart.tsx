import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOptions } from './getChartOptions';
import { useWindowWidthNumber } from '../../hooks/useWindowWidthNumber';

React.useLayoutEffect = useEffect;

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  points: {
    depth: number;
    diveTime: number;
    temperature: number;
  }[];
};

export const DepthChart: FC<Props> = ({ points }): JSX.Element => {
  const [data, setData] = useState([]);
  const [diveTimeData, setDiveTimeData] = useState([]);
  const width = useWindowWidthNumber(100);

  useEffect(() => {
    const depth = [];
    const diveTime = [];
    let sortedData = [...points];

    sortedData = sortedData.map((item) => {
      if (item.depth === undefined || item.diveTime === undefined) {
        return { ...item, depth: 0, diveTime: 0 };
      }
      return item;
    });

    sortedData.sort((a, b) => a.diveTime - b.diveTime);

    sortedData.forEach((item) => {
      depth.push(item.depth);
      diveTime.push(item.diveTime);
    });
    setDiveTimeData(diveTime);
    setData([
      {
        name: 'depth',
        type: 'area',
        data: depth,
      },
    ]);
  }, [points]);

  return (
    <ReactApexChart
      options={getOptions(diveTimeData)}
      series={data}
      type="area"
      height={width >= 890 ? 423 : width / 2.1}
    />
  );
};
