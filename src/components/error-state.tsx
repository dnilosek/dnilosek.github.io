import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "Failed to load content. Please try again.", 
  onRetry 
}) => {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col items-center justify-center py-16">
        <Icon icon="lucide:alert-circle" className="h-12 w-12 text-danger" />
        <p className="mt-4 text-center text-default-700">{message}</p>
        {onRetry && (
          <Button 
            color="primary" 
            variant="flat" 
            className="mt-6"
            startContent={<Icon icon="lucide:refresh-cw" />}
            onPress={onRetry}
          >
            Retry
          </Button>
        )}
      </CardBody>
    </Card>
  );
};
