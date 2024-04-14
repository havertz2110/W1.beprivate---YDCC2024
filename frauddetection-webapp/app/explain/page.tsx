"use client"

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; // Import the Image component

export default function Explain() {
 const [explanation, setExplanation] = useState<string>('');
 const [images, setImages] = useState<string[]>([]);

 useEffect(() => {
    const receivedExplanation = localStorage.getItem('explaination');
    if (receivedExplanation) {
      setExplanation(receivedExplanation);
      localStorage.removeItem('explaination'); // Clear after use
    }

    // Fetch images from the server
    fetchImages();
 }, []);

 const fetchImages = () => {
    // Fetch images from your server or API
    // Replace these placeholders with actual image URLs
    const imagesData: string[] = [
      '/waterfall.png',
      '/summary.png'
    ];
    setImages(imagesData);
 };

 return (
    <main className="relative flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-2xl p-6 shadow-md rounded-md ">
        <h1 className="text-2xl font-bold mb-4 text-center">Explanation</h1>
        <div className="prose prose-lg mb-8">
          {/* Use react-markdown to render the explanation string as Markdown */}
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
        {/* Header for the images */}
        <h2 className="text-xl font-semibold mt-4 mb-2 text-center">Images</h2>
        {/* Display images side by side */}
        <div className="flex justify-center space-x-4">
          {images.map((image, index) => (
            <div key={index} className="w-1/2">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1200} // Increased width for a larger image
                height={800} // Adjusted height for maintaining aspect ratio
                objectFit="cover" // Adjust the objectFit as needed
                className="rounded-lg shadow-lg" // Additional styling for a more prominent look
              />
            </div>
          ))}
        </div>
      </div>
    </main>
 );
}
