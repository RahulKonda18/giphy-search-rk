import "./index.css";

const Pagination = (props) => {
  const { data, change } = props;
  const changeOffset = () => {
    change(data);
  };
  return (
    <h1 className="element" onClick={changeOffset}>
      {data}
    </h1>
  );
};

export default Pagination;
