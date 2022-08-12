import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
// import reportWebVitals from './reportWebVitals';
=======
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
>>>>>>> f1fc2c2482fdb4d6b99aa00508dac6e37a662304

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
