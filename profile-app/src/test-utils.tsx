import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { setupStore } from './app/store';
import { setUpStore } from './store/index';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export function renderWithProviders(
    ui: any,
    { 
        preloadedState = {}, 
        // Automatically create a store instance if no store was passed in
        store = setUpStore(preloadedState),
        ...renderOptions
    }: any = {}
) {

  // setupListeners(store.dispatch);

  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}


// =====================================================================
// =====================================================================

// import {render} from '@testing-library/react';
// import { Provider } from 'react-redux';


// const customRender = (ui: any, options?: any) =>
//   render(ui, {wrapper: Provider, ...options})

// // re-export everything
// export * from '@testing-library/react';

// // override render method
// export {customRender as renderWithProviders}
