import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { Order, TableCellAllProps, TableProps } from './TableGrid.model';
// import { visuallyHidden } from '@mui/utils';
// import Box from '@mui/material/Box';

function TableGrid(props: TableProps) {
    let defaults = {
        pages: [1, 2, 4, 10]
    };

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('');
    const [page, setPage] = React.useState(0);
    const [pages, setPages] = useState<number[]>(defaults.pages);
    const [rowsPerPage, setRowsPerPage] = React.useState(pages[0]);
    const [data, setData] = useState<any[]>(props.data);
    const [isPagination, setPagination] = useState<boolean>();

    const fields = props.fields;

    useEffect(() => {
        setPage(props.item || 0);
    }, [props.item]);

    useEffect(() => {
        setPages(props.pagesPerPage || defaults.pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pagesPerPage]);

    useEffect(() => {
        setRowsPerPage(props.rowsPerPage || pages[0]);
    }, [props.rowsPerPage, pages]);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    useEffect(() => {
        setPagination((('pagination' in props) && typeof props.pagination === 'boolean') ? props.pagination : true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pagination]);

    const createSortHandler = (property: string, isSortable: boolean | undefined) => (event: React.MouseEvent<unknown>) => {
        event.preventDefault();
        if (isSortable) {
            handleRequestSort(event, property);
        }
    };

    const handleRequestSort = ( event: React.MouseEvent<unknown>, property: string ) => {
        const isAsc = orderBy === property && order === 'asc';
        let sortedDirection: any = isAsc ? 'desc' : 'asc';
        setOrder(sortedDirection);
        setOrderBy(property);
        setPage(0);
        props.onSetPage && props.onSetPage({page: 0, rowsPerPage, sortDirection: sortedDirection, sortBy: property});
    };

    const onSortData = (data: any[], order: Order, orderBy: string): any[] => {
        let sortedData: any[] = [];
        const d = [...data];
        sortedData = d.sort((first: any, second: any) => {
            let x = 1;
            let y = -1;
            if (order === 'asc') {
                x = 1;
                y = -1;
            } else {
                x = -1;
                y = 1;
            }
            if (first[orderBy] > second[orderBy]) {
                return x;
            } else if (first[orderBy] < second[orderBy]) {
                return y;
            } else {
                return 0;
            }
        });
        return sortedData;
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        props.onSetPage && props.onSetPage({page: newPage, rowsPerPage, sortDirection: order, sortBy: orderBy});
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        props.onSetPage && props.onSetPage({page: 0, rowsPerPage, sortDirection: order, sortBy: orderBy});
    };

    const onPaginationChange = (e: any, value: any) => {
        let v = value-1;
        setPage(v);
        props.onSetPage && props.onSetPage({page: v, rowsPerPage, sortDirection: order, sortBy: orderBy});
    }

    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{background: '#eee'}}>
                    <TableRow>
                        {
                            fields.map((field: TableCellAllProps, ind: number) => (
                                <TableCell key={(field.name + '' + 1 + ind)} align={field.cellProps && field.cellProps.align} component={'th'} size={field.cellProps && field.cellProps.size } sx={field.cellProps && field.cellProps.sx}>
                                    {
                                        field.isSortable ? (
                                            <TableSortLabel
                                                active={orderBy === field.field}
                                                onClick={createSortHandler(field.field, field.isSortable)}
                                                direction={orderBy === field.field ? order : 'asc'}
                                                >
                                                {field.name}
                                            </TableSortLabel>
                                        ) : (field.name)
                                    }
                                    
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={Object.keys(fields).length} sx={{ color: '#555', fontWeight: 'bold'}}>No Data Found</TableCell>
                            </TableRow>
                        ) : (
                            (isPagination && (page >= 0 && pages.length > 0) ? (onSortData(data, order, orderBy).slice(page! * rowsPerPage, page! * rowsPerPage + rowsPerPage)) : (onSortData(data, order, orderBy))).map((row: any, ind) => (
                                <TableRow key={(ind + ' field ' + ind + 1)}>
                                    {
                                        fields.map((field: TableCellAllProps, ind: number) => (
                                            <TableCell key={(row[field.field] + '' + ind)} align={field.cellProps && field.cellProps.align} component={field.cellProps && field.cellProps.component} size={field.cellProps && field.cellProps.size} sx={field.cellProps && field.cellProps.sx}  >
                                                {
                                                    field.isCustomBodyCell ? (
                                                        <Fragment>
                                                            {props.customBodyCell && props.customBodyCell(row, field.field)}
                                                        </Fragment>
                                                    ) : row[field.field]
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                        )
                    }
                    
                </TableBody>
                </Table>
            </TableContainer>
            {
                isPagination && page >= 0 && pages!.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={pages}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )
            }
            {
                isPagination && page >= 0 && pages!.length > 0 && (
                    <div className="pagination">
                        <Pagination sx={{display: 'flex', justifyContent: 'end'}} count={Math.ceil(data.length/rowsPerPage)} page={page+1} onChange={onPaginationChange} color="primary" showFirstButton showLastButton />
                    </div>
                )
            }
            <p className="my-1"></p>
            <span>Page = {page+1}</span>
            <p></p>
            <span>{rowsPerPage} = per Page</span>
            <p></p>
            <span>Sort Direction = {order}</span>
            <p></p>
            <span>Sort By = {orderBy}</span>
        </Fragment>
    )
}

export default TableGrid;
