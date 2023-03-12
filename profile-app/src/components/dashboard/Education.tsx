import React, { Fragment } from 'react';
import Moment from 'react-moment';
import TableGrid from '../../shared/modules/TableGrid/TableGrid';
import { TableCellAllProps } from '../../shared/modules/TableGrid/TableGrid.model';

interface ExperienceProps {
    education: any[];
    onDelete: (data: any) => void;
}
function Education(props: ExperienceProps) {
    let fields: TableCellAllProps[] = [
        {
          field: 'school',
          name: 'School',
          isSortable: true
        },
        {
          field: 'degree',
          name: 'Degree',
          isSortable: true
        },
        {
          field: 'year',
          name: 'Year',
          isCustomBodyCell: true
        },
        {
            field: 'action',
            name: '',
            isCustomBodyCell: true
        },
    ];

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <TableGrid fields={fields} data={props.education || []} pagination={false} customBodyCell={(row: any, property: string) => {
                return (
                    <Fragment>
                        {
                            property === 'year' && (
                            <span style={{ fontWeight: 'bold', color: '#555' }}>
                                <Moment format="YYYY/MM/DD">{row.from}</Moment> {' - '} { row.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{row.to}</Moment>)}
                            </span>
                            )
                        }
                        {
                            property === 'action' && (
                                <button className="btn btn-danger" onClick={(e) => {
                                    e.preventDefault();
                                    props.onDelete(row);
                                }}>Delete</button>
                            )
                        }
                    </Fragment>
                )
            }} />
        </Fragment>
    )
}

export default Education;
