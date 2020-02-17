import React from 'react';
import { Audio } from 'svg-loaders-react'

const Loading: React.FC = () => {

    const timer = setTimeout(() => {
        console.log('This will run after 3 seconds')
    }, 5000)
    return (
        <Audio />

    )
}

export default Loading