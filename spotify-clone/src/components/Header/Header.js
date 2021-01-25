import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from '@material-ui/core';
import {useDataLayerValue} from '../../util/DataLayer';

function Header() {
    const [{ user }, dispatch] = useDataLayerValue();

    return (
        <div className = "header">
            <div className="header_left">
                <SearchIcon/>
                <input placeholder = "Search for Artists, Songs, Albums, and Playlists" type="text"/>
            </div>
            <div className = "header_right">
                <Avatar src = "" alt = "user"/>
                <h4>Mike</h4>

            </div>
        </div>
    )
}

export default Header
