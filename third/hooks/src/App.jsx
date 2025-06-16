import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('Items changed:', items); 
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedItems = items.map((item, index) => 
        index === editIndex ? input : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, input]);
    }
    setInput('');
  }

  const editItem = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  }
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Items manager</h1>
      <form onSubmit={addItem}>
        <input type="text" placeholder='Enter the item' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button type="submit">{editIndex!==null?'Update': "Add"}</button>
      </form>
      <ul>
        {items.length === 0 ? (
          <li>No items found</li>
        ) : (
          items.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => editItem(index)}>Edit</button>
              <button onClick={() => deleteItem(index)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
