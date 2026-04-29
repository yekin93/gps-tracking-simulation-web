interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-md bg-red-50 p-4 text-red-700 border border-red-200">
    <p className="font-medium">Something went wrong</p>
    <p className="mt-1 text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
