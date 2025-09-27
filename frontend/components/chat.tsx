"use client";
import { AnimatePresence, motion } from "framer-motion";
/* eslint-disable style/multiline-ternary */
import { Bot, MessageCircleX, SendIcon } from "lucide-react";
import React, { useState } from "react";
import Markdown from "react-markdown";

import { api } from "@/lib/api";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div
        className="w-8 h-8 border-4 border-indigo-200 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!query.trim())
      return;

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const apiResponse = await api.post("/suggest-route", { query: query.trim() });

      const data = await apiResponse.data;
      setResponse(data.response);
    }
    catch (err) {
      console.error("API call failed:", err);
      setError("Sorry, something went wrong. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResponse("");
    setError("");
  };

  return (
    <div className="font-sans antialiased">

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="launcher"
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
              variants={{
                initial: { opacity: 0, scale: 0.6 },
                animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25, delay: 0.5 } },
                exit: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open travel assistant"
            >
              <Bot />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="widget"
              className="w-[calc(100vw-32px)] sm:w-96 h-[70vh] max-h-[500px] bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              variants={{ initial: { opacity: 0, y: 50, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } }, exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.3 } } }}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Header */}
              <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground flex-shrink-0">
                <h2 className="text-lg font-semibold italic">BusKhu ;3</h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 cursor-pointer rounded-full hover:bg-background/20"
                  whileHover={{ rotate: 90 }}
                  aria-label="Close travel assistant"
                >
                  <MessageCircleX />
                </motion.button>
              </header>

              <main className="flex-grow p-5 overflow-y-auto bg-secondary text-secondary-foreground">
                {isLoading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <div className="text-center text-destructive">{error}</div>
                ) : response ? (
                  <div>
                    {/* {response.split("\n\n").map((paragraph, index) => ( */}
                    {/* // <p key={index} className="mb-4">{paragraph}</p> */}
                    <Markdown>{response}</Markdown>
                    {/* // ))} */}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Hello!</h3>
                    <p className="text-muted-foreground">How can I help you with your route today?</p>
                  </div>
                )}
              </main>

              <footer className="p-4 bg-secondary flex-shrink-0">
                {response || error
                  ? (
                      <Button
                        onClick={handleReset}
                        className="w-full"
                      >
                        Ask Another Question
                      </Button>
                    )
                  : (
                      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                        <Input
                          type="text"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="e.g., Mirpur 10 to Mirpur 12"
                          className="flex-grow p-2 border border-border rounded-lg focus:ring-2"
                          disabled={isLoading}
                        />
                        <Button
                          type="submit"
                          disabled={isLoading || !query.trim()}
                          aria-label="Send message"
                        >
                          <SendIcon />
                        </Button>
                      </form>
                    )}
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
