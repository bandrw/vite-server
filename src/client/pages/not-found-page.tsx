import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../shared/router/routes.ts';

const NotFoundPage: React.FC = () => {
    return (
        <div>
            NotFoundPage
            <Link to={ROUTES.root}>go to root</Link>
        </div>
    );
};

export default NotFoundPage;
