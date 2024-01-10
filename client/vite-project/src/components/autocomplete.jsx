import React, { useState } from "react";
import "./autocomplete.css";


const Autocomplete = (props) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const [names, setNames] = useState([{ name: '', code: '' }]);
  
  const onChange = e => {
    console.log(props.id)
    const { namelist } = props;
    console.log(namelist)
    setNames(namelist)

    const  suggestions  = namelist.map(item => item.name);
    console.log(suggestions)

    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value)
    console.log(input);
  };
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
    console.log(names)
    const selectedItem = names.find(item => item.name === e.currentTarget.innerText);
    console.log(selectedItem)
    if (selectedItem) {

      var itemcodeElm= document.getElementById("itemCode")
      itemcodeElm.value  = selectedItem.code
      console.log(itemcodeElm)
    }

  };
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active])
      
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };
const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  }
return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        id={props.id}
      />
      {renderAutocomplete()}
    </>
  );
}
export default Autocomplete;