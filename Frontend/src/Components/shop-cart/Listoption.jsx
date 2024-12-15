import React, { useState } from "react";

const ShoppingLists = ({ onListChange }) => {
  const [lists, setLists] = useState(["Default List"]);
  const [currentList, setCurrentList] = useState("Default List");
  const [newListName, setNewListName] = useState("");

  const handleAddList = () => {
    if (newListName && !lists.includes(newListName)) {
      const updatedLists = [...lists, newListName];
      setLists(updatedLists);
      setCurrentList(newListName);
      onListChange(newListName);
      setNewListName("");
    }
  };

  const handleSelectList = (list) => {
    setCurrentList(list);
    onListChange(list);
  };

  return (
    <div className="cart-list-choose">
          <div className="choose-list-div">
            <label htmlFor="cart-list-choose-select">Shoping list</label>
            <select className="select-list"
              id="cart-list-choose-select"
              name="cart-list-choose-select"
              value={currentList}
              onChange={(e) => handleSelectList(e.target.value)}
            >
              {lists.map((list, index) => (
                <option key={index} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </div>
        <div className="list-creation">
          <div className="delete-add">
            <div className="list-add">
            <svg width="176px" height="166px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 10H10.5C11.3284 10 12 9.32843 12 8.5V4" stroke="#4a4a4a" stroke-width="1.5"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85355 3.73223C10.3224 3.26339 10.9583 3 11.6213 3H16.5C17.8807 3 19 4.11929 19 5.5V18.5C19 19.8807 17.8807 21 16.5 21H7.5C6.11929 21 5 19.8807 5 18.5V9.62132C5 8.95828 5.26339 8.3224 5.73223 7.85355L9.85355 3.73223ZM11.6213 5C11.4887 5 11.3615 5.05268 11.2678 5.14645L7.14645 9.26777C7.05268 9.36154 7 9.48871 7 9.62132V18.5C7 18.7761 7.22386 19 7.5 19H16.5C16.7761 19 17 18.7761 17 18.5V5.5C17 5.22386 16.7761 5 16.5 5H11.6213Z" fill="#4a4a4a"></path> <path d="M10 14.5H14M12 12.5V16.5" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>            </div>
            <div className="list-delete">
               <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z" fill="#CCCCCC"></path><path d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z" fill="#CCCCCC"></path><path d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z" fill="#211F1E"></path><path d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z" fill="#211F1E"></path></g></svg>
            </div>  
          </div>
            {/* <div className="cart-add-new-name">
              <input
                type="text"
                placeholder="New List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <button onClick={handleAddList}>Create List</button>
              </div> */}
        </div>
      
    </div>
  );
};

export default ShoppingLists;
