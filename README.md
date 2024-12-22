# Soma - Student Performance Analysis Platform

Soma is a web-based platform designed to streamline the process of analyzing student performance and providing feedback. Teachers and parents can use Soma to quickly assess academic progress, track performance metrics, and take action based on real-time insights. The platform is intuitive, allowing users to simply create an account and upload student details to view detailed performance analytics.

## Features

- **Real-time performance analytics**: View student performance data in real time to track academic progress.
- **User-friendly interface**: Simple and intuitive design for both teachers and parents to easily navigate the platform.
- **Secure login**: Different access levels for parents and admins, ensuring privacy and security of user data.
- **Detailed performance metrics and feedback**: In-depth insights into student performance, with personalized feedback and recommendations for improvement.

## Technologies Used

### Client-side

- **React**: A JavaScript library for building user interfaces, used for rendering dynamic content.
- **Vite**: A modern build tool that provides fast development and optimized production builds.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **React Router**: Used for navigating between different pages in the app.
- **Axios**: A promise-based HTTP client for making requests to the server.
- **Chart.js**: A JavaScript library used to display data visualizations, such as bar and line charts.
- **ApexCharts**: Another charting library to visualize performance data with interactive graphs.
- **Radix UI**: A library of accessible and unstyled UI components.

### Server-side

- **Python**: The backend language used to power the API.
- **Flask**: A micro web framework for Python, used for building the server-side application.
- **SQLAlchemy**: A SQL toolkit and Object Relational Mapper (ORM) for Python to interact with the PostgreSQL database.
- **Alembic**: A database migration tool for SQLAlchemy, allowing easy schema changes.
- **PostgreSQL**: A powerful, open-source relational database management system used to store the platform's data.

## Installation and Setup

### Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js and npm**: For managing JavaScript dependencies.
- **Python and pip**: For setting up the backend environment and managing Python dependencies.
- **PostgreSQL**: For hosting the relational database.

### Client-side Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/festus-sulumeti/Project_Soma.git
    ```

2. **Navigate to the client directory**:
    ```bash
    cd Project_Soma/client
    ```

3. **Install the necessary dependencies**:
    ```bash
    npm install
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:5173`.

### Server-side Setup

1. **Navigate to the server directory**:
    ```bash
    cd Project_Soma/server
    ```

2. **Create a virtual environment**:
    ```bash
    python -m venv venv
    ```

3. **Activate the virtual environment**:
    - On **Windows**:
        ```bash
        venv\Scripts\activate
        ```
    - On **macOS/Linux**:
        ```bash
        source venv/bin/activate
        ```

4. **Install the necessary dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5. **Set up the database**:
    Update the `sqlalchemy.url` in the `config.py` file with your PostgreSQL credentials.

6. **Run the database migrations**:
    ```bash
    alembic upgrade head
    ```

7. **Seed the database** (optional, for initial data setup):
    ```bash
    python seed.py
    ```

8. **Run the server**:
    ```bash
    python app.py
    ```

## Usage

- **Login as Parent**: Navigate to the "Login as Parent" page to access your child's academic performance.
- **Admin Login**: Admin users have access to the entire platform and can see detailed reports for all students.

## Contributing

We welcome contributions! To contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature-branch
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature-branch
    ```
5. **Open a pull request** from your forked repository to the main project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
