import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import './FilterDrawer.css'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function FilterDrawer() {

    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('')

    const whatToFilterFor = (event) => {
        setFilter(event)
        console.log(event);
    }

    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onChange={(event) => whatToFilterFor(event.target.value)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <div className="filterSelect">
                    <div>
                        <label>Condition: </label>
                        <select name="condition" id="">
                            <option value="used">Used</option>
                            <option value="new">New</option>
                        </select>
                    </div>
                    <div>
                        <label>Brand: </label>
                        <select name="brand" id="">
                            <option value="">Select Brand</option>
                            <option value="burton">Butron</option>
                            <option value="dalbello">Dalbello</option>
                        </select>
                    </div>
                    <div>
                        <label>Category: </label>
                        <select name="cat" id="" onChange={(event) => { setCategory(event.target.value) }}>
                            <option value="">Select Category</option>
                            <option value="snowboard">Snowboard</option>
                            <option value="ski">Ski</option>
                            <option value="helmet">Helmet</option>
                            <option value="apparel">Apparel</option>
                        </select>
                    </div>
                    <div>
                        {category === "snowboard" ? <p>snowboard style</p> : null}
                    </div>

                </div>
            </List>
            <Divider />

        </div>
    );

    return (
        <div>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>Filter</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


export default FilterDrawer;