import Home from '../components/public/HomePage';
import ContactUs from '../components/public/ContactUs';
import Login from '../components/members/Login';

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
