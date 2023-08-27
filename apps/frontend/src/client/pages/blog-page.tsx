import React from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '@shared/router/routes';

import data from './blog-data.json';

const BlogPage: React.FC = () => {
    return (
        <div>
            BlogPage
            <Link to={ROUTES.root}>Go to root</Link>
            <div>data size: {data.data.length}</div>
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default BlogPage;
