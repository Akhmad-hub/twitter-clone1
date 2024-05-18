const formatHashtags = (text) => {
    const parts = text.split(/(#[\w-]+)/g); // Pisahkan berdasarkan hashtag
    return parts.map((part, index) =>
      part.startsWith("#") ? (
        <span key={index} className="text-blue-500">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  export default formatHashtags