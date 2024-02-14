import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./apps/Coin/Coin";
import Coins from "./apps/Coin/Coins";
import Navigator from "./routes/Navigator";
import ToDoList from "./apps/Todo/components/ToDoList";
import Trello from "./apps/Trello/Trello";
import Animation from "./apps/Animation/AnimationNavigator";
import AnimationNavigator from "./apps/Animation/AnimationNavigator";
import IphoneCamera from "./apps/Animation/animations/IphoneCamera";
import { Spinner } from "./apps/Animation/animations/Spinner";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coin/:coinId" component={Coin} />
        <Route path="/coins" component={Coins} />
        <Route path="/todo-list" component={ToDoList} />
        <Route path="/trello" component={Trello} />
        <Route path="/animations" exact component={AnimationNavigator} />
        <Route path="/animations/spinner" component={Spinner} />
        <Route path="/animations/iphone-camera" component={IphoneCamera} />
        <Route path="/" component={Navigator} />
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
