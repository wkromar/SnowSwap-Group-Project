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

import GearTags from "../GearTags/GearTags";

import './FilterDrawer.css'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function FilterDrawer({ filter, setFilter }) {

    const dispatch = useDispatch();

    const flex = GearTags[0];
    const snowboardStyle = GearTags[1];
    const skiStyle = GearTags[2];
    const shape = GearTags[3];
    const profile = GearTags[4];
    const condition = GearTags[6];
    const lacing_system = GearTags[7];
    const size = ["XS", "S", "M", "L", "XL", "XXL"]

    const [isOpen, setIsOpen] = useState(false);

    const [category, setCategory] = useState('');
    const [snowboardStyleSearch, setSnowboardStyleSearch] = useState('');
    const [conditionSearch, setConditionSearch] = useState('');
    const [skiStyleSearch, setSkiStyleSearch] = useState('');
    const [profileSearch, setProfileSearch] = useState('');
    const [flexSearch, setFlexSearch] = useState('');
    const [shapeSearch, setShapeSearch] = useState('');
    const [gender, setGender] = useState('');
    const [lacingSystemSearch, setLacingSystemSearch] = useState('');
    const [sizeSearch, setSizeSearch] = useState('');

    const [searchObj, setSearchObj] = useState({})
    

    const whatToFilterFor = (event) => {

        console.log(event);

    }


// Updates the object that will be used to filter the items displayed
    const updateSearchObj = (key, value) => {
            setSearchObj({...searchObj, [key] : value})
        }

// These functions will call the update function and set the select values.
    const catSelected = (cat) => {

        console.log('cat selected');
        setCategory(cat);
        setSearchObj({'category' : cat});
        setConditionSearch('')
        setGender('')
    }

    const conditionSelected = (con) => {

        console.log('con selected');
        setConditionSearch(con);
        updateSearchObj('condition', con);
    }

    const genderSelected = (gen) => {

        console.log('gen selected');
        setGender(gen);
        updateSearchObj('gender', gen);
    }

    const snowboardStyleSelected = (board) => {

        console.log('board style selected');
        setSnowboardStyleSearch(board);
        updateSearchObj('style', board);
    }

    const skiStyleSelected = (ski) => {

        console.log('ski style selected');
        setSkiStyleSearch(ski);
        updateSearchObj('style', ski);
    }

    const profileSelected = (profile) => {

        console.log('profile selected');
        setProfileSearch(profile);
        updateSearchObj('profile', profile);
    }

    const lacingSystemSelected = (ski) => {

        console.log('lacing system selected');
        setLacingSystemSearch(ski);
        updateSearchObj('lacing_system', ski);
    }

    const flexSelected = (flex) => {

        console.log('flex selected');
        setFlexSearch(flex);
        updateSearchObj('flex', flex);
    }

    const sizeSelected = (size) => {

        console.log('size selected');
        setSizeSearch(size);
        updateSearchObj('size', size);
    }



    
// When apply is clicked it sends over the object to be filtered against.
    const applyFilter = () => {
        console.log('apply clicked');
        console.log('searchObj:', searchObj);

        dispatch({type: 'SET_FILTER_OBJECT', payload: searchObj})
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

    // filter list dropdown
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"

            onChange={(event) => whatToFilterFor(event.target.value)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <div className="filterSelect">

                    <div>
                        <label>Category: </label>
                        <select name="cat" id=""
                            value={category}
                            onChange={(event) => { catSelected(event.target.value) }}
                        >
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
                    {/* condition section */}
                    <div>
                        <label>Condition: </label>
                        <select name="condition" id=""
                            value={conditionSearch}
                            onChange={(event) => { conditionSelected(event.target.value) }}>
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
                        <select name="gender" id=""
                            value={gender}
                            onChange={(event) => { genderSelected(event.target.value) }}
                        >
                            <option value="">Select Gender</option>
                            <option value="men">Men</option>
                            <option value="woman">Women</option>
                        </select>
                    </div>
                    
                    {/* conditionally renders if snowboard is selected */}
                    <div>
                        {category === "snowboard" ?
                            <div>
                                <label>Board Style: </label>
                                <select name="snowboardStyle" id=""
                                    value={snowboardStyleSearch}
                                    onChange={(event) => { snowboardStyleSelected( event.target.value) }}
                                >
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
                                    <select name="skiStyle" id=""
                                        value={skiStyleSearch}
                                        onChange={(event) => { skiStyleSelected(event.target.value) }}
                                    >
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
                                    <select name="skiProfile" id=""
                                        value={profileSearch}
                                        onChange={(event) => { profileSelected(event.target.value) }}
                                    >
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
                                <select name="lacing_system" id=""
                                    value={lacingSystemSearch}
                                    onChange={(event) => { lacingSystemSelected(event.target.value) }}
                                >
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
                                <select name="flex" id=""
                                    value={flexSearch}
                                    onChange={(event) => { flexSelected(event.target.value) }}
                                >
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

                        {category === "helmet" ||
                            category === "apparel" ||
                            category === "snowboardBoots" ||
                            category === "skiBoots" ?
                            <div>
                                <label>Size: </label>
                                <select name="size" id=""
                                    value={sizeSearch}
                                    onChange={(event) => { sizeSelected(event.target.value) }}
                                >
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
            <div>
                <Button onClick={applyFilter}>Apply</Button>
            </div>

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