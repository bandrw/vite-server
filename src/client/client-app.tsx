import {hydrateRoot} from 'react-dom/client';
import {App} from './app.tsx';

hydrateRoot(document.getElementById('app')!, <App />)
