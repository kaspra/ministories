# Ministories

Ministories is a story-sharing site built with Next.js, MongoDB, and TailwindCSS. It includes Next.js authentication functionality and allows users to sort stories based on tags.

## Features

- **Story Management:** Users can create, read, edit, and delete stories.
- **Tag Sorting:** Stories can be sorted based on tags.
- **Authentication:** User authentication using NextAuth.js.

## Technologies Used

- **Next.js:** For server-side rendering and routing.
- **MongoDB:** For scalable data storage.
- **TailwindCSS:** For styling the application.
- **NextAuth.js:** For authentication.

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kaspra/ministories.git
    cd ministories
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your MongoDB URI and NextAuth.js configuration:
    ```env
    MONGODB_URI =
    GOOGLE_ID = 
    GOOGLE_SECRET = 
    NEXTAUTH_URL = 
    NEXTAUTH_URL_INTERNAL = 
    NEXTAUTH_SECRET = 
    ```

4. Run the development server:
    ```sh
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Creating a Story

1. Sign in to your account.
2. Click the "New Story" button.
3. Enter the story details and tags.
4. Click "Save" to publish your story.

### Reading Stories

- Browse the main page to see all stories.
- Click on a story to read its full content.

### Editing a Story

1. Sign in to your account.
2. Go to your profile and click the "Edit" button next to the story you want to edit.
3. Update the story details and tags.
4. Click "Save" to update your story.

### Deleting a Story

1. Sign in to your account.
2. Go to your profile and click the "Delete" button next to the story you want to remove.

### Sorting Stories by Tags

- Use the tag filter on the main page to sort stories based on specific tags.

## Authentication

Ministories uses NextAuth.js for authentication. Users can sign in using various providers such as Google, GitHub, etc.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

