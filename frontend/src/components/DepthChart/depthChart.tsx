import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getOptions } from './getChartOptions';
import { useWindowWidthNumber } from '../../hooks/useWindowWidthNumber';
import { SafetySpot } from '../PageBlocks/LogADiveBlocks/types/commonTypes';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type Props = {
  points: SafetySpot[];
  profileData: Array<{ seconds: number, depth: number }>;
  maxDepth: number;
  duration: number;
};

export const DepthChart: FC<Props> = ({
  points, maxDepth, duration, profileData,
}): JSX.Element => {
  const [data, setData] = useState([]);
  const [diveTimeData, setDiveTimeData] = useState([]);
  const width = useWindowWidthNumber(100);

  useEffect(() => {
    let depth = [];
    if (profileData?.length) {
      setDiveTimeData(profileData.map((item) => item.seconds / 60));
      depth = profileData.map((item) => item.depth);
    } else if (maxDepth > 0 && duration > 0) {
      depth = [0, maxDepth, maxDepth];
      let sortedData = points ? [...points] : [];
      sortedData = sortedData
        .filter((item) => item.depth !== undefined && item.period !== undefined);
      const safetyStopsTime = sortedData.reduce((acc, i) => acc + i.period, 0);
      const period = [0, 1, safetyStopsTime ? duration - safetyStopsTime : duration];
      sortedData = sortedData.sort((a, b) => b.depth - a.depth);
      sortedData.forEach((item) => {
        depth.push(item.depth);
        depth.push(item.depth);
        period.push(period[period.length - 1]);
        period.push(period[period.length - 1] + item.period);
      });
      depth.push(0);
      period.push(duration);
      setDiveTimeData(period);
    }
    setData([
      {
        name: 'depth',
        type: 'area',
        data: depth,
      },
    ]);
  }, [points, maxDepth, duration, profileData]);

  return (
    <ReactApexChart
      options={getOptions(diveTimeData)}
      series={data}
      type="area"
      height={width >= 890 ? 423 : width / 2.1}
    />
  );
};
