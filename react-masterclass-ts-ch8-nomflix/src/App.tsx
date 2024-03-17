import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Tv from './Router/Tv'
import Home from './Router/Home'
import Search from './Router/Search'
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
        <Route path="movies/:movieId" element={<Home />} />
      </Routes>
    </Router>
  )
}
