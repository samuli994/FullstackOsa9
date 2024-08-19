import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from './types';

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        setDiaries(response.data);
      })
      .catch(error => {
        console.error('Error fetching diaries:', error);
      });
  }, []);

  const addDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiary)
      .then(response => {
        setDiaries(diaries.concat(response.data));
        setNewDiary({
          date: '',
          weather: Weather.Sunny,
          visibility: Visibility.Great,
          comment: '',
        });
      })
      .catch(error => {
        console.error('Error adding diary:', error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewDiary({
      ...newDiary,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      
      <h2>Add a new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          Date: 
          <input 
            type="date" 
            name="date" 
            value={newDiary.date} 
            onChange={handleChange} 
          />
        </div>
        
        <div>
          <p>Weather:</p>
          {Object.values(Weather).map(weather => (
            <label key={weather}>
              <input 
                type="radio" 
                name="weather" 
                value={weather} 
                checked={newDiary.weather === weather}
                onChange={handleChange}
              />
              {weather}
            </label>
          ))}
        </div>
        
        <div>
          <p>Visibility:</p>
          {Object.values(Visibility).map(visibility => (
            <label key={visibility}>
              <input 
                type="radio" 
                name="visibility" 
                value={visibility} 
                checked={newDiary.visibility === visibility}
                onChange={handleChange}
              />
              {visibility}
            </label>
          ))}
        </div>
        
        <div>
          Comment: 
          <input 
            type="text" 
            name="comment" 
            value={newDiary.comment} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.length > 0 ? (
        <ul>
          {diaries.map(diary => (
            <li key={diary.id}>
              <h3>{diary.date}</h3>
              <p><strong>Weather:</strong> {diary.weather}</p>
              <p><strong>Visibility:</strong> {diary.visibility}</p>
              {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No diary entries available.</p>
      )}
    </div>
  );
};

export default App;
