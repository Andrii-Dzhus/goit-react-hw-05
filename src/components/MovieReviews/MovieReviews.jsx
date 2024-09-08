import { useOutletContext } from "react-router-dom";

export default function Reviews() {
  const { reviews } = useOutletContext();

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
