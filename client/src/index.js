import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入根组件
import App from './App';

import './index.css'

//使用路由模式history
import { BrowserRouter } from 'react-router-dom'

//导入仓库
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);