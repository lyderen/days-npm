import React from 'react';
import ReactDOM from 'react-dom';

const Info = () => (
    <div> 
      <h1>info</h1>
      <p>Your ditailes as u see!</p>
    </div>
);

const authentication = (WarppedComponent) => {
    return (props) => (
        <div>
         {!props.isAtuthenticeted && <p>this higher secret file dont shaere !</p>}
         <WarppedComponent />
        </div>
    );
}

const AdminInfo = authentication(Info);

ReactDOM.render(<AdminInfo isAtuthenticeted={true} />, document.getElementById('app'));