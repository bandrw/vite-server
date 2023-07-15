import React from 'react';
import {Router} from './shared/router/router.tsx';
import {ServerRendererProps, OnRenderProps} from '../server/server-renderer.tsx';

export const App: React.FC<OnRenderProps<ServerRendererProps>> = ({onRender}) => {
    return (
        <Router onRender={onRender} />
    );
};
