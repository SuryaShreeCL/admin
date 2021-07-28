import React from 'react';
import ReactExport from 'react-data-export';
import Controls from '../../Utils/controls/Controls';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const JsonToExcel = ({ eventsData,eventTitle,disabled }) => {
  const Event = [
    {
      columns: [
        {
          title: 'Province State',
          width: { wpx: 125 },
        },
        {
          title: 'Country Region',
          width: { wch: 30 },
        },
        { title: 'Confirmed', width: { wpx: 100 } },
        { title: 'Deaths', width: { wpx: 125 } },
        { title: 'Recovered', width: { wpx: 100 } },
        { title: 'Active', width: { wpx: 125 } },
        {
          title: 'Incident Rate',

          width: { wch: 30 },
        },
        { title: 'Latitude', width: { wpx: 125 } },
        { title: 'Longitude', width: { wpx: 125 } },
        {
          title: 'Last Update',

          width: { wpx: 110 },
        },
      ],
      data: eventsData.map((data) => [
        { value: data.provinceState },
        { value: data.countryRegion },
        { value: data.confirmed },
        {
          value: data.deaths,
        },
        {
          value: data.recovered,
        },
        {
          value: data.active,
        },
        {
          value: data.incidentRate,
        },
        {
          value: data.lat,
        },
        {
          value: data.long,
        },
        {
          value: data.lastUpdate,
        },
      ]),
    },
  ];
  return (
    <>
      <ExcelFile
        filename={eventTitle}
        element={
          <Controls.ActionButton disabled>
            <CloudDownloadIcon fontSize='small' style={{ color: `${!disabled && 'green' }`}} />
          </Controls.ActionButton>
        }
      >
        <ExcelSheet dataSet={Event} name={eventTitle} />
      </ExcelFile>
    </>
  );
};

export default JsonToExcel;
