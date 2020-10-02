import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default class MaterialTableDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Interest', field: 'interest', type: 'numeric' },
                {
                    title: 'Verbal Score',
                    field: 'verbalScore',
                    type: 'numeric', cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Quant Score',
                    field: 'quantScore',
                    type: 'numeric', cellStyle: { textAlign: 'center' }
                },
                {
                    title: 'Logical Score',
                    field: 'logicalScore',
                    type: 'numeric', cellStyle: { textAlign: 'center' }
                }, {
                    title: 'Tech Score',
                    field: 'techScore',
                    type: 'numeric', cellStyle: { textAlign: 'center' }
                },
            ],
            data: [
                { firstName: 'Mehmet', lastName: 'Baran', interest: 'sample', verbalScore: 10, quantScore: 10, logicalScore: 10, techScore: 10 },
                { firstName: 'Sai', lastName: 'Deepak', interest: 'sample', verbalScore: 10, quantScore: 10, logicalScore: 10, techScore: 10 },
            ],

        };

    }

    rowClick = (ev) => {
        this.props.history.push("/path");
    }

    componentDidMount() {
        document.title = "basket";
        axios.get("/api/v1/users", {
            crossDomain: true
        })
            .then(res => res.data)
            .then((result) => {
                console.log(result)
                this.setState({
                    data: result
                })
            })
    }


    render() {

        return (
            <MaterialTable
                onRowClick={this.rowClick}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} row(s) selected'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    body: {
                        emptyDataSourceMessage: 'No records to display',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
                title=""
                columns={this.state.columns}
                data={this.state.data}
                options={{
                    headerStyle: {
                        backgroundColor: '#009be5',
                        color: '#FFF',
                        paddingRight: '16px'
                    },
                    pageSize: 20,
                    actionsColumnIndex: -1
                }}
                editable={{
                    isDeleteHidden: rowData => true,
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
        );
    }
}
