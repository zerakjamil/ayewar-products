import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "logs", "inquiries.jsonl");

if (!fs.existsSync(logFile)) {
  console.log("No inquiries logged yet. (logs/inquiries.jsonl is empty)");
  process.exit(0);
}

const lines = fs.readFileSync(logFile, "utf-8").trim().split("\n").filter(Boolean);
console.log(`\n=== Logged Client Inquiries (${lines.length}) ===\n`);

lines.forEach((line, index) => {
  try {
    const data = JSON.parse(line);
    console.log(`[#${index + 1}] ID: ${data.id} | Date: ${data.timestamp}`);
    console.log(`     Client: ${data.name} <${data.email}> (Phone: ${data.phone || "N/A"})`);
    console.log(`     Scope: ${data.reason} | Budget: ${data.budget || "N/A"} | Timeline: ${data.timeline || "N/A"}`);
    console.log(`     Brief: ${data.message.replace(/\n/g, " ")}`);
    console.log("----------------------------------------------------------------------");
  } catch {
    console.log(`[Invalid Line ${index + 1}]: ${line}`);
  }
});
