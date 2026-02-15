# Project Structure

## Backend
The backend is a Node.js application responsible for handling API requests, managing the database, and processing business logic.

- **config/**: Contains configuration files, typically for database connections and environment settings.
- **controllers/**: Contains the business logic for handling incoming requests.
    - `userController.js`: Manages user-related operations such as retrieving and updating user data.
- **middleware/**: Contains custom middleware functions for request processing (e.g., authentication, logging).
- **models/**: Defines the data structure and schema for the database (likely using Mongoose for MongoDB).
    - `User.js`: Defines the schema for user data.
- **routes/**: Defines the API endpoints and maps them to the corresponding controllers.
    - `userRoutes.js`: Defines routes for user-related API endpoints.
- **utils/**: Contains utility functions and helper modules used throughout the backend application.
- `index.js`: The main entry point for the backend server, setting up the server and connecting middleware and routes.

## frontend
The frontend is a React application (using Vite) that provides the user interface.

- **public/**: Contains static assets that are served directly, such as `index.html`, icons, and manifest files.
- **src/**: Contains the source code for the React application.
    - **assets/**: Stores static assets imported into components, such as images, fonts, and global stylesheets.
    - **components/**: Contains reusable UI components used across the application.
        - **blocks/**: Larger, complex UI blocks.
        - **custom/**: Custom-built components specific to the application's needs.
        - **features/**: Feature-specific components.
        - **layouts/**: Layout components defining the structure of pages.
        - **ui/**: Reusable UI primitives (likely from a library like shadcn/ui).
    - **contexts/**: Contains React Context definitions for global state management.
    - **hooks/**: Contains custom React hooks for reusing stateful logic.
    - **landing/**: Contains components and assets specific to the landing page.
    - **lib/**: Contains utility libraries and helper functions.
    - **pages/**: Contains the main page components corresponding to different routes in the application.
    - **services/**: Contains modules for handling API calls and external service integrations.
    - **ui/**: (Duplicate? Likely another folder for UI components, perhaps moved or structured differently).
    - **utils/**: Contains general utility functions used across the frontend.
    - `App.jsx`: The root component of the application, often setting up routes and global providers.
    - `main.jsx`: The entry point for React, rendering the `App` component into the DOM.
    - `index.css`: The global stylesheet for the application.
