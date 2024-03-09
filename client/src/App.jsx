import { createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import "./App.css";


import Header from "./components/Header";
import Homepage from "./components/HomepageBody";
import Footer from "./components/Footer";
import CategoryPage from './pages/CategoryPage';
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostItem from "./components/PostItem";

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

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
const sportsItems = [
  {
    name: 'baseball bat',
    price: '$10',
    link: 'baseball-bat'
  }
]

  return (
    <ApolloProvider client={client}>
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
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/post-item" element={<PostItem />} />
                {sportsItems.map((item) => {
                  return <Route path={item.link} element={<Item link={sportsImage.link } />} />
                })}
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </Context.Provider>
    </ApolloProvider>
  );
}

export default App;
