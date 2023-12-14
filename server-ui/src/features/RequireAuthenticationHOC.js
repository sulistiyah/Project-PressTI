// RequireAuthenticationHOC.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuthenticationHOC = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

        if (!isAuthenticated) {
        // Jika admin belum login, arahkan ke halaman login
        return <Navigate to="/api/admin/login" />;
        }

        // Jika admin sudah login, tampilkan komponen yang dibungkus
        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default RequireAuthenticationHOC;
