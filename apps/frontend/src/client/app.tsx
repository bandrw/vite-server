import React from 'react';

import {Router} from '@shared/router';

import {OnRenderProps, ServerRendererProps} from '../server/server-renderer';

export const App: React.FC<OnRenderProps<ServerRendererProps>> = ({onRender}) => {
    return <Router onRender={onRender} />;
};
