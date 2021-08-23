import React, { useState } from 'react'

export default function CobaReducer() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
     
    return (
        <div>
            <form>
                <input type="text" placeholder="email" />
                <input type="text" placeholder='username' />
                <input type="text" placeholder='password' />
            </form>
        </div>
    )
}
