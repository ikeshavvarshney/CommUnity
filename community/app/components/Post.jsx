import React from 'react';

const Post = ({ title, author, date, imageUrl, content }) => {
  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-auto rounded-md mb-4" />
      )}
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{title}</h1>
      <div className="text-sm text-gray-600 mb-6">
        <span>By {author}</span> | <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      </div>
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </article>
  );
};

export default Post;