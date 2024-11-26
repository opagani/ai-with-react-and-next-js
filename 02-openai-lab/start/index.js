import OpenAI from "openai";

const openai = new OpenAI();

// Create a prompt that generates questions for a job interview
// Ask for 3 interview questions for a React developer
// Extra Credit: Make this a template to make this dynamic for any kind of dev

async function jobInterview(language) {
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You will be asked to create job interview questions.",
      },
      {
        role: "user",
        content: `Give me 3 interview questions for a ${language} developer`,
      },
    ],
    model: "gpt-4o",
    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
}

jobInterview("JavaScript");
