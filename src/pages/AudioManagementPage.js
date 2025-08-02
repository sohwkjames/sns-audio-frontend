import React, { useEffect, useState } from 'react';
import { fetchAudios, uploadAudio } from '../api/audios';
import AudioRow from '../components/AudioRow';
const CATEGORY_OPTIONS = ['Vocal', 'Instrumental', 'Ambient'];

function AudioManagementPage() {
  const [audios, setAudios] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', description: '', file: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadAudios = async () => {
    try {
      const res = await fetchAudios();
      setAudios(res.data);
    } catch (err) {
      setError('Failed to load audios');
    }
  };

  useEffect(() => {
    loadAudios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.file) {
      setError('Title and audio file are required');
      return;
    }

    if (!CATEGORY_OPTIONS.includes(form.category)) {
      setError('Please select a valid category.');
      return;
    }

    const data = new FormData();
    data.append('title', form.title);
    data.append('category', form.category);
    data.append('description', form.description);
    data.append('audio', form.file);

    try {
      setLoading(true);
      await uploadAudio(data);
      setForm({ title: '', category: '', description: '', file: null });
      await loadAudios();
      setError('');
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Audio Management</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <h4>Upload New Audio</h4>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <hr />

      <h4>Your Audio Files</h4>
      {audios.length === 0 && <p>No audio uploaded yet.</p>}
      {audios.map((audio) => (
        <AudioRow 
          key={audio.audio_id} 
          title={audio.title}
          category={audio.category}
          description={audio.description}
          file_path={audio.file_path}
        />
        // <div key={audio.audio_id} style={{ marginBottom: '1.5em' }}>
        //   <strong>{audio.title}</strong>
        //   <p>{audio.category} — {audio.description}</p>
        //   <audio controls>
        //     <source src={`${process.env.REACT_APP_API_URL}/${audio.file_path}`} type="audio/mpeg" />
        //     Your browser does not support the audio element.
        //   </audio>
        // </div>
      ))}
    </div>
  );
}

export default AudioManagementPage;
