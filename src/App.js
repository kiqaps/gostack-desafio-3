import "./styles.css";

import React, { useEffect, useState } from "react";

import api from "./services/api";

let currentId = 1

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    (async () => {
      const response = await api.get('/repositories')
      const allRepositories = response.data
      setRepositories(allRepositories)
    })()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Titulo ' + (currentId++),
      url: 'url',
      techs: ['tech']
    })
    const createdRepository = response.data

    setRepositories(old => [...old, createdRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
