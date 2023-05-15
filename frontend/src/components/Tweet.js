import '../App.css';
import React, {useEffect, useState} from 'react';
import SelectComponent from './SelectComponent';
// import {Link} from 'react-router-dom';

function Tweet() {


   /*  const options = [ 
        {key: 1, value: "Test 1"},
        {key: 2, value: "Test 2"},
        {key: 3, value: "Test 3"}
    ]; */

    const [selectedOption, setSelectedOption] = useState("");
    //const [selectedTopic, setSelectedTopic] = useState(""); //new
    const [items, setItems] = useState([]);


    useEffect( () => {
        fetchItems();
    }, []);

    

    const fetchItems = async () => {
        const data = await fetch('/courses');
        const items = await data.json();
        setItems(items);
    };

    const options = items.map(item => {
        return {
            key: item._id,
            value: item.course_name
            //topic: item.topic_1, //new
            //probability: item.probability_1 //new
        }
    });

    //console.log("HELLO")

    return(
        <section>
            <div> 
                <SelectComponent
                    options = {options}
                    onChange = {(item) => setSelectedOption(item)}
                    selectedKey={selectedOption}
                    placeholder={"type to search"}
                />
                <p className="sel-option"> Selected option: {selectedOption}</p>
            </div>
            {
            items.map(item => (
                <div className="courses-map">
                    <p>Course name: {item.course_name}</p>
                    <p>Course id: {item.course_id}</p>
                    <p>Topic 1: {item.topic_1}</p>
                    <p>Probability 1: {item.probability_1}</p>
                </div>
            ))
            }
        </section>
    );
}

export default Tweet;