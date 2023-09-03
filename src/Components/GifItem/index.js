import "./index.css";

const GifItem = (props) => {
  const { data, onFavourite } = props;
  const username = data.username.length === 0 ? "giphy*" : data.username;
  const title = data.title.length === 0 ? "giphy*" : data.title;

  const favouriteToggle = () => {
    onFavourite(data);
  };

  return (
    <div className="gif-item" onClick={favouriteToggle}>
      <img className="gif" src={data.images.fixed_height.url} alt="gif" />
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="username">@{username}</p>
      </div>
    </div>
  );
};

export default GifItem;
