import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import PdfViewer from "./PdfViewer"; // Import the PDF Viewer component

const cases = [
  {
    title: "Navinchandra Dharmashibhai Doshi Vs Natvarlal And Co. (2000)",
    summary: "This case involves a Criminal Revision Application by accused No.2, challenging the judgment related to a dishonored cheque under Section 138 of the Negotiable Instruments Act, 1881...",
    pdfLink: "/pdf/navinchandra.pdf",
    keywords: ["criminal", "cheque dishonor", "negotiable instruments act", "revision application"]
  },
  {
    title: "Kailash Nathan Working For Gain At Ing Visya Bank Ltd. As Assistant Vice-President Vs The State Of Bihar And Another (2013)",
    summary: "Any of the Borrower or any one of more of them (in case of the Borrower being more than one person) fails to pay any sum due...",
    pdfLink: "/pdf/kailash.pdf",
    keywords: ["commercial", "loan", "borrower", "bank"]
  },
  {
    title: "Walford Transport Eastern India Ltd. Vs Commissioner Of Income Tax (1999)",
    summary: "The aforesaid submission is made on behalf of the respondents on the basis of the provisions of Section 4 of the Act and Rule 3...",
    pdfLink: "/pdf/walford.pdf",
    keywords: ["commercial", "tax", "income tax", "transport"]
  },
  // Add other cases here...
];

export function Notifications() {
  const [activeToggle, setActiveToggle] = useState("content1");
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleOpenPdf = (caseItem) => {
    setSelectedCase(caseItem);
  };

  // Handle input change for the search bar
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      // Filter case keywords based on search term
      const filteredSuggestions = cases.filter((caseItem) =>
        caseItem.keywords.some((keyword) =>
          keyword.toLowerCase().includes(value.toLowerCase())
        )
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    handleOpenPdf(suggestion); // Open the PDF when clicking a suggestion
    setSuggestions([]); // Hide suggestions after selecting one
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 flex justify-center space-x-4 border-b border-gray-300">
        <Button
          onClick={() => setActiveToggle("content1")}
          color={activeToggle === "content1" ? "blue" : "gray"}
        >
          Case Report
        </Button>
        <Button
          onClick={() => setActiveToggle("content2")}
          color={activeToggle === "content2" ? "blue" : "gray"}
        >
          Website
        </Button>
      </div>

      <div className="p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for case keywords..."
          className="w-full p-2 mb-4 border rounded"
        />
        {/* Suggestions List */}
        {suggestions.length > 0 && (
          <ul className="border rounded max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 p-4 flex">
        {activeToggle === "content1" ? (
          <div className="w-1/2 border p-4 rounded-lg bg-gray-100 space-y-4 overflow-y-auto">
            {searchTerm && suggestions.length > 0 ? (
              suggestions.map((caseItem, index) => (
                <div
                  key={index}
                  onClick={() => handleOpenPdf(caseItem)}
                  className="cursor-pointer hover:bg-blue-100 p-2 rounded"
                >
                  <Typography variant="h6" className="text-blue-600 underline">
                    {caseItem.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {caseItem.summary}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" className="text-gray-500">
                Start typing to search for case reports...
              </Typography>
            )}
          </div>
        ) : (
          <div className="w-1/2 border p-4 rounded-lg bg-gray-100 space-y-4 overflow-y-auto">
            {/* Content for Toggle Button 2 */}
            <ul className="list-disc pl-5">
              <li>
                <a
                  href="https://clc.gov.in/clc/acts-rules/contract-labour-regulation-abolition-act-1970"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contract Labour (Regulation & Abolition) Act, 1970 | Chief Labour ...
                </a>
              </li>
              <li>
                <a
                  href="https://gil.gujarat.gov.in/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gujarat Informatics Limited
                </a>
              </li>
              {/* Add more links as needed... */}
            </ul>
          </div>
        )}

        <div className="w-1/2 border p-4 rounded-lg bg-gray-50">
          {selectedCase ? (
            <PdfViewer pdfUrl={selectedCase.pdfLink} summary={selectedCase.summary} />
          ) : (
            <Typography variant="h6" className="text-gray-500">
              Select a case to view the PDF
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;