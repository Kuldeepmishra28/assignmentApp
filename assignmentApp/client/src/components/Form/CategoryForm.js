import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="mb-6" style={{display:"inline-block",width:"250px"}}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" style={{marginLeft:"15px"}} className="btn btn-primary">
          Enter
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
