import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./index.css";

const GifItem = (props) => {
  const { data, onFavourite, favourites } = props;
  const username = data.username.length === 0 ? "giphy*" : data.username;
  const title = data.title.length === 0 ? "giphy*" : data.title;
  const icon = favourites.includes(data) ? (
    <AiFillStar color="#ebd834" size={30} />
  ) : (
    <AiOutlineStar color="#ebd834" size={30} />
  );
  const favouriteToggle = () => {
    onFavourite(data);
  };

  return (
    <div className="gif-item" onClick={favouriteToggle}>
      <img className="gif" src={data.images.fixed_height.url} alt="gif" />
      <div className="content">
        <h1 className="title">{title}</h1>
        <div className="r">
          <p className="username">@{username}</p>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default GifItem;
