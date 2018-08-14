import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Card from './containers/Card';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route exact={true} path="/" component={Card} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
