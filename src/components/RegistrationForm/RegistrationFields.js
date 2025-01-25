import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaGripVertical } from 'react-icons/fa';

const styles = {
  container: `
    .form-builder {
      padding: 2rem;
      max-width: 2400px;
      margin: 1rem auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #000;
      font-family: 'Poppins', sans-serif;
      margin-top: 20px;
    }

    .add-button {
      background: #028248;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .add-button:hover {
      background:rgb(59, 177, 124);
    }

    .questions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .question-card {
      background: white;
      border: 1px solid #e1e1e1;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      transition: box-shadow 0.3s ease, opacity 0.2s ease;
      height: fit-content;
    }

    .question-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .question-header {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
      width: 100%;
    }

    .input-field {
      width: 100%;
      padding: 10px;
      border: 1px solid #dcdde1;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    .input-field:focus {
      border-color: #028248;
      outline: none;
    }

    .select-field {
      padding: 10px;
      border: 1px solid #dcdde1;
      border-radius: 4px;
      background: white;
      width: 100%;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 1rem 0;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .options-container {
      margin-left: 0;
      margin-top: 0.75rem;
    }

    .option-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 1rem;
    }

    .icon-button {
      background: none;
      border: none;
      padding: 6px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-button:hover {
      background: #f5f6fa;
    }

    .icon-button.delete:hover {
      color: #e74c3c;
    }

    .add-option-button {
      background: none;
      border: none;
      color: #028248;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 4px;
      transition: background 0.3s ease;
    }

    .add-option-button:hover {
      background: #f5f6fa;
    }

    @media (max-width: 768px) {
      .questions-grid {
        grid-template-columns: 1fr;
      }
    }
  `
};

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
        {/* <FaGripVertical className="text-gray-400" /> */}
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
      <style>{styles.container}</style>
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