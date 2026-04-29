interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No items found." }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-gray-400">
    <svg
      className="mb-4 h-12 w-12"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="text-lg">{message}</p>
  </div>
);

export default EmptyState;
