import React, { Fragment } from 'react'
import { CircularProgress } from '@mui/material';
import './Loader.css';

export interface LoaderProps {
  appendTo?: 'inline' | 'body';
  loadingText?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: string | number;
  thickness?: number;
}

function Loader(props: LoaderProps) {
  let defaults = {
    appendTo: 'body',
    color: 'primary',
    size: 40,
    loadingText: 'Loading...',
    thickness: 3
  };
  let states = Object.assign({}, defaults, props);
  
  return (
    <Fragment>
      {states.appendTo === 'inline' ? (
        <CircularProgress color={states.color} size={12} />
      ) : (
        <Fragment>
          <div className="loader-container">
            <div className="loader-wrapper">
              <div className="loaders">
                <CircularProgress color={states.color} thickness={states.thickness} size={states.size} />
                <p>{states.loadingText}</p>
              </div>
            </div>
          </div>
          <div className="loader-backdrop"></div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Loader;
