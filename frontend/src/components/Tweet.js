import '../App.css';
import React, {useEffect, useState} from 'react';
import SelectComponent from './SelectComponent';
// import {Link} from 'react-router-dom';
//src="https://cdn.jsdelivr.net/npm/chart.js"

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
            value: item.CourseID
            //topic: item.topic_1, //new
            //probability: item.probability_1 //new
        }
    });

   
          
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
       
            
            <div className="courses-map">
                <p>Course name: {options.CourseID}</p>
                <p>Course id: {options.courseName}</p>
                <p>Topic/Probability: {options.topic}</p>
            </div>
            
        </section> 
           
    
    );
}



export default Tweet;