import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

//Switch는 한번에 하나의 Route를 랜더링할 수 있는 방법이다.
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
