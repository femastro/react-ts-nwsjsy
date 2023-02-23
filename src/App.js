import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style.css";
import "bootswatch/dist/slate/bootstrap.min.css";

import Header from "./Components/Header";
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Article from "./Components/pages/Article";
import DeleteById from "./Components/pages/Delete";
import NewArticle from "./Components/pages/New";

export default function App() {
    const notify = () => toast("Wow so easy!");
    return (
        <div>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route exact path="/article/:id" element={<Article />} />
                    <Route exact path="/delete/:id" element={<DeleteById />} />
                    <Route exact path="/new" element={<NewArticle />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
