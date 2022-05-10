import {useEffect, useState} from "react";

import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(value => value.json()).then(value => setUsers(value));
  }, []);

  return (
      <div>
        {users.map(user => <div key={user._id}>{JSON.stringify(user)}</div>)}
      </div>
  );
}

export default App;
