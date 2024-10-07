import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export function Profile() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);
  
      try {
        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),  // Send the user's input as 'question'
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.answer, sender: "bot" },  // Display the response from Flask
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "There was an error processing your request.", sender: "bot" },
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Network error. Please try again later.", sender: "bot" },
        ]);
      }
  
      setInput("");  // Clear the input field
    }
  };  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Bot Avatar and Title */}
      <div className="flex items-center justify-between bg-gray-900 text-white p-4">
        <div className="flex items-center gap-3">
          <Avatar
            src="/img/lingo.png" // Provide your bot's avatar image path here
            alt="Chatbot"
            size="md"
            variant="rounded"
          />
          <Typography variant="h5" className="font-bold">
            VidhAI Assistant
          </Typography>
        </div>
      </div>

      {/* Chat message area */}
      <div className="flex-grow overflow-y-auto bg-gray-100 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg shadow-md ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input field and send button */}
      <div className="flex items-center p-4 bg-white shadow-lg">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Allows sending message on Enter key press
          placeholder="Type your message..."
          className="flex-grow mr-4 border border-gray-300 focus:border-gray-500"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white"
          disabled={!input.trim()} // Disable button if input is empty
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Profile;