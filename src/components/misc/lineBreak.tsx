export default function LineBreak({ fancy = false }: { fancy?: boolean }) {
  return (
    <svg viewBox="0 0 1000 10" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="4.5" x2="995" y2="4.5" stroke="#8B7F3D" />
      {fancy && (
        <>
          <circle cx="995" cy="5" r="5" fill="#8B7F3D" />
          <circle cx="5" cy="5" r="5" fill="#8B7F3D" />
        </>
      )}
    </svg>
  );
}
