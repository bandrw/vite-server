import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../shared/router/routes.ts';

const RootPage: React.FC = () => {
    return (
        <div>
            RootPage
            <Link to={ROUTES.blog}>go to blog</Link>
        </div>
    );
};

export default RootPage;
