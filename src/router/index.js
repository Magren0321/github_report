import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../page/login/login'
import Home from '../page/home/home';

export default function myrouter(){
    return (
        <HashRouter>
            <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/user/:name" component={Home} />
            <Redirect to="/" />
            </Switch>
        </HashRouter>
    );
}