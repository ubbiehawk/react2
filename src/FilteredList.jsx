import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';
import './index.css'

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            type: "all" // Adding a new key/value pair in the state to keep track of type
        };
    }

    // Sets the state whenever the user types on the search bar
    onSearch = (event) => {
        this.setState({ search: event.target.value.trim().toLowerCase() });
    }

    // Event handling method for when an item in dropdown is selected
    handleDropdownSelect = (eventKey) => {
        this.setState({ type: eventKey });
    }

    filterItem = (item) => {
        // Checks if the current search term is contained in this item
        // Also checks if the item type matches the selected type
        if (this.state.type === "all" || item.type === this.state.type) {
            return item.name.toLowerCase().search(this.state.search) !== -1;
        }
        return false;
    }

    render() {
        return (
            <div className="filter-list">
                <h1>Produce Search</h1>
                {/* Dropdown menu for selecting item type */}
                <DropdownButton id="typeDropdown" title={"Type"} onSelect={this.handleDropdownSelect}>
                    <Dropdown.Item eventKey="all">All</Dropdown.Item><br></br>
                   
                    <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item><br></br>
                    <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item>
                </DropdownButton>
               
                {/* List component to display filtered items */}
                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;
