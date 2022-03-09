import './style.css';
const Loading = () => {
  return (
    <div className="body">
      <div className={`classic-${Math.floor(Math.random() * 10)}`}></div>
    </div>
  );
};
export default Loading;
