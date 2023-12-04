import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./apps/Coin/Coin";
import Coins from "./apps/Coin/Coins";
import Navigator from "./routes/Navigator";
import ToDoList from "./apps/Todo/components/ToDoList";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/coin/:coinId">
          <Coin />
        </Route>
        <Route path="/coins">
          <Coins />
        </Route>
        <Route path="/todo-list">
          <ToDoList />
        </Route>
        <Route path="/">
          <Navigator />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
