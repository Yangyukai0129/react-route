import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={<About></About>} />
      </Routes>
    </BrowserRouter>)
}

function Home() {
  return (
    <h1>This is the Home page!</h1>
  )
}

function About() {
  return (
    <h1>About page goes here!</h1>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App></App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
