import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import faqs from "../../faqs.json"; // Import the stored FAQs
import "./QuestionsPage.scss";
import arrowRed from "../assets/logos/arrow-back-red.svg";

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [aiAnswer, setAiAnswer] = useState(""); // Store AI-generated response
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // Filter FAQs based on search input
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  // Reset AI response when the user types
  useEffect(() => {
    setAiAnswer("");
  }, [search]);

  const handleSearch = async () => {
    if (filteredFAQs.length === 0 && search.trim() !== "") {
      setLoading(true);
      setAiAnswer("");

      try {
        const response = await axios.post("http://localhost:5000/ask-gemini", {
          question: search,
        });

        setAiAnswer(response.data.answer);
      } catch (error) {
        setAiAnswer("Sorry, I couldn't find an answer.");
      }

      setLoading(false);
    }
  };

  return (
    <div className="faq-container">
      <header className="header-ai">
        <div className="flex items-center">
          <button className="p-2">
            <img
              src={arrowRed}
              className=""
              onClick={() => navigate("/")}
            ></img>
          </button>
          <div className="ml-3">
            <h1 className="header-title">Frequently Asked Questions</h1>
            <p className="header-subtitle">
              Search for answers or ask the AI assistant:
            </p>
          </div>
        </div>
      </header>

      <div className="faq-list">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="question-text">{faq.question}</span>
                <i
                  className={`icon ${
                    openIndex === index
                      ? "fa-solid fa-minus"
                      : "fa-solid fa-plus"
                  }`}
                ></i>
              </button>
              {openIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <div className="faq-item">
            {loading ? (
              <p className="ai-response-text">Loading AI response...</p>
            ) : (
              aiAnswer && <p className="ai-response-text">{aiAnswer}</p>
            )}
          </div>
        )}
      </div>

      <div className="faq-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default FAQ;
