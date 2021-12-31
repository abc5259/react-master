import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

interface IRouterProps {
  isDark: boolean;
  toggleDark: () => void;
}
//Switch는 한번에 하나의 Route를 랜더링할 수 있는 방법이다.
const Router = ({ isDark, toggleDark }: IRouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
