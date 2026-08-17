const projects = [
  {
    name: "MovieDB",
    number: "01",
    hoverimg:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1170&auto=format&fit=crop",
    videoSrc:
      "https://cdn.dribbble.com/userupload/25383613/file/large-7573762a9916c35515e07edf77dda214.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D",

    desc: `
A full-stack Movie Discovery and Recommendation platform built using the MERN stack and Machine Learning. 
It allows users to discover movies, search by title or actor, receive personalized recommendations, and manage their own movie collections.

Key Features:
• JWT Authentication with secure login and registration
• Search movies by title, actor, or keyword
• AI-powered movie recommendation system using Machine Learning
• Create and manage personal Watchlist and Favorites
• Detailed movie pages with ratings, genres, cast, trailers, and overview
• User profile with personalized movie collections
• Responsive Netflix-inspired UI for desktop and mobile
• Real-time movie data powered by TMDB API

Tech Stack:
React, Node.js, Express.js, MongoDB, Python, Scikit-learn, TMDB API, JWT, Axios
  `,

    linkUrl: "https://moviedb-sf9j.onrender.com/home",
    sourceCodeUrl: "https://github.com/adityadav002/MovieDB",

    screenshots: [
      "/images/moviedb/hero-banner.png",
      "/images/moviedb/home-page.png",
      "/images/moviedb/movie-grid.png",
      "/images/moviedb/movie-details.png",
      "/images/moviedb/recommendations.png",
      "/images/moviedb/watchlist.png",
      "/images/moviedb/favorites.png",
      "/images/moviedb/profile.png",
    ],

    problem: {
      title: "PROBLEM",
      description:
        "Movie enthusiasts often switch between multiple platforms to search movies, discover recommendations, save favorites, and manage watchlists. Existing solutions rarely combine personalized recommendations with a clean, responsive user experience.",
    },

    impact: {
      title: "IMPACT",
      description:
        "MovieDB delivers a centralized platform where users can discover movies, receive intelligent recommendations, organize personal collections, and enjoy a seamless experience across desktop and mobile devices.",
    },

    learned: [
      "Developing scalable full-stack applications using the MERN stack",
      "Building a Machine Learning recommendation engine with Python and Scikit-learn",
      "Implementing secure JWT authentication and protected routes",
      "Integrating third-party APIs (TMDB) for real-time movie data",
      "Managing complex application state and asynchronous API requests",
      "Designing responsive, modern user interfaces with React",
      "Optimizing backend performance and database queries",
      "Deploying and maintaining production-ready full-stack applications",
    ],
  },
  {
    name: "Creduce",
    number: "02",
    hoverimg:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1170&auto=format&fit=crop",
    videoSrc:
      "https://cdn.dribbble.com/userupload/25383613/file/large-7573762a9916c35515e07edf77dda214.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    desc: `
Creduce is a full-stack expense management platform that helps users track income, expenses, budgets, and financial insights in one place. It provides interactive analytics, secure authentication, multiple account management, and AI-powered spending predictions for smarter financial decisions.

Key Features:
• Secure JWT Authentication and user accounts
• Add, edit, and manage income & expenses
• Multiple account support (Cash, Bank, Wallet, etc.)
• Categories and custom subcategories
• Interactive dashboards and spending analytics
• Monthly trends and financial reports
• Machine Learning-based expense prediction
• Responsive UI optimized for desktop and mobile

Tech Stack:
React, Flask, Python, MySQL, Pandas, Scikit-learn, Chart.js, JWT, Bootstrap
  `,

    linkUrl: "https://creduce.onrender.com/",
    sourceCodeUrl: "https://github.com/adityadav002/Creduce",

    screenshots: [
      "/images/creduce/dashboard.png",
      "/images/creduce/add-expense.png",
      "/images/creduce/transaction-history.png",
      "/images/creduce/monthly-transactions.png",
      "/images/creduce/category-analysis.png",
      "/images/creduce/compare-months.png",
      "/images/creduce/filter-transactions.png",
      "/images/creduce/download-report.png",
      "/images/creduce/calculator.png",
      "/images/creduce/user-profile.png",
    ],

    problem: {
      title: "PROBLEM",
      description:
        "Many expense tracking applications only provide basic transaction recording without meaningful insights, flexible account management, or intelligent financial analysis. Users often need multiple tools to understand and manage their finances effectively.",
    },

    impact: {
      title: "IMPACT",
      description:
        "Creduce centralizes personal finance management by combining expense tracking, budgeting, visual analytics, and machine learning predictions into a single responsive platform, helping users make informed financial decisions.",
    },

    learned: [
      "Building scalable full-stack applications with Flask and React",
      "Designing relational databases using MySQL",
      "Implementing JWT authentication and secure user sessions",
      "Creating interactive dashboards and data visualizations",
      "Building Machine Learning models with Scikit-learn",
      "Data preprocessing and financial data analysis using Pandas",
      "Managing complex CRUD operations and database relationships",
      "Deploying production-ready web applications",
    ],
  },
  {
    name: "AlgoLab",
    number: "03",
    hoverimg:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1170&auto=format&fit=crop",
    videoSrc:
      "https://cdn.dribbble.com/userupload/25383613/file/large-7573762a9916c35515e07edf77dda214.mp4",
    posterSrc:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    desc: `
AlgoLab is a modern online coding platform designed for learning, practicing, and experimenting with programming languages. It features a VS Code-like editor powered by Monaco Editor, secure Docker-based code execution, multiple language support, and a curated programming resource hub.

Key Features:
• Monaco Editor with VS Code-like experience
• Secure code execution using isolated Docker containers
• Support for C, C++, Java, Python, JavaScript, and more
• Real-time code compilation and execution
• Interactive programming resource guide
• Responsive and modern developer-focused UI
• Multiple compiler environments in one platform
• Fast and scalable architecture

Tech Stack:
React, Node.js, Express.js, Monaco Editor, Docker, JavaScript, REST API
  `,

    linkUrl: "https://github.com/adityadav002/AlgoLab-CodeEditor",
    sourceCodeUrl: "https://github.com/adityadav002/AlgoLab-CodeEditor",

    screenshots: [
      "/images/algolab/HomePage.png",
      "/images/algolab/frontendCompiler.png",
      "/images/algolab/cppCompiler.png",
      "/images/algolab/allCompiler.png",
      "/images/algolab/resouceGuide.png",
    ],

    problem: {
      title: "PROBLEM",
      description:
        "Most online code editors either support limited programming languages, lack an IDE-like experience, or execute code without proper isolation, making them less suitable for learning and experimentation.",
    },

    impact: {
      title: "IMPACT",
      description:
        "AlgoLab provides a secure, responsive, and feature-rich coding environment where developers and students can write, compile, execute, and learn programming using multiple languages within a single platform.",
    },

    learned: [
      "Building a VS Code-like editor using Monaco Editor",
      "Running user code securely inside Docker containers",
      "Managing backend APIs for code compilation and execution",
      "Supporting multiple programming languages in one application",
      "Designing scalable full-stack React applications",
      "Handling asynchronous execution and compiler responses",
      "Optimizing developer experience with responsive UI design",
      "Deploying containerized full-stack applications",
    ],
  },
  {
    name: "DataScope",
    number: "04",

    videoSrc:
      "https://cdn.dribbble.com/userupload/25383613/file/large-7573762a9916c35515e07edf77dda214.mp4",

    posterSrc:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",

    desc: `
      DataScope is an end-to-end AutoML platform that transforms raw CSV datasets into production-ready machine learning models through an intelligent, guided workflow. It automates data preprocessing, exploratory analysis, feature engineering, algorithm recommendation, model training, evaluation, explainability, and model export—all without requiring users to write code.

      Key Features:
      • Intelligent dataset analysis and automatic problem type detection
      • Advanced data cleaning and preprocessing pipeline
      • Missing value, duplicate, outlier, and data quality handling
      • Automatic feature engineering and encoding
      • ML algorithm recommendation based on dataset characteristics
      • Interactive model training with configurable hyperparameters
      • Multi-model comparison and leaderboard
      • Feature importance and model explainability
      • Export trained models and preprocessing pipeline
      • Modern dashboard with real-time training logs and progress tracking

      Tech Stack:
      Python, Flask, Scikit-learn, XGBoost, Pandas, NumPy, Plotly, HTML, CSS, JavaScript, Bootstrap
  `,

    linkUrl: "https://github.com/adityadav002/CSV-Analyzer-And-ML-Model-Predicition",
    sourceCodeUrl: "https://github.com/adityadav002/CSV-Analyzer-And-ML-Model-Predicition",

    screenshots: [
      "/images/dataScope/loadDataset.png",
      "/images/dataScope/modelRecommendation.png",
      "/images/dataScope/Traning.png",
      "/images/dataScope/traningResult.png",
      "/images/dataScope/Feature.png",
      "/images/dataScope/Dashboard.png",
    ],

    problem: {
      title: "PROBLEM",
      description:
        "Building machine learning models typically requires extensive knowledge of data preprocessing, feature engineering, algorithm selection, hyperparameter tuning, and evaluation. Beginners often struggle with converting raw datasets into production-ready ML pipelines.",
    },

    impact: {
      title: "IMPACT",
      description:
        "DataScope simplifies the complete machine learning workflow by automatically cleaning datasets, recommending suitable algorithms, training multiple models, comparing their performance, explaining predictions, and exporting deployable ML packages through an intuitive no-code interface.",
    },

    learned: [
      "Designing a complete end-to-end AutoML workflow",
      "Building advanced data preprocessing and cleaning pipelines",
      "Implementing automatic machine learning problem detection",
      "Training and evaluating multiple ML algorithms simultaneously",
      "Developing model recommendation systems based on dataset characteristics",
      "Generating feature importance and model explainability reports",
      "Managing asynchronous ML training with real-time progress tracking",
      "Exporting production-ready machine learning models and preprocessing pipelines",
    ],
  },
  {
    name: "YouTube Video Analyzer",
    number: "05",

    // Use your dashboard screenshot as the project preview/poster.
    // Keep videoSrc empty until you have an actual project demo video.
    videoSrc: "",
    posterSrc: "/images/ytanalyzer/dashboard.png",

    desc: `
    YouTube Video Analyzer is a full-stack platform for discovering, analyzing, organizing, and downloading YouTube content through a centralized dashboard.

    It integrates the YouTube Data API and yt-dlp to collect detailed video and channel metadata, classify content into normal videos, Shorts, and live streams, and persist the analyzed data for later exploration.

    Key Features:
    • Search and analyze YouTube videos and channels
    • Extract detailed video metadata and statistics
    • Analyze channel information and uploaded content
    • Intelligent crawling of channel uploads
    • Separate classification of Videos, Shorts, and Live Streams
    • Paginated video and channel data management
    • Background job tracking for long-running crawl operations
    • Detailed video analysis and metadata views
    • YouTube video downloading with yt-dlp and FFmpeg
    • Persistent database storage for analyzed content
    • Dashboard with platform-wide analytics and statistics
    • Authentication and protected user-specific functionality
    • Download history and job management
    • Responsive React-based interface

    Tech Stack:
    React, Vite, Flask, Python, MySQL, YouTube Data API, yt-dlp, FFmpeg, Axios
  `,

    linkUrl: "https://github.com/adityadav002/Youtube-Analyzer",
    sourceCodeUrl: "https://github.com/adityadav002/Youtube-Analyzer",

    screenshots: [
      "/images/ytanalyzer/dashboard.png",
      "/images/ytanalyzer/search.png",
      "/images/ytanalyzer/channels.png",
      "/images/ytanalyzer/channels_details.png",
      "/images/ytanalyzer/videos.png",
      "/images/ytanalyzer/video_details.png",
      "/images/ytanalyzer/jobs.png",
      "/images/ytanalyzer/download.png",
      "/images/ytanalyzer/settings.png",
    ],

    problem: {
      title: "PROBLEM",
      description:
        "Analyzing YouTube content at scale often requires switching between multiple tools for searching videos, inspecting channel data, collecting metadata, monitoring statistics, and downloading content. Manual collection is time-consuming and makes it difficult to organize and analyze large amounts of YouTube data efficiently.",
    },

    impact: {
      title: "IMPACT",
      description:
        "YouTube Video Analyzer provides a centralized platform for discovering and analyzing YouTube content. It automates metadata extraction and channel crawling, separates videos into normal videos, Shorts, and live streams, stores results for later analysis, and provides dedicated dashboards, job tracking, detailed views, and downloading capabilities.",
    },

    learned: [
      "Building a production-oriented full-stack application using React, Flask, Python, and MySQL",
      "Integrating the YouTube Data API for structured video and channel metadata",
      "Using yt-dlp for reliable YouTube metadata extraction and video downloading",
      "Designing a channel crawler using the YouTube uploads playlist workflow",
      "Classifying YouTube content into videos, Shorts, and live streams",
      "Managing long-running crawling and download operations through background jobs",
      "Designing database schemas for persistent video, channel, job, and download data",
      "Implementing pagination, filtering, duplicate handling, and data persistence",
      "Building responsive dashboards for large-scale media data",
      "Integrating FFmpeg for media processing and download workflows",
      "Deploying a Flask and React application with a cloud-hosted MySQL database",
    ],
  }
];

export default projects;
