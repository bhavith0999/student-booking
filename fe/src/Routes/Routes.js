import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = lazy(() => import('../Modules/Dashboard/Dashboard'));
const LoginLayout = lazy(() => import('../Modules/LoginScreen/LoginScreen'));
const AddBookingLayout = lazy(() => import('../Modules/AddBooking/AddBooking'));

export const routes = ({showSuccess}) => (
    [
        {
            path: '/',
            element: (<Outlet />),
            children: [
                {
                    index: true,
                    element: <Navigate to="/login" />
                },
                {
                    path: 'login',
                    element: <LoginLayout showSuccess={showSuccess} />
                },
                {
                    path: 'dashboard',
                    element: <DashboardLayout showSuccess={showSuccess} />
                },
                {
                    path: 'add-booking',
                    element: <AddBookingLayout showSuccess={showSuccess} />
                }

            ]
        },
    ]
)