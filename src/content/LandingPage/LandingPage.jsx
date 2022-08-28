// import React, { useEffect, useState } from 'react';
// import { Loading } from '@carbon/react';

// const LandingPage = () => {

//     const [customers, setCustomer] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);

//         fetch('http://localhost:8080/feedback/v1/customer/get-all')
//             .then(response => response.json())
//             .then(data => {
//                 setCustomer(data);
//                 setLoading(false);
//             })
//     }, []);

//     if (loading) {
//         return <Loading />;
//     }

//     return (
//         <div>
//             <h1>Landing page</h1>
//             <h2>Customer feedback details</h2>
//         </div>
//     );
// };

// export default LandingPage;
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '@carbon/react';
import axios from 'axios';
import headers from './headers';

const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell
} = DataTable;

export default function ProjectDataTable() {

    const [customers, setCustomers] = useState([]);

    const tableRows = useMemo(() =>
        customers?.map((customer) => {
            return {
                name: customer.name,
                email: customer.emailAddress,
                feedback: customer.customerFeedback
            };
        }),
        [customers],
    );

    useEffect(() => {
        axios.get("http://localhost:8080/feedback/v1/customer/get-all")
            .then(response => {
                console.log('Printing projects data', response.data);
                setCustomers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }, []);

    return (
        <div>
            <TableContainer
                title="Customer Feedback Details"
                description="Showing customer feedback details"
            >
                <DataTable rows={tableRows} headers={headers} isSortable={true} size="short">
                    {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableHeader {...getHeaderProps({ header, isSortable: header.isSortable, })}>
                                            {header.header?.content ?? header.header}
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow {...getRowProps({ row })}>
                                        {row.cells.map((cell) => (
                                            <TableCell key={cell.id}>{cell.value?.content ?? cell.value}</TableCell>))}
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                    )}
                </DataTable>
            </TableContainer>
        </div>
    );
}