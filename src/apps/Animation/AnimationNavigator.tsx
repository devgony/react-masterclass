import { Link } from "react-router-dom";
import styled from "styled-components";

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListChild = styled.li`
  width: 200px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    cursor: pointer;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

function AnimationNavigator() {
  return (
    <Center>
      <ul>
        <ListChild>
          <Link to="/animations/spinner">Spinner</Link>{" "}
        </ListChild>
        <ListChild>
          <Link to="/animations/iphone-camera">IphoneCamera</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/gesture">Gesture</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/motion-value">MotionValue</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/svg">SVG</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/presence">Presence</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/slider">Slider</Link>
        </ListChild>
        <ListChild>
          <Link to="/animations/layout">Layout</Link>
        </ListChild>
      </ul>
    </Center>
  );
}

export default AnimationNavigator;
