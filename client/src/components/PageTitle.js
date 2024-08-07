import React from 'react';

function PageTitle({title}) {
    return (
        <div>
            <h1 className='text-1xl text-white'>
                {title}
            </h1>
        </div>
    )
}

export default PageTitle;