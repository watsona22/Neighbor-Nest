import ProductBar from "./ProductBar";
import '../styles/homepage.css'
import ShopByCategory from "./ShopByCategory";




function HomepageBody() {
  return (
    <div className="homepage-body-container">
      <h2>Shop By Category</h2>
      <ShopByCategory />
      <ProductBar />
      <ProductBar />
      <ProductBar />
    </div>
  )
}

export default HomepageBody;