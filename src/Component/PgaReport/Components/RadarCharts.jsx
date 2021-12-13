import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ graphData }) => {
  return (
    graphData && (
      <Radar
        id={'spider_graph'}
        data={RadarData(graphData)}
        options={RadarOptions}
      />
    )
  );
};

export default RadarChart;

const RadarData = ({
  currentProfileScore,
  idealProfileScore,
  postServiceProfileScore,
}) => ({
  labels: [
    'Ideal Profile',
    'Practical Experience',
    'Domain Fit',
    'Competence',
    'Impact and Interpersonal Skills',
  ].map(label => longToShortLabel(label)),
  datasets: [
    {
      label: 'Ideal Profile',
      backgroundColor: 'rgba(63, 166, 252, .3)',
      borderColor: '#3FA6FC',
      pointBackgroundColor: 'rgba(63, 166, 252, .5)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#3FA6FC',
      data: idealProfileScore,
    },
    {
      label: 'After Profile Building',
      backgroundColor: 'rgba(225, 49, 49, .3)',
      borderColor: '#E13131',
      pointBackgroundColor: 'rgba(225, 49, 49, .5)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#E13131',
      data: postServiceProfileScore,
    },
    {
      label: 'Current Profile',
      backgroundColor: 'rgba(122, 162, 105, .3)',
      borderColor: '#7AA269',
      pointBackgroundColor: 'rgba(122, 162, 105, .5)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#7AA269',
      data: currentProfileScore,
    },
  ],
});

const longToShortLabel = label => label;

const RadarOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scale: {
    beginAtZero: true,
    ticks: {
      min: 0,
      max: 10,
      stepSize: 2,
    },
    angleLines: {
      color: 'rgba(255, 255, 255, .5)',
      lineWidth: 2,
    },
    gridLines: {
      color: 'rgba(255, 255, 255, .5)',
      circular: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 15,
        boxHeight: 15,
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 30,
        color: '#333333',
        font: {
          size: 14,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 3,
    },
    line: {
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      pointLabels: {
        padding: 15,
        color: '#333333',
        font: {
          size: 12,
        },
      },
    },
  },
};
