import React, { Fragment, useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './Pages.css';
import { TableCellAllProps } from '../../../shared/modules/TableGrid/TableGrid.model';
import TableGrid from '../../../shared/modules/TableGrid/TableGrid';
import FormElements from '../../../shared/components/FormElements';
import TabsComponent from '../../../shared/modules/Tabs/TabsComponent';
import { TabComponentProps } from '../../../shared/modules/Tabs/TabsProps';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function About() {
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Salad', 589, 22.0, 63, 8.9),
    createData('Fruit Salad', 621, 13.2, 58, 1.2),
    createData('Butter', 971, 8.0, 23, 6.9),
    createData('Milk', 231, 66.5, 62, 2.8),
    createData('Milk', 232, 55.5, 45, 4.8)
  ];

  const tabsData: TabComponentProps[] = [
    {
      label: 'Tab 1',
      value: '/pages/about'
    },
    {
      label: 'Tab 2',
      value: '/pages/about/second'
    }
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const [ page, setPage ] = useState(0);
  const [filtered, setFiltered] = useState(rows);
  // const [formData, setFormData] = useState('');

  const [activeTabIndex, setActiveTabIndex] = useState(location.pathname);

  useEffect(() => {
    setActiveTabIndex(location.pathname);
    return () => {
      setActiveTabIndex('');
    }
  }, [location.pathname]);

  let fields: TableCellAllProps[] = [
    {
      field: 'name',
      name: 'Dessert (100g serving)',
      isSortable: true,
      isCustomHeaderCell: false,
      isCustomBodyCell: false,
      customStyle: {},
      customHTML: null,
      cellProps: {}
    },
    {
      field: 'calories',
      name: 'Calories',
      isSortable: true,
      isCustomHeaderCell: false,
      isCustomBodyCell: true,
      customStyle: {},
      customHTML: null,
      cellProps: {}
    },
    {
      field: 'fat',
      name: 'Fat',
      isSortable: false,
      isCustomHeaderCell: false,
      isCustomBodyCell: true,
      customStyle: {},
      customHTML: null,
      cellProps: {}
    },
    {
      field: 'carbs',
      name: 'Carbs',
      isSortable: false,
      isCustomHeaderCell: false,
      isCustomBodyCell: false,
      customStyle: {},
      customHTML: null,
      cellProps: {}
    },
    {
      field: 'protein',
      name: 'Protein',
      isSortable: false,
      isCustomHeaderCell: false,
      isCustomBodyCell: false,
      customStyle: {},
      customHTML: null,
      cellProps: {}
    },
  ];

  let keys = Object.keys(rows[0]);

  let onSearch = (value: string) => {
    let filteredData = rows.filter((ele) => { return filterAll(ele, keys, value); });
    setPage(() => 0);
    setFiltered(filteredData);
  }

  let filterAll = (ele: any, keys: string[], value: string): boolean => {
    for(let key of keys) {
      let final = ((''+ele[key]).toLowerCase().indexOf(value.toLowerCase())) > -1;
      if (final) { return true; }
    }
    return false;
  }

  let onPaginationChange = (event: {page: number, rowsPerPage: number, sortDirection: 'asc' | 'desc', sortBy: string}) => {
    setPage(event.page);
    console.log('Event :', event);
  }

  return (
    <div className="ABOUT">
      <div className="first-basic-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, ind) => (
                <TableRow
                  key={row.name + ind + (ind + 1)}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="my-2"></div>
      <div className="second-dynamic-table">
        <div className="search-input my-1">
          <FormElements  elementType='input' inputType='text' value={''} name="search" label="Search" id="search" onChange={(e) => onSearch(e.target.value)} />
        </div>
        <TableGrid fields={fields} data={filtered} rowsPerPage={4} pagination={true} item={page} onSetPage={(e) => onPaginationChange(e)} customBodyCell={(row: any, property: string) => {
          return (
            <Fragment>
              {
                property === 'fat' && (
                  <span style={{ fontWeight: 'bold', color: '#555' }}>{row[property]}</span>
                )
              }
              {
                property === 'calories' && (
                  <span style={{ fontWeight: 'bold', color: '#fff', background: '#555', display: 'inline-block', width: '50%', borderRadius: '5px', textAlign: 'center', padding: '10px 0', cursor: 'pointer' }}>{row[property]}</span>
                )
              }
            </Fragment>
          );
        }} />
      </div>
      <button className="btn btn-danger my-1" onClick={() => setPage((prev) => prev === 0 ? 1 : 0)}>Change Page {page + 1}</button>
      <div className="tabs-container bg-light">
        <TabsComponent
          data={tabsData}
          activeTabIndex={activeTabIndex} 
          isPanel={false}
          onTabClick={(e, tabIndex) => {
            e.preventDefault();
            if (typeof tabIndex === 'string') {
              navigate(tabIndex);
            }
          }}
        />
      </div>
      <div className="bg-light p-1">
        <Outlet />
      </div>
    </div>
  )
}

export default About;
