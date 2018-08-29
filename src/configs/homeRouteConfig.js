import Home from '../components/HomePage';

export const HomeRouteConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/home',
            component: Home
        }
    ]
};