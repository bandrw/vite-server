import React, {useState} from 'react';

export const App: React.FC = () => {
    const [state, setState] = useState(0);

    return (
        <div>
            <div>This is real app! {state}</div>
            <button onClick={() => setState(prev => prev + 1)}>click</button>
        </div>
    );
};
