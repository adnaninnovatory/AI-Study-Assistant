const TypingIndicator = () => {
  return (
    <div className="flex gap-1 items-center p-3 bg-gray-100 rounded-lg w-fit">

      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />

    </div>
  );
};

export default TypingIndicator;