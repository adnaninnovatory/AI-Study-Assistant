import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MCQEmptyState from "../MCQEmptyState";



const MCQPanel = () => {
  const [mcqs, setMcqs] = useState([]);
  const [count, setCount] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // 🧠 TEMP GENERATOR (UI ONLY)
  const handleGenerate = () => {
    if (!count || !difficulty) return;

    const dummyMCQs = Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      question: `Sample Question ${i + 1}: What is AI?`,
      options: [
        "A) Artificial Intelligence",
        "B) Automated Input",
        "C) Advanced Internet",
        "D) None",
      ],
      answer: "A",
    }));

    setMcqs(dummyMCQs);
  };

  return (
    <div className="space-y-6">

      {/* 🎛 CONTROLS */}
      <div className="flex flex-wrap gap-3 items-center">

        <Input
          placeholder="No. of MCQs"
          className="w-40"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <Select onValueChange={setDifficulty}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleGenerate}>
          Generate
        </Button>

      </div>

      {/*  EMPTY STATE */}
      {mcqs.length === 0 ? (
        <MCQEmptyState />
      ) : (
        <div className="space-y-4">

          {/* 📄 MCQ LIST */}
          {mcqs.map((mcq) => (
            <div
              key={mcq.id}
              className="p-4 border rounded-lg bg-gray-50"
            >

              <p className="font-medium">
                {mcq.question}
              </p>

              <div className="mt-2 space-y-1 text-gray-700">
                {mcq.options.map((opt, idx) => (
                  <p key={idx}>{opt}</p>
                ))}
              </div>

              <p className="text-green-600 mt-2">
                Answer: {mcq.answer}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MCQPanel;