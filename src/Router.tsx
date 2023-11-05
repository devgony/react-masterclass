import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./components/Coin/Coin";
import Coins from "./components/Coin/Coins";
import Navigator from "./routes/Navigator";
import ToDoList from "./components/Todo/ToDoList";

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
