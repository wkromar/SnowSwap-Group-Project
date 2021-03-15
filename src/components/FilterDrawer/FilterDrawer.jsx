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

    const flex = ["Stiff", "Semi-stiff", "Mid", "Semi-flex", "Flex"];
    const snowboardStyle = [
        "Freestyle",
        "Freeride",
        "All-Mountain",
        "Powder",
        "Race",
        "Swallowtail",
    ];
    const skiStyle = [
        "Alpine",
        "Freeride",
        "Telemark",
        "Cross-country",
        "Freestyle",
        "Racing",
        "Powderhound Planks",
    ];
    const shape = ["Directional", "Directional Twin", "Twin", "Volume Shifted"];
    const profile = ["Camber", "Camber rocker combo", "Rocker", "Reverse Camber"];
    const condition = [
        "Boneyard",
        "Heavily used",
        "Moderately used",
        "Lightly used",
        "Like new",
        "New",
    ];
    const lacing_system = ["Traditional", "Quick-pull", "BOA"];
    const size = ["XS", "S", "M", "L", "XL", "XXL"]

    const [isOpen, setIsOpen] = useState(false);

    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [snowboardStyleSearch, setSnowboardStyleSearch] = useState('');
    const [skiStyleSearch, setSnowboardStyleSearch] = useState('')
    const [profileSearch, setProfileStyleSearch] = useState('')

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
                            <option>Select Condition</option>
                            {condition.map((con) => {
                                return (
                                    <option key={con} value={con}>
                                        {con}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label>Gender: </label>
                        <select name="gender" id="">
                            <option value="">Select Gender</option>
                            <option value="men">Men</option>
                            <option value="woman">Women</option>
                        </select>
                    </div>
                    <div>
                        <label>Category: </label>
                        <select name="cat" id="" onChange={(event) => { setCategory(event.target.value) }}>
                            <option value="">Select Category</option>
                            <option value="snowboard">Snowboard</option>
                            <option value="snowboardBoots">Snowboard Boots</option>
                            <option value="snowboardBindings">Snowboard Bindings</option>
                            <option value="ski">Ski</option>
                            <option value="skiBoots">Ski Boots</option>
                            <option value="skiBindings">Ski Bindings</option>
                            <option value="helmet">Helmet</option>
                            <option value="apparel">Apparel</option>
                        </select>
                    </div>
                    <div>
                        {category === "snowboard" ?
                            <div>
                                <label>Board Style: </label>
                                <select name="snowboardStyle" id="">
                                    <option>Select Style</option>
                                    {snowboardStyle.map((style) => {
                                        return (
                                            <option key={style} value={style}>
                                                {style}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            :
                            null}

                        {category === "ski" ?
                            <div>
                                <div>
                                <label>Ski Style: </label>
                                <select name="skiStyle" id="">
                                    <option>Select Style</option>
                                    {skiStyle.map((style) => {
                                        return (
                                            <option key={style} value={style}>
                                                {style}
                                            </option>
                                        );
                                    })}
                                </select>
                                </div>
                                <div>
                                <label>Ski Profile: </label>
                                <select name="skiProfile" id="">
                                    <option>Select Profile</option>
                                    {profile.map((prof) => {
                                        return (
                                            <option key={prof} value={prof}>
                                                {prof}
                                            </option>
                                        );
                                    })}
                                </select>
                                </div>
                            </div>
                            :
                            null}

                        {category === "snowboardBoots" ||
                            category === "skiBoots" ?
                            <div>
                                <label>Lacing System: </label>
                                <select name="lacing_system" id="">
                                    <option>Select Laces</option>
                                    {lacing_system.map((system) => {
                                        return (
                                            <option key={system} value={system}>
                                                {system}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            :
                            null}

                        {category === "skiBoots" ?
                            <div>
                                <label>Boot Flex: </label>
                                <select name="flex" id="">
                                    <option>Select Laces</option>
                                    {flex.map((flex) => {
                                        return (
                                            <option key={flex} value={flex}>
                                                {flex}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            :
                            null}

                        {category === "helmet" ?
                            <div>
                                <label>Helmet Size: </label>
                                <select name="helmet" id="">
                                    <option>Select Size</option>
                                    {size.map((size) => {
                                        return (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            :
                            null}

                    </div>

                </div>
            </List>
            <Divider />

        </div>
    );

    return (
        <div className="filterContainer">
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} className="filterBtn">Filter</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


export default FilterDrawer;