import { ApexOptions } from 'apexcharts';

export const getOptions = (diveTime: number[]): ApexOptions => ({
  chart: {
    toolbar: {
      show: false,
    },
    background: '#CEEAFF',
    zoom: {
      enabled: false,
    },
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
      gradientToColors: ['#3481F4'],
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
    categories: diveTime,
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
    x: {
      show: true,
    },
    marker: {
      show: false,
    },
    custom({
      series,
      seriesIndex,
      dataPointIndex,
      w,
    }) {
      return (
        '<div class="apexcharts__tooltip_custom">'
        + '<div class="apexcharts__tooltip_custom_depth">'
        + `<span>${series[seriesIndex][dataPointIndex]} m</span>`
        + '</div>'
        + '<div class="apexcharts__tooltip_custom_divetime">'
        + `<span>${w.globals.categoryLabels[dataPointIndex]} min</span>`
        + '</div>'
        + '</div>'
      );
    },
  },
});
