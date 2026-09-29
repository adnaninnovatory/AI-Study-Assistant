import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SummaryEmptyState from "../SummaryEmptyState";



const SummaryPanel = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 TEMP GENERATE (UI ONLY)
  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setSummary({
        text: "Machine learning is a subset of AI that enables systems to learn from data without explicit programming.",
        points: [
          "Supervised Learning",
          "Unsupervised Learning",
          "Reinforcement Learning",
        ],
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">

      {/* 🔘 BUTTON */}
      {/* <Button onClick={handleGenerate}>
        Generate Summary
      </Button> */}

      {/* 🧠 EMPTY STATE */}
      {!summary && !loading && (
        <SummaryEmptyState handleClick={handleGenerate} />
      )}

      {/* ⏳ LOADING STATE */}
      {loading && (
        <Card className="p-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <p className="text-gray-400 mt-3">
            AI is analyzing your document...
          </p>
        </Card>
      )}

      {/* 📄 RESULT */}
      {summary && !loading && (
        <Card className="p-4 space-y-3">

          <p className="text-gray-700">
            {summary.text}
          </p>

          <ul className="list-disc ml-5 text-gray-600">
            {summary.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

        </Card>
      )}

    </div>
  );
};

export default SummaryPanel;