import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { RouteAPI } from '../../core/constants/Route.api';

export interface Menu {
    name: string;
    url: string;
}

function Pages() {
    let locations = useLocation();
    let menus: Menu[] = [
        {
            name: 'Home',
            url: RouteAPI.Pages
        },
        {
            name: 'About',
            url: RouteAPI.About
        },
        {
            name: 'Service',
            url: RouteAPI.Service
        },
        {
            name: 'Contact',
            url: RouteAPI.ContactUs
        },
        {
            name: 'Todo',
            url: RouteAPI.ToDo
        }
    ];

    return (
        <section className="container">
            <div className="pages-container">
                <ul className="menus">
                    {
                        menus.map((menu:Menu, ind: number) => (
                            <li key={menu.url} className={menu.url === locations.pathname ? 'active' : ''}>
                                <NavLink to={menu.url}>{menu.name}</NavLink>
                            </li>
                        ))
                    }
                </ul>
                <Outlet />
            </div>
        </section>
    )
}

export default Pages;
