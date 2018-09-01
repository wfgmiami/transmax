import React from 'react';
import {Redirect} from 'react-router-dom';
import Utils from './Utils';
import {HomeRouteConfig} from './homeRouteConfig';

const routeConfigs = [
    HomeRouteConfig
];

export const routes = [
    ...Utils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/home"/>
    }
];
