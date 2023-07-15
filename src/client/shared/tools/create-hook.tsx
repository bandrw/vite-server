import React from 'react';

interface CreatedHook<T, Arg = never> {
    context: React.Context<T | undefined>;
    hook: () => T;
    safeHook: () => T | undefined;
    provider: React.FC<React.PropsWithChildren<[Arg] extends [never] ? object : {initialValue: Arg}>>;
}

export const createHook = <T, Arg = never>(name: string, initState: (arg: Arg) => T): CreatedHook<T, Arg> => {
    const context = React.createContext<T | undefined>(undefined);

    const useSafeHook = (): T | undefined => {
        return React.useContext(context);
    };

    return {
        context,
        hook: () => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const localContext = React.useContext(context);
            if (localContext === undefined) {
                throw new Error(`${name} hook used outside of provider`);
            }
            return localContext;
        },
        safeHook: useSafeHook,
        provider: ({children, ...props}) => {
            // @ts-ignore
            const arg: Arg = props.initialValue;

            return <context.Provider value={initState(arg)}>{children}</context.Provider>;
        },
    };
};
