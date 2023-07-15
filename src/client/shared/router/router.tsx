import React from 'react';
import {useRoutes} from 'react-router-dom';
import {ROUTES} from './routes.ts';
import {ServerRendererProps, OnRenderProps} from '../../../server/server-renderer.tsx';
import {CAN_USE_DOM} from '../tools/tools.ts';

const LazyRootPage = React.lazy(() => import('../../pages/root-page.tsx'));
const LazyBlogPage = React.lazy(() => import('../../pages/blog-page.tsx'));
const LazyNotFoundPage = React.lazy(() => import('../../pages/not-found-page.tsx'));

const LoadablePage: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <React.Suspense fallback={
            <div>lazy loading</div>
        }>
            {children}
        </React.Suspense>
    )
}

const ServerRendererPropsHandler: React.FC<React.PropsWithChildren<
    OnRenderProps<ServerRendererProps> & {data: ServerRendererProps}
>> = ({children, onRender, data}) => {
    if (CAN_USE_DOM) return <>{children}</>;

    onRender?.(data);
    return <>{children}</>
};

export const Router: React.FC<OnRenderProps<ServerRendererProps>> = ({onRender}) => {
    return useRoutes([
        {
            path: ROUTES.root,
            element: (
                <LoadablePage>
                    <LazyRootPage />
                </LoadablePage>
            ),
        },
        {
            path: ROUTES.blog,
            element: (
                <LoadablePage>
                    <LazyBlogPage />
                </LoadablePage>
            ),
        },
        {
            path: '*',
            element: (
                <ServerRendererPropsHandler onRender={onRender} data={{statusCode: 404}}>
                    <LoadablePage>
                        <LazyNotFoundPage />
                    </LoadablePage>
                </ServerRendererPropsHandler>
            )
        }
    ]);
};
