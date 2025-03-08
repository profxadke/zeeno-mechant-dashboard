import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaGripVertical } from 'react-icons/fa';
import '../../assets/registrationfield.css';

const QuestionCard = ({ question, index, moveCard, totalQuestions, ...props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'QUESTION',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'QUESTION',
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const moveQuestion = (direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    moveCard(index, newIndex);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`question-card ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <div className="question-header">
            <input
              type="text"
              className="input-field"
              placeholder="Question Title"
              value={question.title}
              onChange={(e) => props.updateQuestion(index, 'title', e.target.value)}
            />
            <select
              className="select-field"
              value={question.type}
              onChange={(e) => props.updateQuestion(index, 'type', e.target.value)}
            >
              {props.fieldTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={question.isRequired}
            onChange={(e) => props.updateQuestion(index, 'isRequired', e.target.checked)}
          />
          Required
        </label>

        {(question.type === 'radio' || question.type === 'dropdown') && (
          <button className="add-option-button" onClick={() => props.addOption(index)}>
            <FaPlus size={14} />
            Add Option
          </button>
        )}
      </div>

      {(question.type === 'radio' || question.type === 'dropdown') && (
        <div className="options-container">
          {question.options?.map((option, optionIndex) => (
            <div key={optionIndex} className="option-item">
              <input
                type="text"
                className="input-field"
                value={option}
                placeholder={`Option ${optionIndex + 1}`}
                onChange={(e) => props.updateOption(index, optionIndex, e.target.value)}
              />
              <button
                className="icon-button delete"
                onClick={() => props.removeOption(index, optionIndex)}
              >
                <FaTrash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="action-buttons">
        <button
          className="icon-button"
          onClick={() => moveQuestion('up')}
          disabled={index === 0}
        >
          <FaArrowUp size={14} />
        </button>
        <button
          className="icon-button"
          onClick={() => moveQuestion('down')}
          disabled={index === totalQuestions - 1}
        >
          <FaArrowDown size={14} />
        </button>
        <button
          className="icon-button delete"
          onClick={() => props.removeQuestion(index)}
        >
          <FaTrash size={14} />
        </button>
      </div>
      
    </div>
  );
};

const RegistrationFields = () => {
  const [questions, setQuestions] = useState([]);
  
  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'image', label: 'Image Upload' }
  ];

  const moveCard = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= questions.length) return;
    
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, removed);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        title: '',
        type: 'text',
        isRequired: false,
        options: []
      }
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    if (!newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options = [];
    }
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className="title">Form Builder</h1>
      <div className="form-builder">
        <div className="header">
          <button className="add-button" onClick={addQuestion}>
            <FaPlus size={14} />
            Add Question
          </button>
        </div>

        <div className="questions-grid">
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              index={index}
              totalQuestions={questions.length}
              moveCard={moveCard}
              fieldTypes={fieldTypes}
              updateQuestion={updateQuestion}
              removeQuestion={removeQuestion}
              addOption={addOption}
              updateOption={updateOption}
              removeOption={removeOption}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default RegistrationFields;