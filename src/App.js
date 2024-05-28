import React from 'react';
import './css/App.css';
import Column from "./component/Column";

const App = () => {
    return (
        <div className="App">
            <Column state="PLANNED"/>
            <Column state="ONGOING"/>
            <Column state="DONE"/>
        </div>
    );
};

export default App;