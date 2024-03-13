import { Link } from "react-router-dom";
import { GET_ITEMS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import '../styles/categoryPage.css'
import placeholderImage from '../assets/placeholderImage.jpg'

function CategoryPage(props) {
  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: {
      category: props.categoryId,
      name: props.categoryName
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="category-page-container">
      <h2>{props.categoryName}</h2>
      <div className="products-container">
        {data.items.map(item => (
          <div key={item._id}>
            <Link to={`/items/${item._id}`}>
              <img src={placeholderImage} alt={item.name} />
              <p>{item.name}</p>
              <h5>${item.price}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

