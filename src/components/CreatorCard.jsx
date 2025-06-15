// src/components/CreatorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
    return (
        <div className="creator-card">
            {creator.imageUrl && <img src={creator.imageUrl} alt={creator.name} />}
            <h3>{creator.name}</h3>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
                Visit Page
            </a>
            <div className="card-actions">
                <Link to={`/edit/${creator.id}`}>Edit</Link>
                <Link to={`/creator/${creator.id}`}>View Details</Link>
            </div>
        </div>
    );
};

export default CreatorCard;