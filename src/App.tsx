import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from 'components/Navbar';
import ProductPage from 'pages/ProductPage';
import SearchPage from 'pages/SearchPage';
import CategoriesPage from 'pages/CategoriesPage';
import AppRoute from 'types';
import NotFoundPage from 'pages/NotFoundPage';
import AboutPage from 'pages/AboutPage';

const ROUTES: AppRoute[] = [
    {
        href: '/',
        text: 'Products'
    },
    {
        href: '/categories',
        text: 'Categories'
    },
    {
        href: '/about',
        text: 'About us'
    }
]

const App: React.FC = () => {
    const location = useLocation();

    console.log(location);

    return (
        <>
            <Navbar routes={ROUTES} currentRoute={location.pathname} />

            <div className={'page'}>
                <Routes>
                    <Route path='/' element={<SearchPage />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                    <Route path='/categories' element={<CategoriesPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/*'  replace element={<NotFoundPage />}/>
                </Routes>
            </div>
        </>
    )

}

export default App
