import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ pdfUrl, pdfSummary1 }) => {
  // State to manage the current view: 'pdf', 'summary', or 'audio'
  const [currentView, setCurrentView] = useState('pdf');
  console.log(pdfUrl)
  const [selectedIndex, setSelectedIndex] = useState(0); // Default to the first language

  const handleChange = (event) => {
    setSelectedIndex(event.target.value); // Update selected index
  };
  const languageNames = ['English', 'हिंदी', 'தமிழ்']; 

 


  // pdfSummary ="Here’s a generated summary based on the provided text:\nSummary: This case pertains to a Criminal Revision Application filed by Accused No.2, who is contesting a court judgment regarding the dishonoring of a cheque. The legal matter revolves around Section 138 of the Negotiable Instruments Act, 1881, which deals with the legal consequences and penalties related to bounced cheques, including criminal liability for the defaulter.\nThis encapsulates the key points and keeps the context of the legal dispute intact. Let me know if you'd like further elaboration."
     const pdfSummary = [
  "Here’s a generated summary based on the provided text:\nSummary: This case pertains to a Criminal Revision Application filed by Accused No.2, who is contesting a court judgment regarding the dishonoring of a cheque. The legal matter revolves around Section 138 of the Negotiable Instruments Act, 1881, which deals with the legal consequences and penalties related to bounced cheques, including criminal liability for the defaulter.\nThis encapsulates the key points and keeps the context of the legal dispute intact. Let me know if you'd like further elaboration.",
  "सारांश: यह मामला आरोपी नंबर 2 द्वारा दायर किए गए एक आपराधिक संशोधन आवेदन से संबंधित है, जो एक चेक के अपमानित होने के संबंध में एक अदालत के निर्णय का विरोध कर रहा है। यह कानूनी मामला भारतीय हस्तांतरण अधिनियम, 1881 की धारा 138 के चारों ओर घूमता है, जो बाउंस किए गए चेक के संबंध में कानूनी परिणामों और दंडों से संबंधित है, जिसमें डिफाल्टर के लिए आपराधिक जिम्मेदारी भी शामिल है।यह प्रमुख बिंदुओं को संक्षिप्त करता है और कानूनी विवाद के संदर्भ को बरकरार रखता है। यदि आप और विस्तार में जानना चाहते हैं, तो बताएं।", // Hindi
  "சுருக்கம்: இது நாயக்கர் எண் 2 அவர்களால் தாக்கல் செய்யப்பட்ட ஒரு குற்றம் திருத்த விண்ணப்பத்திற்கான வழக்கே, இது ஒரு செக் அங்கீகாரம் தொடர்பான நீதிமன்றத்தின் தீர்மானத்தை எதிர்க்கிறது. இது இந்திய மாற்று சட்டம், 1881ல் உள்ள 138வது பிரிவுக்கு சார்ந்த சட்டப்பூர்வமான விவகாரம், இது பவுன்ஸ் செய்யப்பட்ட செக்குகளுக்கான சட்டத் தொடர்பான விளைவுகள் மற்றும் தண்டனைகளைப் பற்றிய விவகாரம் ஆகும், இதில் தவறியவருக்கான குற்றவியல் பொறுப்பும் உள்ளடக்கம் ஆகிறது.இது முக்கியமான அம்சங்களைச் சுருக்கமாக கூறுகிறது மற்றும் சட்டப் போராட்டத்தின் உள்ளடக்கத்தை நிலைத்த holds. நீங்கள் மேலும் விவரிக்க விரும்பினால், தயவுசெய்து தெரியப்படுத்தவும்..", // Tamil
  // Add more languages as needed
];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
    width: '100%', // Full width of the container
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    position: 'relative',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const fullscreenButtonStyle = {
    position: 'absolute',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#007bff',
  };

  const viewerContainerStyle = {
    flex: 1,
    overflow: 'auto', // Enable scrolling if needed
  };

  const viewerStyle = {
    height: '100%',
    width: '100%',
    overflow: 'hidden', // Ensure the viewer fills the container
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    fontSize: '16px',
    lineHeight: '1.6',
  };

  const handleViewPdf = () => {
    setCurrentView('pdf');
  };

  const handleSummarization = () => {
    setCurrentView('summary');
  };

  const handleAudio = () => {
    setCurrentView('audio');
  };

  const handleFullScreen = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(pdfSummary[selectedIndex]);
      speech.lang = 'en-US'; // You can set the language here
      speech.rate = 1; // Set the speed of speech
      window.speechSynthesis.speak(speech);
    } else {
      alert('Text-to-Speech is not supported in this browser.');
    }
  };

  const stopTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
    }
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button onClick={handleViewPdf} style={buttonStyle}>
          View PDF
        </button>
        <button onClick={handleSummarization} style={buttonStyle}>
          Summarization
        </button>
        <button onClick={handleAudio} style={buttonStyle}>
          Audio
        </button>
        {/* Fullscreen button */}
        <button onClick={handleFullScreen} style={fullscreenButtonStyle} title="Open in Full Screen">
          [ ]
        </button>
      </div>
      <div style={viewerContainerStyle}>
        {currentView === 'pdf' && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={viewerStyle}>
              <Viewer fileUrl={pdfUrl} />
            </div>
          </Worker>
        )}
        {currentView === 'summary' && (
          <div style={viewerStyle}>
           <select onChange={handleChange} value={selectedIndex}>
        {languageNames.map((language, index) => (
          <option key={index} value={index}>
            {language}
          </option>
        ))}
      </select>

      {/* Display the selected summary */}
      <p>{pdfSummary[selectedIndex]}</p>
          </div>
        )}
         {currentView === 'audio' && (
        <div style={viewerStyle}>
          <h2>Audio of the PDF</h2>
          <p>Audio playback feature will be implemented here.</p>
          
          {/* Text-to-Speech button */}
         {/* Play Text-to-Speech Button */}
         <button onClick={handleTextToSpeech} style={buttonStyle}>
              ▶️ Play    
            </button>

            {/* Stop Text-to-Speech Button */}
            <button onClick={stopTextToSpeech}  style={{ ...buttonStyle, marginLeft: '40px' }}>
              ⏸️ Stop
            </button>
         

          {/* Example of a simple audio player */}
          {/* <audio controls>
            <source src="path-to-audio-file.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio> */}
        </div>
      )}
      </div>
    </div>
  );
};

export default PdfViewer;