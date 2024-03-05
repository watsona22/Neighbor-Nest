import { Link } from "react-router-dom";
import image from '../assets/about-us-image.jpg'
import hands from '../assets/hands-banner.jpg'
import "../styles/aboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="top-div">
          <img src={hands} alt="" />
          <div className="text-overlay">Our Vision</div>
      </div>    
      <div className="bottom-div">
        {/* <img src={image} alt="about us image" /> */}
        
        <p>
          Welcome to MarketHub, your go-to online marketplace where creativity
          meets convenience and community thrives. Like a vibrant, bustling
          bazaar, we bring together a diverse tapestry of sellers and buyers,
          artisans and collectors, dreamers and doers. Our platform is inspired by
          the spirit of entrepreneurship and the joy of discovering unique items
          and services. From handmade crafts and vintage treasures to innovative
          services and personalized gifts, MarketHub is a celebration of human
          ingenuity and passion.
          <br />
          <br />
          At MarketHub, we believe in building more than just a marketplace; we're
          cultivating a community where individuals can share their talents and
          passions with the world. Our mission is to empower sellers to turn their
          creative visions into reality and provide buyers with an enchanting,
          seamless shopping experience that sparks joy and inspiration. Whether
          you're looking to declutter your space, hunt for rare finds, or start a
          small business, MarketHub is your springboard to connect, discover, and
          flourish in a global marketplace that values uniqueness and creativity.
          <br />
          <br />
          Join us on this exciting journey and be a part of a community that
          champions creativity, sustainability, and the magic of human connection.
          Explore MarketHub today and uncover the endless possibilities that
          await.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
