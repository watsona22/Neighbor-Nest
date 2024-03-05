import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";


import Header from "./components/Header";
import Homepage from "./components/HomepageBody";
import Footer from "./components/Footer";
import CategoryPage from './pages/CategoryPage';
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";

import carImage from './assets/car.jpg'
import clothingImage from './assets/clothing.jpg'
import sportsImage from './assets/sports.jpg'
import electronicsImage from './assets/electronics.webp'
import industryImage from './assets/industry.avif'
import jewelryImage from './assets/jewelry.jpg'
import artImage from './assets/art.jpg'
import homeImage from './assets/home.jpg'
import dogImage from './assets/dog.jpg'
import otherImage from './assets/other.jpeg'

const categories = [
  { category: "Car Parts and Accessories", link: "/car-parts", image: carImage },
  { category: "Clothing and Accessories", link: "/clothing-and-accessories", image: clothingImage },
  { category: "Sporting Goods", link: "/sporting-goods", image: sportsImage },
  { category: "Electronics", link: "/electronics", image: electronicsImage },
  { category: "Business and Industrial", link: "/business-and-industrial", image: industryImage },
  { category: "Jewelry and Watches", link: "/jewelry-and-watches", image: jewelryImage },
  { category: "Collectibles and Art", link: "/collectibles-and-art", image: artImage },
  { category: "Home and Garden", link: "/home-and-garden", image: homeImage },
  { category: "Pet Supplies", link: "/pet-supplies", image: dogImage },
  { category: "Other", link: "/other", image: otherImage },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
}

export const Context = createContext();

function App() {


  return (
    <Context.Provider value={categories}>
      <div className="main-container">
        <BrowserRouter>
          <Header />
          <div className="pages">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Homepage />} />
              {categories.map((category, index) => {
                return <Route path={category.link} element={<CategoryPage key={index} index={index}/>}/>
              })}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
