import React from "react";

const ProfileField = ({ label, value, className, ...props }) => {
  return (
    <div className={`profile-field ${className}`} {...props}>
      <label className="profile-label" style={{ fontWeight: "bold" }}>
        {label}:
      </label>
      <span className="profile-value" style={{ marginLeft: "10px" }}>
        {value}
      </span>
    </div>
  );
};

export default ProfileField;
