import React, { useEffect, useState } from "react";
import withClickOutside from "./withClickOutside";

const SelectComponent = React.forwardRef(
  (
    { options, placeholder = "", onChange, selectedKey, open, setOpen },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(placeholder);
    //const [selectedTopic, setSelectedTopic] = useState(""); //new
    //const [selectedProbability, setSelectedProbability] = useState(""); //new

    useEffect(() => { //updates the inputValue based on the selectedKey by searching for the corresponding option in the options array
      if (selectedKey) {
        setInputValue(options.find((o) => o.key === selectedKey).value);
        //setSelectedTopic(options.find((o) => o.key === selectedKey).topic);
      }
    }, [selectedKey, options]);

    useEffect(() => { //handles scenarios where the component is closed (open is false) and the current inputValue doesn't match any value in the options array
      if (!open && options.findIndex((o) => o.value === inputValue) === -1) {
        if (!inputValue) {
          onChange("");
        } else {
          if (selectedKey) {
            setInputValue(options.find((o) => o.key === selectedKey).value);
            //setSelectedTopic(options.find((o) => o.key === selectedKey).topic);
          } else {
            setInputValue("");
            //setSelectedTopic("");
          }
        }
      }
    }, [open, options, selectedKey, inputValue, onChange]);

    const onInputChange = (e) => { //updates the inputValue state whenever the value of the input field changes
      setInputValue(e.target.value);
    };

    const onInputClick = () => { //toggles the value of the open state between true and false each time the input element is clicked
      setOpen((prevValue) => !prevValue);
    };

    const onOptionSelected = (option) => { // handles the selection of an option
      onChange !== undefined && onChange(option.key);
      onChange !== undefined && setInputValue(option.value);
      //onChange !== undefined && setSelectedTopic(option.topic); //new
      //onChange !== undefined && setSelectedProbability(option.probability); //new
      setOpen(false);
    };

    const clearDropdown = () => {
      setInputValue("");
      onChange("");
    };

    return (
      <div className="dropdown-container" ref={ref}>
        <div className="input-container" onClick={onInputClick}>
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <div className="input-arrow-container">
            <i className="input-arrow" />
          </div>

          {selectedKey || inputValue ? (
            <div className="input-clean-container" onClick={clearDropdown}>
              x
            </div>
          ) : null}
        </div>
        <div className={`dropdown ${open ? "visible" : ""}`}>
          {options
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const v = item.value.toLowerCase();

              if (!searchTerm) return true;

              return v.startsWith(searchTerm);
            })
            .map((opt) => (
              <div
                key={opt.key}
                onClick={() => onOptionSelected(opt)}
                className="option"
                value={opt.key}
              >
                {opt.value}
              </div>
            ))}
        </div>
      </div>
    );
  }
);

export default withClickOutside(SelectComponent);
