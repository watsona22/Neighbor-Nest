import placeholderImage from '../assets/placeholderImage.jpg'

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",

  height: "621px"
}


export const ShopByItem = (props) => {
  
  return (
    <div style={divStyle}>
        <h2>{props.itemName}</h2>
        <img src={placeholderImage} alt="" />
        <p>{props.itemDescription}</p>
        <p><strong>${props.itemPrice}</strong></p>
    </div>
  )
}

