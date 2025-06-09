import React from "react";
import { Card, CardBody, Spinner } from "@heroui/react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading content..." }) => {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col items-center justify-center py-16">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-center text-default-500">{message}</p>
      </CardBody>
    </Card>
  );
};
