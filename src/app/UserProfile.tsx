import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      {/* Container do nome e foto */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <img
          src="/images/your-photo.jpg"
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-center text-3xl font-bold text-primary mb-2">John Doe</h1>
        <p className="text-center text-lg text-secondary">Baby Age Calculator</p>
      </div>
    </div>
  );
};

export default UserProfile;
