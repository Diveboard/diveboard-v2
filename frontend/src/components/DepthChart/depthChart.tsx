/** @format */

import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
    divetime: 1,
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
  const [options, setOptions] = useState({});

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

    setData([{ name: 'depth', type: 'area', data: depth }]);
    setOptions({
      // responsive: [
      //   {
      //     breakpoint: 880,
      //     options: {
      //       // new options for 880px
      //       chart: {
      //         width: 650,
      //       },
      //     },
      //   },
      // ],
      chart: {
        toolbar: {
          show: false,
        },
        background: '#CEEAFF',
      },
      stroke: {
        curve: 'smooth', // smoother lines
        width: [3], // line thickness
        colors: ['#0059DE'],
      },
      markers: {
        colors: '#3FFFFF',
        strokeColors: 'rgba(63, 255, 255, 0.6)',
        strokeWidth: 10,
        strokeOpacity: 0.7,
        fillOpacity: 1,
      },

      fill: {
        // area background
        type: 'gradient',
        gradient: {
          type: 'vertical',
          colorFrom: '#E9F4FF',
          colorTo: '#f50509',
          stops: [0, 100],
          opacityFrom: 0,
          opacityTo: 1,
        },
      },
      dataLabels: {
        // signature data on the graph
        enabled: false,
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: divetime,
        show: false,
        tooltip: {
          // signature when hovering
          enabled: false,
        },
        labels: { show: false },
        crosshairs: {
          // vertikal line when hovering
          show: false,
        },
      },
      yaxis: {
        show: false,
        reversed: true,
        crosshairs: {
          show: false,
        },
      },
      tooltip: {
        followCursor: false,
        show: true,
        x: {
          show: true,
        },
        marker: {
          show: false,
        },
        custom({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="apexcharts__tooltip_custom">' +
            '<div class="apexcharts__tooltip_custom_depth">' +
            `<span>${series[seriesIndex][dataPointIndex]} m</span>` +
            '</div>' +
            '<div class="apexcharts__tooltip_custom_divetime">' +
            `<span>${w.globals.categoryLabels[dataPointIndex]} min</span>` +
            '</div>' +
            '</div>'
          );
        },
      },
    });
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={data}
      type="area"
      height={423}
      width={869}
    />
  );
};

export default DepthChart;
