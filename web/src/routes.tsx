import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import { HomeScreen } from './screens/Home/HomeScreen'
import { CreatePointScreen } from './screens/CreatePoint/CreatePointScreen'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomeScreen}/>
              <Route path="/create-point" component={CreatePointScreen}/>
            </Switch> 
        </BrowserRouter>
    )
}