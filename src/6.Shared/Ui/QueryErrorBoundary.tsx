import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import BasicErrorFallback from "./BasicErrorFallback";

function QueryErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return <BasicErrorFallback resetErrorBoundary={resetErrorBoundary} />;
}

interface QueryErrorBoundaryProps {
  children: React.ReactNode;
}

export function QueryErrorBoundary({ children }: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={QueryErrorFallback} onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
