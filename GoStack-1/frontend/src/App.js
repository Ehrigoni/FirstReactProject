import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App ({ title }) {
    const [projects, setProjects] = useState([]);
   
    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
            console.log(response.data);
        });
    }, []);

    async function handleAddProject() {
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);  
       
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Diego Fernandes",
            techs: ["Javascipt, MongoDb"]
        });

        const project = response.data; 

        setProjects([...projects, project]);
    };

    return (
        <>
           <Header title="Projects" />
           
           <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
           </ul>

           <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;