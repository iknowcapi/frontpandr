import React, { useState } from 'react';
import { Download, Loader2, Zap } from 'lucide-react';

const API_URL = 'https://deadpandr.onrender.com';

function App() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Default');
  const [outputType, setOutputType] = useState('One-liners');
  const [transitionType, setTransitionType] = useState('None');
  const [madness, setMadness] = useState(0.5);
  const [darkness, setDarkness] = useState('meh');
  const [numJokes, setNumJokes] = useState(5);
  const [jokes, setJokes] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const madnessLabels = {
    0.1: 'HOA meeting',
    0.2: 'golf',
    0.3: 'Steven Seagal movies',
    0.4: 'creative writing class',
    0.5: 'moderately creative',
    0.6: 'very creative',
    0.7: 'acid trip',
    0.8: 'mild schizophrenia',
    0.9: 'full schizophrenia',
    1.0: 'maximum chaos'
  };

  const darknessLevels = [
    'clean room',
    "child's birthday party",
    'meh',
    'PG-13 movies',
    'the news',
    'Tom and Colin Hanks',
    'Jeffrey Dahmer',
    'Catholic Church'
  ];

  const getMadnessLabel = (value) => {
    const closest = Object.keys(madnessLabels).reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    return madnessLabels[closest];
  };

  const handleGenerate = async () => {
    setLoading(true);
    setStatus('');
    setJokes([]);

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          output_type: outputType,
          transition_type: outputType === 'Routines' ? transitionType : null,
          madness,
          darkness,
          num_jokes: numJokes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.detail || 'Error generating jokes');
      } else {
        setJokes(data.jokes);
        setStatus('Jokes generated successfully!');
      }
    } catch (error) {
      setStatus('Failed to connect to API. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (format) => {
    if (jokes.length === 0) {
      setStatus('No jokes to save! Generate some first.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jokes, format })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `deadpandr_jokes.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setStatus(`Saved as ${format.toUpperCase()}`);
      } else {
        setStatus('Failed to save file');
      }
    } catch (error) {
      setStatus('Error saving file');
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-8 relative"
      style={{
        backgroundImage: 'url(/logo512.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay to make content readable */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center py-8">
            <h1 className="text-6xl font-black mb-2">
              <span className="text-gray-100">dead</span>
              <span className="text-pink-500">pandr</span>
            </h1>
            <p className="text-gray-400 text-lg">Dark Comedy Generator</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-pink-400">Settings</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-gray-900/90 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="What shall we joke about?"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-gray-900/90 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option>Default</option>
                  <option>Absurdist</option>
                  <option>Cynical</option>
                  <option>Gallows</option>
                  <option>Nihilistic</option>
                  <option>Sarcastic</option>
                  <option>Surreal</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Output Type</label>
                <select
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value)}
                  className="w-full bg-gray-900/90 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option>One-liners</option>
                  <option>Routines</option>
                  <option>Punchlines</option>
                  <option>Random Jokes</option>
                </select>
              </div>

              {outputType === 'Routines' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-300">Transition Type</label>
                  <select
                    value={transitionType}
                    onChange={(e) => setTransitionType(e.target.value)}
                    className="w-full bg-gray-900/90 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option>None</option>
                    <option>False Segue</option>
                    <option>Thematic</option>
                    <option>Absurd Thematic</option>
                    <option>Self-aware</option>
                    <option>Random</option>
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Madness: <span className="text-pink-400">{getMadnessLabel(madness)}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={madness}
                  onChange={(e) => setMadness(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Darkness Level</label>
                <select
                  value={darkness}
                  onChange={(e) => setDarkness(e.target.value)}
                  className="w-full bg-gray-900/90 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {darknessLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Number of Jokes: <span className="text-pink-400">{numJokes}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={numJokes}
                  onChange={(e) => setNumJokes(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Generate Jokes
                  </>
                )}
              </button>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleSave('txt')}
                  disabled={jokes.length === 0}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Save TXT
                </button>
                <button
                  onClick={() => handleSave('pdf')}
                  disabled={jokes.length === 0}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Save PDF
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/90 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-700 min-h-[500px]">
              <h2 className="text-xl font-bold mb-4 text-pink-400">Output</h2>
              
              <div className="bg-gray-900/90 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto border border-gray-700">
                {jokes.length > 0 ? (
                  <div className="space-y-4">
                    {jokes.map((joke, index) => (
                      <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0">
                        <span className="text-pink-400 font-bold">{index + 1}.</span>
                        <p className="text-gray-200 mt-1 leading-relaxed">{joke}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p className="text-center">
                      Your dark comedy masterpieces will appear here...
                      <br />
                      <span className="text-sm">If you dare to generate them.</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {status && (
              <div className={`rounded-lg p-4 ${status.includes('Error') || status.includes('Failed') || status.includes('No jokes') ? 'bg-red-900/30 border border-red-700' : 'bg-green-900/30 border border-green-700'}`}>
                <p className="text-sm">{status}</p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 text-center text-gray-500 text-sm">
          <p>Powered by AI that probably needs therapy</p>
        </div>
      </div>
    </div>
  );
}

export default App;
