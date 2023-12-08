import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from './pages/About'
import Home from './pages/Home'
import Vans from './pages/Vans/Vans'
import VanDetail from './pages/Vans/VanDetail';
import Layout from './component/Layout'
import HostLayout from './component/HostLayout';
import Dashboard from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostVans from './pages/Host/HostVans';
import HostVanDetail from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import NotFound from './pages/NotFound';


import './server'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 等於path="/" */}
        <Route element={<Layout />}>
          {/* 可以把path="/"寫成index，如果點擊其他路徑就不會是index所以頁面上不會顯示 */}
          <Route path="/" element={<Home></Home>} />
          <Route path="about" element={<About></About>} />
          {/*也可以這樣寫
           <Route path="vans">
            <Route index element={<Vans></Vans>} />
            <Route path=":id" element={<VanDetail></VanDetail>} />
          </Route> */}
          <Route path="vans" element={<Vans></Vans>} />
          <Route path="vans/:id" element={<VanDetail></VanDetail>} />
          <Route path="host" element={<HostLayout />}>
            {/* 也可以寫成path="/"，但這樣就會變成絕對路徑 */}
            <Route index element={<Dashboard></Dashboard>} />
            {/* 跟著母path走，絕對路徑/host/income(現在是相對路徑) */}
            <Route path="income" element={<Income></Income>} />
            <Route path="reviews" element={<Reviews></Reviews>} />
            <Route path="vans" element={<HostVans></HostVans>} />
            <Route path="vans/:id" element={<HostVanDetail></HostVanDetail>}>
              <Route index element={<HostVanInfo></HostVanInfo>} />
              <Route path="pricing" element={<HostVanPricing></HostVanPricing>} />
              <Route path="photos" element={<HostVanPhotos></HostVanPhotos>} />
            </Route>
          </Route>
          {/* 如果沒有其他route符合的話，就使用這個route，放在第一個route下面後看你要放哪邊都可以 */}
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App></App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
