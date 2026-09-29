import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import ChatPanel from "@/components/workspace/ChatPanel";
import SummaryPanel from "@/components/workspace/SummaryPanel";
import MCQPanel from "@/components/workspace/MCQPanel";

const Workspace = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const document = {
    title: "Machine Learning Notes.pdf",
    type: "PDF",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white animate-fade-in p-6">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">

        <h1 className="text-2xl font-semibold text-gray-800">
          {document.title}
        </h1>

        <Badge className="text-indigo-600 bg-indigo-50 border border-indigo-100">
          {document.type}
        </Badge>

      </div>

      {/* TABS */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>

        {/* CENTERED TABS */}
        <TabsList className="grid grid-cols-3 w-[420px] mx-auto bg-white border border-gray-200 shadow-sm rounded-lg">

          <TabsTrigger
            value="chat"
            className="data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            💬 Chat
          </TabsTrigger>

          <TabsTrigger
            value="summary"
            className="data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            🧾 Summary
          </TabsTrigger>

          <TabsTrigger
            value="mcq"
            className="data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
          >
            🧪 MCQs
          </TabsTrigger>

        </TabsList>

        {/* CONTENT CARD */}
        <Card className="mt-6 p-5 border border-gray-100 shadow-sm rounded-xl bg-white overflow-hidden">

          <AnimatePresence mode="wait">

            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChatPanel />
              </motion.div>
            )}

            {activeTab === "summary" && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SummaryPanel />
              </motion.div>
            )}

            {activeTab === "mcq" && (
              <motion.div
                key="mcq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MCQPanel />
              </motion.div>
            )}

          </AnimatePresence>

        </Card>

      </Tabs>
    </div>
  );
};

export default Workspace;