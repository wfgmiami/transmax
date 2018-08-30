import Home from '../components/HomePage';
import ContactUs from '../components/ContactUs';
import Login from '../components/Login';

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
        },
        {
            path     : '/contactus',
            component: ContactUs
        },
        {
            path     : '/login',
            component: Login
        }
    ]
};