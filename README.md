# IntelliGrid

IntelliGrid is an AI-powered pricing grid generator that helps you create professional pricing tiers for your product or service using KendoReact components and OpenAI.

![IntelliGrid Preview](https://github.com/Ionfinisher/intelligrid/blob/main/public/og.png)

## Features

- 🤖 **AI-Powered Generation**: Uses OpenAI to create tailored pricing tiers based on your product information
- 🎨 **Beautiful UI**: Built with KendoReact components for a polished, professional look
- 📱 **Responsive Design**: Works on both desktop and mobile devices
- 💻 **Code Export**: Get ready-to-use React code for your pricing grid
- ⚡ **Fast & Modern**: Built with Next.js for optimal performance

## Getting Started

### Prerequisites

- Node.js 18.x or later
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Ionfinisher/intelligrid.git
cd intelligrid
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
OPENAI_PROJECT_KEY=your_openai_api_key_here
OPENAI_API_BASE_URL=https://api.openai.com/v1
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Fill out the configuration form with details about your product:

   - Product/Service Name
   - Industry
   - Product Description
   - Target Audience
   - Number of Pricing Tiers

2. Click "Generate Pricing Grid"

3. View your generated pricing grid in the Preview tab

4. Get the code for your pricing grid in the Code tab

5. Download or copy the code to use in your own projects

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [KendoReact](https://www.telerik.com/kendo-react-ui)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [OpenAI API](https://openai.com/)
- **TypeScript**: For type safety and better developer experience

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── config/          # Configuration files
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions and types
├── .env                 # Environment variables (create this)
└── example.env          # Example environment variables
```

## Key Components

- `PricingGenerator`: Main component that orchestrates the grid generation
- `ConfigurationForm`: Form for inputting product details
- `PricingGrid`: Displays the generated pricing tiers
- `PricingTierCard`: Individual pricing tier card
- `CodeDisplay`: Shows the generated React code

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Built by [Teddy ASSIH](https://www.linkedin.com/in/teddy-assih-b4204b254/)
