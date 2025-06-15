import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css'; // For basic styling

const ViewCreator = () => {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }
                setCreator(data);
            } catch (err) {
                setError('Failed to fetch creator details: ' + err.message);
                console.error('Error fetching creator:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCreator();
    }, [id]);

    const handleDelete = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }
            alert('Creator deleted successfully!');
            navigate('/'); // Redirect to the homepage after deletion
        } catch (err) {
            alert('Error deleting creator: ' + err.message);
            console.error('Error deleting creator:', err);
        }
    };

    if (loading) return <p>Loading creator details...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!creator) return <p>Creator not found.</p>;

    return (
        <div className="view-creator">
            {creator.imageUrl && <img src={creator.imageUrl} alt={creator.name} className="creator-detail-image" />}
            <h2>{creator.name}</h2>
            <p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                    {creator.url}
                </a>
            </p>
            <p>{creator.description}</p>
            <div className="actions">
                <Link to={`/edit/${creator.id}`} className="button">
                    Edit Creator
                </Link>
                <button onClick={() => setShowConfirm(true)} className="button delete-button">
                    Delete Creator
                </button>
            </div>
            {showConfirm && (
                <div className="custom-confirm-dialog">
                    <div className="custom-confirm-content">
                        <p>Are you sure you want to delete this creator?</p>
                        <button onClick={() => { setShowConfirm(false); handleDelete(); }} className="button delete-button">
                            Yes, Delete
                        </button>
                        <button onClick={() => setShowConfirm(false)} className="button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCreator;