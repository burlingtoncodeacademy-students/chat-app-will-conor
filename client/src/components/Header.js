import React from 'react'

/* header function */
function Header(props) {
    return (
        /* header text changes based on the props passed to it */
        <h1>{props.name}</h1>
    )
}

export default Header