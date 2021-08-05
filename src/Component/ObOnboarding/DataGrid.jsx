import React from "react";
import { DataGrid as DataTable, GridColDef } from "@material-ui/data-grid";

const Table = ({ data ,obCallStatus ,action }) => {
  const col = [
    {
      field: "id",
      headerName: "id",
      width: 200,
      hide:true,
    },
    {
      field: "clsId",
      headerName: "CLS ID",
      width: 200,
    },
    {
      field: "fullName",
      headerName: "Client Name",
      width: 200,
      renderCell:(params)=>{          
          return <h6>{params.row.firstName + " " + params.row.lastName}</h6> 
      }
    },
    {
      field: "emailId",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "obCallStatus",
      headerName: "OB Call Status",
      width: 200,
      renderCell:(params)=>obCallStatus(params.row)
    },
    {
      field: "percentage",
      headerName: "Stage Completion",
      width: 200,
      renderCell:(params)=>`${params.row.percentage}%`
    },
    {
      field: "",
      headerName: "Action",
      width: 300,
      renderCell:(params)=>action(params.row)
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
        <DataTable
      columns={col}
      rows={data.map((item, i) => {
        return {
          ...item,
          id: i,
        };
      })}
    />
    </div>
  );
};

export default Table;

/*
activatedBy: "sales"
allocatedAt: null
allocatedBy: null
amountPaid: null
clsId: "IOD898"
college: "Aditya Institute of Technology and Management"
degree: null
department: "Economics"
emailId: "test@user.in"
firstName: "test"
fullName: null
lastName: "user"
obCallStatus: null
orderDate: "2021-07-21T08:44:46.660+0000"
paymentId: "jcxjjk-3nkj3- nmfnfkjr"
paymentProvider: "JKDKJD290"
percentage: 3
phoneNumber: "3838478578"
products:
banner: "https://profilebuilder21.s3.ap-south-1.amazonaws.com/acs/dashboard/acs_banner.svg"
codeName: "ACS_MS"
costPrice: 3000
courseOpted: null
createdBy: null
dateOfCreation: null
dateOfUpdate: "2021-07-09T06:57:06.246+0000"
endOfEnrollmentDate: null
endOfServiceDate: "2021-07-05T00:00:00.000+0000"
googleDriveLink: null
id: "fd08541f-d7e8-4497-8fbc-ae5128e16315"
image: null
intake: "Spring 2021"
link: null
name: "Admissions Consulting Services Masters"
opsEmailId: "atharva@thecareerlabs.com"
productDescription: "<p>ACS fro Masters description</p>"
productFamily: {id: "2", productName: "Admissions Consulting Services", shortName: "ACS", codeName: "ACS", createdBy: null, …}
productImages: []
productOneliner: "<p>ACS for Masters</p>"
productQuestionAnswers: [{…}]
productTnc: "<p>TNC for ACS Masters</p>"
productVideos: []
sellingPrice: 5000
shortName: "ACS MS"
standaloneSellable: null
text: null
updatedBy: "SUPER ADMIN"
validity: "365"
variantFamilySKU: null
variantSKU: "ACS_MS"
wkStatus: "Live"
year: "2021"
__proto__: Object
punchedBy: "sales"
stage: "Onboarding"
studentId: "54bc1a44-aaef
*/
