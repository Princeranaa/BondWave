import React from "react";

function UserCard({ user }) {
  const { firstName, lastName, age, photoUrl, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="h-60 overflow-hidden">
        <img
          src={photoUrl}
          alt="photo"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
