import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {ROUTES} from '@shared/router/routes';

const RootPage: React.FC = () => {
    const [state, setState] = useState(0);

    return (
        <div>
            RootPage
            <Link to={ROUTES.blog}>go to blog</Link>
            <div>
                <span>{state}</span>
                <button type="button" onClick={() => setState((prevState) => prevState + 1)}>
                    click
                </button>
            </div>
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default RootPage;
