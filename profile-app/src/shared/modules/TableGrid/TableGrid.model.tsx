import { Theme } from "@emotion/react";
import { SxProps, TableCellBaseProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface TableCellEachProps {
    align?: 'left' | 'right' | 'justify' | 'inherit' | 'center';
    children?: any;
    component?: ElementType<TableCellBaseProps> | undefined;
    padding?: 'checkbox' | 'none' | 'normal';
    scope?: string;
    size?: 'small' | 'medium' ;
    sortDirection?: 'asc' | 'desc' | false;
    sx?: SxProps<Theme> | undefined;
    variant?: 'body' | 'head' | 'footer' | string;
}

export interface TableCellAllProps {
    field: string;
    name: string;
    isSortable?: boolean;
    isCustomHeaderCell?: boolean;
    isCustomBodyCell?: boolean;
    customStyle?: React.StyleHTMLAttributes<any>;
    customHTML?: React.Component | null;
    cellProps?: TableCellEachProps;
}


export type Order = 'asc' | 'desc';

export interface TableGridProps {
    fields: TableCellAllProps[];
    data: any[];
    item?: number;
    pagesPerPage?: number[];
    rowsPerPage?: number;
    pagination?: boolean;
    onSetPage?: (event: { page: number, rowsPerPage: number, sortDirection: Order, sortBy: string }) => void;
    customBodyCell?: (singleData: any, property: string) => ReactNode;
}

export type TableProps = React.PropsWithChildren & TableGridProps;


// const defaults: TableCellEachProps = {
//     align: 'left',
//     children: <span></span>,
//     component: 'span',
//     padding: 'normal',
//     scope: '',
//     size: 'small',
//     sortDirection: false,
//     sx: {},
//     variant: 'head',
// }
// export const FinalTableCell = defaults;
