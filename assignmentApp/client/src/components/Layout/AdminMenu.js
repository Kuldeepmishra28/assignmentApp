import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/AdminMenu.css";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center" style={{marginLeft:"20px"}} >
        <div className="list-group dashboard-menu">
          <h4 style={{fontSize:"37px"}}>Admin Panel</h4>
         
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
            style={{fontSize:"20px"}}
          >
            Add Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
            style={{fontSize:"20px"}}
          >
            Add Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
            style={{fontSize:"20px"}}
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
            style={{fontSize:"20px"}}
          >
            Placed Orders
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;

