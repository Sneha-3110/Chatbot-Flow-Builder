# 🤖 Chatbot Flow Builder

A **visual chatbot flow builder** built using **React**, **React Flow**, and **Vite**. This intuitive tool lets you design conversational flows by dragging, dropping, and connecting message nodes on a canvas — perfect for developers building rule-based chatbots or prototyping conversational UX.


---

## ✨ Features

- **🔧 Drag-and-Drop Builder** – Visually construct chatbot logic using a node-based interface.
- **🧱 Message Nodes** – Add, connect, and edit message blocks to define your chatbot’s behavior.
- **⚙️ Contextual Settings Panel** – Click any node to edit its message text.
- **🔗 Edge Validation** – Prevents multiple outgoing edges from a node to ensure clean, logical flows.
- **💾 Save & Validate** – Save your chatbot flow with built-in checks for incomplete or broken paths.
- **🧩 Modular & Extensible** – Easily add new node types to support rich message formats like images, buttons, etc.

---

## 🛠️ Tech Stack

| Technology    | Usage                     |
|---------------|---------------------------|
| **React**     | UI framework              |
| **React Flow**| Visual flow editor        |
| **Vite**      | Lightning-fast dev server |
| **CSS**       | Styling and layout        |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or newer)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chatbot-flow-builder.git
cd chatbot-flow-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to open the app in your browser.

---

## 🧑‍💻 Usage Guide

1. **Add Node**  
   Drag a `Message` node from the sidebar and drop it onto the canvas.

2. **Edit Node**  
   Click a node to open the Settings panel and modify its message content.

3. **Connect Nodes**  
   Click and drag from the node’s right handle to another node’s left handle to create an edge.

4. **Save Flow**  
   Click the `Save Changes` button. The console will show your flow data if it’s valid; errors will display otherwise.

---

## 📁 Project Structure

```bash
/src
├── /components
│   ├── /custom          # Custom React Flow node components
│   │   └── TextNode.jsx
│   ├── NodesPanel.jsx   # Right sidebar for adding new nodes
│   └── Settings.jsx     # Right sidebar for editing selected node
├── App.jsx              # Root component managing state and flow logic
└── index.css            # Global styles
```

