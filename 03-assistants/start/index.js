import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function betterDocumentation() {
  const assistant = await openai.beta.assistants.create({
    name: "Jenny the Developer Documentation Champion",
    instructions:
      "You are the best at explaining technical concepts with little to know jargon when creting technical documentation. \
      You know all about JavaScript, React, Python, Node.js and every programming language.",
    model: "gpt-4o",
  });

  console.log(assistant);
}

// rl.question("What is your content request from Jenny? \n", async (question) => {
//   const thread = await openai.beta.threads.create();
//   const message = await openai.beta.threads.messages.create(thread.id, {
//     role: "user",
//     content: question,
//   });
//   console.log(message);
// });

rl.question("What is your content request from Jenny? \n", async (question) => {
  const run = await openai.beta.threads.createAndRun({
    assistant_id: "asst_zA1t0NPBbYJEW3BiJKEhpUUl",
    thread: {
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    },
  });
  // console.log(run);

  async function checkStatus() {
    let status = await openai.beta.threads.runs.retrieve(run.thread_id, run.id);
    if (status.status === "completed") {
      let messages = await openai.beta.threads.messages.list(run.thread_id);
      messages.data.forEach((msg) => {
        const content = msg.content[0].text.value;
        console.log(content);
      });
    } else {
      console.log("Run is not completed yet.");
    }
  }
  setTimeout(() => {
    checkStatus();
  }, 20000);
});

// betterDocumentation();
