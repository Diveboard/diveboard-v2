import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOptions } from './getChartOptions';
import { useWindowWidthNumber } from '../../hooks/useWindowWidthNumber';
import {SafetySpot} from "../PageBlocks/LogADiveBlocks/types/commonTypes";

React.useLayoutEffect = useEffect;

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  points: SafetySpot[];
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
      if (item.depth === undefined || item.period === undefined) {
        return { ...item, depth: 0, diveTime: 0 };
      }
      return item;
    });

    sortedData.sort((a, b) => a.period - b.period);

    sortedData.forEach((item) => {
      depth.push(item.depth);
      diveTime.push(item.period);
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
