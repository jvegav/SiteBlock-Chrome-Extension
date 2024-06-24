import React, { useState } from "react";

export default function Form({ addURL }) {
  
    const [newURL, setNewURL] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        addURL(newURL);
        setNewURL("")
    }

  return (
    <div className="pb-8 pt-7">
      <p className="text-sm font-bold font-family-inherit pb-3 justify-items-start">
        {" "}
        Write the URL ('youtube.com')
      </p>
      <form id="blockForm" onSubmit={handleSubmit}>
        <div className="pb-4">
          <input
            value={newURL}
            type="text"
            id="url"
            onChange={(e) => setNewURL(e.target.value)}
            placeholder="URL Here"
            required
            className="justify-center items-center text-center rounded-lg h-10 w-full "
          />
        </div>

        <button className="button-3" type="submit">
          Add URL
        </button>
      </form>
    </div>
  );
}
