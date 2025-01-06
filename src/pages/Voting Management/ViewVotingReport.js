import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { useToken } from "../../context/TokenContext";
import Modal from '../../components/modal';

const ViewRegistration = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const { token } = useToken();

  useEffect(() => {
    // Fetch data from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.zeenopay.com/events/ongoing');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`https://api.zeenopay.com/events/${eventId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Remove the event from the state without fetching again
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event); 
    setShowModal(true);  
  };

  const handleCloseModal = () => {
    setShowModal(false);  
    setSelectedEvent(null);  
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`https://api.zeenopay.com/events/${updatedEvent.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      // Update the event in the state
      setEvents(events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ));
      handleCloseModal();  // Close the modal after updating
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p>Error: {error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1>List of Voting Events</h1>
      <div style={styles.cardContainer}>
        {events.map((event) => (
          <div
            key={event.id}
            style={styles.cardLink}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={styles.card}>
              <div style={styles.imageWrapper}>
                {event.img ? (
                  <img
                    src={event.img}
                    alt={event.title || 'Event Image'}
                    style={styles.image}
                  />
                ) : (
                  <div style={styles.noImage}>No Image Available</div>
                )}
              </div>
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{` ${event.title || 'No Title'}`}</h2>
                <p style={styles.cardDesc}>{event.desc || 'No Description Available'}</p>
                <div style={styles.buttonContainer}>
                  <Link to={`/eventreport/${event.id}`} style={styles.viewButton}>
                    Voting Report
                  </Link>
                  <button onClick={() => handleEditClick(event)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => deleteEvent(event.id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing event */}
      {showModal && selectedEvent && (
        <Modal onClose={handleCloseModal}>
          <h2>Edit Event</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateEvent(selectedEvent);  // Submit updated event
          }}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={selectedEvent.title}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={selectedEvent.desc}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, desc: e.target.value })}
              />
            </div>
            <div>
              <label>Image URL</label>
              <input
                type="text"
                value={selectedEvent.img}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, img: e.target.value })}
              />
            </div>
            <div>
              <label>Final Date</label>
              <input
                type="datetime-local"
                value={selectedEvent.finaldate}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, finaldate: e.target.value })}
              />
            </div>
            <button type="submit">Update Event</button>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    margin: '20px 0',
  },
  cardLink: {
    textDecoration: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  card: {
    width: '300px',
    border: '1px solid #e1e1e1',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    padding: '20px',
    textAlign: 'center',
  },
  cardContent: {
    paddingTop: '10px',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  noImage: {
    color: '#7a7a7a',
    fontSize: '14px',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewButton: {
    padding: '10px 20px',
    backgroundColor: '#1890ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#FFA500',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ViewRegistration;
