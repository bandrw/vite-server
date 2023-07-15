import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../shared/router/routes.ts';

const BlogPage: React.FC = () => {
    return (
        <div>
            BlogPage
            <Link to={ROUTES.root}>Go to root</Link>
        </div>
    );
};

export default BlogPage;
