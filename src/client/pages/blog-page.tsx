import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../shared/router/routes.ts';
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

export default BlogPage;
