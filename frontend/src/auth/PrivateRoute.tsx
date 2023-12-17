import React from "react";
import { useAuthContext } from "./AuthContext";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, isLoading } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return element;
  }

  return <Navigate to="/signin" />;
};
