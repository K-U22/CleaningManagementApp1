import React from 'react'

const SmellStateButton = ({handleSmellButtonClick,
                          smellState,
                          }) => {
  return (
    <div>
        <button onClick={() => handleSmellButtonClick(0)} className={smellState[0] ? 'stinkButton': 'smellButton'}>臭い有り</button>
        <button onClick={() => handleSmellButtonClick(1)} className={smellState[1] ? 'stinkButton': 'smellButton'}>臭い無し</button>
      </div>
  )
}

export default SmellStateButton