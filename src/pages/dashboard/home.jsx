import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

export function Home() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [courtArticles, setCourtArticles] = useState([]);

  useEffect(() => {
    // Fetching court-related news from the News API
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=India+OR+constitution&language=en&sortBy=publishedAt&apiKey=c832f17b95224b6faf50c8eb5b1b2abe`
        );
        const data = await response.json();
        setNewsArticles(data.articles.slice(0, 3)); // Displaying top 3 articles
      } catch (error) {
        console.error("Error fetching court-related news:", error);
      }
    };

    // Fetching court/judiciary-related news for the lower cards
    const fetchCourtArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=court+OR+judiciary+OR+law+OR+legal&language=en&sortBy=publishedAt&apiKey=c832f17b95224b6faf50c8eb5b1b2abe`
        );
        const data = await response.json();
        setCourtArticles(data.articles.slice(0, 3)); // Displaying top 3 court-related articles
      } catch (error) {
        console.error("Error fetching court articles:", error);
      }
    };

    fetchNews();
    fetchCourtArticles();
  }, []);

  return (
    <div className="mt-12">
      {/* Court-related News API Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {newsArticles.length > 0 ? (
          newsArticles.map((article, index) => (
            <a href={article.url} target="_blank" rel="noopener noreferrer" key={index}>
              <Card
                className="border border-blue-gray-100 shadow-sm h-48" // Reduced height
                style={{
                  backgroundImage: `url(${article.urlToImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6 bg-black bg-opacity-50"
                >
                  <Typography
                    variant="h6"
                    color="white"
                    className="mb-2"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {article.title}
                  </Typography>
                </CardHeader>
                <CardBody className="pt-0 bg-black bg-opacity-50">
                  <Typography
                    as="span"
                    variant="small"
                    className="text-xs font-medium text-white"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {article.description}
                  </Typography>
                </CardBody>
              </Card>
            </a>
          ))
        ) : (
          <Typography
            as="span"
            variant="small"
            className="text-xs font-medium text-blue-gray-500"
          >
            Loading court-related news...
          </Typography>
        )}
      </div>

      {/* Court-related News API Cards (previously e-Courts) */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {courtArticles.length > 0 ? (
          courtArticles.map((article, index) => (
            <a href={article.url} target="_blank" rel="noopener noreferrer" key={index}>
              <Card
                className="border border-blue-gray-100 shadow-sm h-64" // Increased height
                style={{ backgroundImage: "none" }} // Removed background image
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 p-6"
                >
                  <Typography
                    variant="h6"
                    color="black"
                    className="mb-2"
                  >
                    {article.title || "No Title Available"}
                  </Typography>
                </CardHeader>
                <CardBody className="pt-0">
                  <Typography
                    as="span"
                    variant="small"
                    className="text-xs font-medium text-black"
                  >
                    {article.description || "No Description Available"}
                  </Typography>
                </CardBody>
              </Card>
            </a>
          ))
        ) : (
          <Typography
            as="span"
            variant="small"
            className="text-xs font-medium text-blue-gray-500"
          >
            Loading court articles...
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Home;