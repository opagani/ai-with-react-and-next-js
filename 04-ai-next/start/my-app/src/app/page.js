"use client";

import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI "} {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder='Ask about the location'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
