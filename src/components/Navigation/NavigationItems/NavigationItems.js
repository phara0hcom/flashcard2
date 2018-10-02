import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            Flash Card
        </NavigationItem>
        <NavigationItem link="/settings">Settings</NavigationItem>
    </ul>
);

export default navigationItems;
