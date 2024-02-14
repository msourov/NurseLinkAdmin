const IconGenerator = ({ props }) => {
  const path = `./icons/${props}.png`;
  return <img src={path} style={{ width: "20px", marginRight: "0.35em" }} />;
};
export default IconGenerator;
