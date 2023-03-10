import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundGIF from '../../assets/NotFound.gif';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img src={NotFoundGIF} alt="not found" />
          <h1 className="text-3xl font-bold py-4">Page is not found!</h1>
          <button
            className="bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
