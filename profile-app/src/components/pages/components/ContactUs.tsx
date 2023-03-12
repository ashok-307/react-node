import React, { Fragment, useEffect } from 'react';

function ContactUs() {
  useEffect(() => {
    const d = new Date();
    console.log('Date :', d.toUTCString().slice(-3));
  }, []);
  return (
    <Fragment>
      <div>Contact Us</div>
      <button className="btn btn-danger my-1">Button</button>
      <div className="tables-block" style={{minWidth: '320px', overflow: 'auto'}}>
      <table className="table" width={'100%'}>
        <thead>
          <tr>
            <th rowSpan={2}>Diseases</th>
            <th colSpan={3}>Immediate Family</th>
            <th colSpan={5}>Parental Side</th>
            <th colSpan={5}>Maternal Side</th>
          </tr>
          <tr>
            <th>Father</th>
            <th>Mother</th>
            <th>Siblings</th>
            <th>Grand Father</th>
            <th>Grand Mother</th>
            <th>Uncle</th>
            <th>Aunts</th>
            <th>Cousins</th>
            <th>Grand Father</th>
            <th>Grand Mother</th>
            <th>Uncle</th>
            <th>Aunts</th>
            <th>Cousins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
        </tbody>
      </table>
      </div>
    </Fragment>
  )
}

export default ContactUs;
