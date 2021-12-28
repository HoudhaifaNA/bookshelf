const Icon = (props) => {
  return <use xlinkHref={`/sprite.svg#${props.icon}`} />;
};

export default Icon;
