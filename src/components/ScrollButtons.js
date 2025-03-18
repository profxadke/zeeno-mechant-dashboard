import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll function
  const handleScroll = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg transition hover:bg-gray-800"
    >
      {isAtTop ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
    </button>
  );
};

export default ScrollButton;
