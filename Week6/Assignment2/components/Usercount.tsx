import React from 'react';

interface UsercountProps {
  count: number;
}

const Usercount: React.FC<UsercountProps> = ({ count }) => {
  return (
    <div className="text-center my-4">
      <h2>User Count: {count}</h2>
    </div>
  );
};

export default Usercount;
