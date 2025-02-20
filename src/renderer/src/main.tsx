import { store } from '@renderer/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from './App';
import './assets/index.css';
import './assets/style.scss';
import './styles/font.css';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </React.StrictMode>
);
