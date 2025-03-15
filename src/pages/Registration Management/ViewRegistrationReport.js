import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { useToken } from '../../context/TokenContext';
import Modal from '../../components/modal';
import { MdDelete, MdEdit, MdVisibility } from 'react-icons/md';

const ViewRegistrationReport = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://auth.zeenopay.com/events/forms/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
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
  }, [token]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [message]);

  const deleteEvent = async () => {
    try {
      const response = await fetch(`https://auth.zeenopay.com/events/forms/${eventToDelete}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setEvents(events.filter((event) => event.id !== eventToDelete));
      setMessage({ type: 'success', text: 'Event deleted successfully' });
      setShowDeleteConfirmation(false); 
    } catch (err) {
      setMessage({ type: 'error', text: `Error: ${err.message}` });
      setShowDeleteConfirmation(false);
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
      const response = await fetch(`https://auth.zeenopay.com/events/forms/${updatedEvent.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
      setMessage({ type: 'success', text: '🎉 Event updated successfully' });
      handleCloseModal(); // Close the modal after successful update
    } catch (err) {
      setMessage({ type: 'error', text: `Error: ${err.message}` });
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
      <h3 style={styles.header}>List of Voting Events</h3>
      {message && (
        <div style={{ ...styles.message, backgroundColor: message.type === 'success' ? '#d4edda' : '#f44336' }}>
          {message.text}
        </div>
      )}
      <div style={styles.cardContainer}>
        {events.map((event) => {
          // Safely parse the `fields` property
          const parsedFields = typeof event.fields === 'string' ? JSON.parse(event.fields) : event.fields || {};
          return (
            <div
              key={event.id}
              style={styles.cardLink}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={styles.card}>
                <div style={styles.imageWrapper}>
                  {event.img ? (
                    <img src={event.img} alt={event.title || 'Event Image'} style={styles.image} />
                  ) : (
                    <div style={styles.noImage}>No Image Available</div>
                  )}
                </div>
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{event.title}</h2>
                  <div style={styles.buttonContainer}>
                    <Link to={`/viewreport/${event.id}`} style={styles.viewButton}>
                      <MdVisibility style={styles.icon} /> View Report
                    </Link>
                    <button onClick={() => handleEditClick(event)} style={styles.editButton}>
                      <MdEdit style={styles.icon} /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && selectedEvent && (
        <Modal onClose={handleCloseModal}>
          <h2>Edit Event</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateEvent(selectedEvent);
            }}
          >
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="submit" style={styles.updateButton}>
                Update Event
              </button>
              <button
                type="button"
                onClick={() => {
                  setEventToDelete(selectedEvent.id);
                  setShowDeleteConfirmation(true);
                }}
                style={styles.deleteButton}
              >
                Delete Event
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showDeleteConfirmation && (
        <Modal onClose={() => setShowDeleteConfirmation(false)}>
          <h2>Are you sure you want to delete this event?</h2>
          <div>
            <button onClick={deleteEvent} style={styles.confirmDeleteButton}>
              Yes, Delete
            </button>
            <button onClick={() => setShowDeleteConfirmation(false)} style={styles.cancelDeleteButton}>
              Cancel
            </button>
          </div>
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
  header: {
    marginLeft: '15px',
  },
  card: {
    width: '320px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    position: 'relative',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    padding: '20px',
    textAlign: 'center',
    opacity: 0,
    animation: 'fadeIn 1s forwards',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  viewButton: {
    padding: '10px 20px',
    backgroundColor: '#028248',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
    fontWeight: '600',
  },
  editButton: {
    padding: '10px 50px',
    backgroundColor: '#f1c40f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
  },
  icon: {
    marginRight: '10px',
  },
  updateButton: {
    padding: '12px 30px',
    backgroundColor: '#028248',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  deleteButton: {
    padding: '12px 30px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  confirmDeleteButton: {
    padding: '12px 30px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  cancelDeleteButton: {
    padding: '12px 30px',
    backgroundColor: '#7f8c8d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  message: {
    padding: '15px',
    margin: '15px 0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default ViewRegistrationReport;