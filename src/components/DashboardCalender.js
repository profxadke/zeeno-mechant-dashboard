import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import '../assets/dashboardmain.css';

function DashboardCalender() {
  const [date, setDate] = useState(new Date());
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 2;
  const navigate = useNavigate();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [formsRes, eventsRes, ticketsRes] = await Promise.all([
          fetch('https://auth.zeenopay.com/events/forms/').then(res => res.json()),
          fetch('https://auth.zeenopay.com/events/').then(res => res.json()),
          fetch('https://auth.zeenopay.com/events/ticket-categories/').then(res => res.json())
        ]);

        const formattedEvents = [
          ...formsRes.map(event => ({
            id: event.id,
            title: event.title,
            category: 'Registration Event',
            img: event.img || 'https://via.placeholder.com/60',
          })),
          ...eventsRes.map(event => ({
            id: event.id,
            title: event.title,
            category: 'Voting Event',
            img: event.img || 'https://via.placeholder.com/60',
          })),
          ...ticketsRes.map(event => ({
            id: event.id,
            title: event.name,
            category: 'Ticket Event',
            img: event.img || 'https://via.placeholder.com/60',
          }))
        ];

        setOngoingEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(ongoingEvents.length / eventsPerPage);
  const currentEvents = ongoingEvents.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage);

  const handleViewEvent = (event) => {
    if (event.category === 'Registration Event') {
      navigate(`/viewreport/${event.id}`);
    } else if (event.category === 'Voting Event') {
      navigate(`/eventreport/${event.id}`);
    }
    // Handle other categories if needed
  };

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="calendar-section"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h4>Zeeno Calendar</h4>
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={date} />
        </div>
      </motion.div>

      <div className="ongoing-events-section">
        <div className="events-header">
          <h4>Ongoing Events</h4>
          <div className="pagination-controls">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)}>
              &#8592;
            </button>
            <button disabled={currentPage === totalPages - 1} onClick={() => setCurrentPage(currentPage + 1)}>
              &#8594;
            </button>
          </div>
        </div>
        <motion.div 
          className="ongoing-cards"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          key={currentPage} 
        >
          {currentEvents.map((event, index) => (
            <motion.div 
              key={index} 
              className="ongoing-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={event.img} alt={event.title} className="events-image" />
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="category">{event.category}</p>
              </div>
              <button className="view-event-button" onClick={() => handleViewEvent(event)}>
                View Event <span className="arrow">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardCalender;