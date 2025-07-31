#!/usr/bin/env node

/**
 * Main script for Football Birthdays project
 */

function sayHello() {
  console.log("Hello from Football Birthdays!");
  console.log("This is a Next.js application with Supabase integration");
  console.log("Current date:", new Date().toLocaleString());
  console.log("Node.js version:", process.version);
  console.log("Platform:", process.platform);
  console.log("Architecture:", process.arch);
}

function showProjectInfo() {
  console.log("\n=== Project Information ===");
  console.log("Name: Football Birthdays");
  console.log("Framework: Next.js");
  console.log("Database: Supabase");
  console.log("Language: TypeScript");
  console.log("Package Manager: pnpm");
}

function showEnvironmentInfo() {
  console.log("\n=== Environment Information ===");
  console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
  console.log("CI:", process.env.CI || "false");
  console.log("GITHUB_ACTIONS:", process.env.GITHUB_ACTIONS || "false");
  
  if (process.env.GITHUB_ACTIONS === "true") {
    console.log("Running in GitHub Actions!");
    console.log("Workflow:", process.env.GITHUB_WORKFLOW);
    console.log("Job:", process.env.GITHUB_JOB);
  }
}

function main() {
  console.log("🚀 Starting Football Birthdays script...\n");
  
  sayHello();
  showProjectInfo();
  showEnvironmentInfo();
  
  console.log("\n✅ Script completed successfully!");
}

// Run the main function if this file is executed directly
if (require.main === module) {
  main();
}

// Export functions for use in other modules
module.exports = {
  sayHello,
  showProjectInfo,
  showEnvironmentInfo,
  main
}; 