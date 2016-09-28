export function sanitizeISBN(isbn) {
  isbn = isbn.replace(/\s+/g, ''); // spaces
  isbn = isbn.replace(/-/g, ''); // hyphens

  return isbn;
};

export function isValidISBN(isbn) {
  return (isbn.length === 10 || isbn.length === 13);
};
