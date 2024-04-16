import React, { useContext } from "react";
import { useParams } from "react-router-dom";
export default function RyhmänOmaSivu() {
  const { idgroup, groupname } = useParams();
  return <div>RyhmänOmaSivu</div>;
}
