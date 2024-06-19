import React from 'react'

export default function HiredCardComponent({cardData}){
    return (
        <div className='hired-card-component'>
            <div className="icon">
                <div className="icon-container" style={{ color: cardData.color, backgroundColor: cardData.backgroundColor}}>
                    {React.createElement(cardData.icon)}
                </div>
            </div>
            <div className="title-paragraph">
                <div className='title'>
                    <h1>{cardData.title}</h1>
                </div>
                <div className="paragraph">
                    <p>{cardData.paragraph}</p>
                </div>
            </div>
        </div>
    )
}