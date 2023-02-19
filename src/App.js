import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style.css";
import "bootswatch/dist/slate/bootstrap.min.css";

import Header from "./Components/Header";
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Article from "./Components/pages/Article";

export default function App() {
    return (
        <div>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route exact path="/article/:id" element={<Article />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
