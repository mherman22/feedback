import React, { useEffect, useMemo, useState } from 'react';
import { DataTable, Loading, DataTableSkeleton } from '@carbon/react';
import axios from 'axios';
import headers from './headers';
import styles from './_landing-page.scss';

const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell
} = DataTable;

export default function LandingPage() {

    const [customers, setCustomers] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    const tableRows = useMemo(() =>
        customers?.map((customer) => {
            return {
                id: customer.id,
                name: customer.name,
                email: customer.emailAddress,
                feedback: customer.customerFeedback
            };
        }),
        [customers],
    );

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:8080/feedback/v1/customer/get-all")
            .then(response => {
                console.log('Printing data', response.data);
                setCustomers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }, []);

    if (isloading) {
        return <DataTableSkeleton className={styles.dataTableSkeleton} role="progressbar" rowCount={3} columnCount={3} zebra />;
    }

    return (
        <div>
            <TableContainer
                title="Customer Feedback Details"
                description="Showing customer feedback details"
            >
                <DataTable rows={tableRows} headers={headers} isSortable={true} size="sm">
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