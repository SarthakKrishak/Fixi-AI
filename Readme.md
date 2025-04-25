# AI Code Reviewer

AI Code Reviewer is a web-based application that leverages Artificial Intelligence (AI) to review and provide feedback on code. The application allows users to input their code, submit it for review, and view AI-generated suggestions for improvement. It also keeps a history of previous reviews for easy reference and management.

## Features

- **Code Editor**: A simple, interactive code editor that supports syntax highlighting for JavaScript (can be extended to support other languages).
- **AI Review**: Submit your code to get an AI-powered review, highlighting potential issues and providing suggestions for improvements.
- **Review History**: View and manage the history of previous code reviews.
- **Clear History**: Option to clear the review history when needed.

## Tech Stack

- **Frontend**: 
  - React.js for building the user interface.
  - React Simple Code Editor for the interactive code editor.
  - Prism.js for syntax highlighting.
  
- **Backend**: 
  - Node.js with Express for backend APIs.
  - AI models (like Gemini or other suitable models) for code review analysis.
  
- **Styling**: Custom CSS for styling the user interface.

- **Libraries**: 
  - Axios for API requests.
  - React Markdown for rendering review feedback.
  - Highlight.js for enhanced syntax highlighting.

## Prerequisites

Ensure that you have the following installed on your local machine before starting the setup:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git** (optional, for cloning the repository)

## Installation & Setup

Follow the steps below to set up and run the project locally:

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/your-username/ai-code-reviewer.git
```

### 2. Install Dependencies

Navigate to the project directory and install the dependencies for both frontend and backend.

-**Frontend Setup** 

Navigate to the frontend directory and install the dependencies:

```bash
cd ai-code-reviewer/frontend
npm install
```

-**Backend Setup** 

Navigate to the backend directory and install the dependencies:

```bash
cd ai-code-reviewer/backend
npm install
```

### 3. Configure Environment Variables

Navigate to the project directory and install the dependencies for both frontend and backend.

-**Example .env file:** 

```bash
GOOGLE_GEMINI_KEY=your_api_key_here
```

### 4. Start the Application

Run both the frontend and backend servers.

-**Frontend** 

Navigate to the frontend directory and run:

```bash
npm run dev
```

-**Backend** 

Navigate to the backend directory and run:

```bash
node server.js
```

### Contributing

We welcome contributions to the AI Code Reviewer project! If you'd like to contribute, please follow these steps:

- **Fork the repository.**: 
  - Create a new branch (git checkout -b feature-branch).
  - Make your changes and commit them (git commit -am 'Add new feature').
  - Push your branch (git push origin feature-branch).
  - Open a pull request to merge your changes.

### License
This project is licensed under the MIT License - see the LICENSE file for details.






