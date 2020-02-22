import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import $ from 'jquery';

console.log($('div'));


ReactDOM.render(
    <Provider store={store}>
        <App />
        {/* <DatePicker defaultValue={moment('2020-02-02', 'YYYY-MM-DD')} /> */}
    </Provider>,
    document.getElementById('root')
);

