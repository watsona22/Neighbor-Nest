import Slider from "react-slick";
import placeholderImage from "../assets/placeholderImage.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductBar() {
  const images = [
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
    placeholderImage,
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const anchorStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }

  const innerDivStyle = {
    width: 150,
    marginTop: 3
  }

  const priceStyle = {
    fontSize: 14,
  }

  return (
    <div className="product-bar-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <a href="#!" style={anchorStyle}>
              <img src={image} alt={`Placeholder ${index}`} />
              <div style={innerDivStyle}>
                <p>Placeholder Name</p>
                <p style={priceStyle}>$20</p>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductBar;
