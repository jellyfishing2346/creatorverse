import React from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import './App.css';
import '@picocss/pico/css/pico.min.css'; // Import Pico CSS for styling
import socialMediaImage from '../public/social-media.avif'; // Importing the image for use in the app

function App() {
  let element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/new', element: <AddCreator /> },
    { path: '*', element: <div style={{padding: "2em"}}><h2>404 Not Found</h2></div> },
  ]);

  return (
    <div className="App">
      <header>
        <h1>Creatorverse</h1>
        <img src={socialMediaImage} alt="Social Media" className="header-image" />
        <p>Discover and manage your favorite content creators.</p>
        <nav>
          <Link to="/">View All Creators</Link>
          <Link to="/add">Add a Creator</Link>
        </nav>
      </header>
      {element}
    </div>
  );
}

export default App;