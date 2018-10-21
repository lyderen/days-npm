import React from 'react';

export  default ({msg,cls}) => (
    <div className={`alert ${cls} alertTime`} role="alert">
 {msg}
</div>
);




