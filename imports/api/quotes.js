export const Quotes = {
  quotes: [{
    quote: 'So many books, so little time.',
    author: 'Frank Zappa'
  }, {
    quote: 'A room without books is like a body without a soul.',
    author: 'Marcus Tullius Cicero'
  }, {
    quote: 'The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.',
    author: 'Jane Austen'
  }, {
    quote: 'Good friends, good books, and a sleepy conscience: this is the ideal life.',
    author: 'Mark Twain'
  }, {
    quote: 'Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.',
    author: 'Neil Gaiman'
  }, {
    quote: 'Outside of a dog, a book is man\'s best friend. Inside of a dog it\'s too dark to read.',
    author: 'Groucho Marx'
  }, {
    quote: 'I have always imagined that Paradise will be a kind of library.',
    author: 'Jorge Luis Borges'
  }, {
    quote: 'Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.',
    author: 'John Green'
  }, {
    quote: 'Never trust anyone who has not brought a book with them.',
    author: 'Lemony Snicket'
  }, {
    quote: 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
    author: 'Haruki Murakami'
  }, {
    quote: 'You can never get a cup of tea large enough or a book long enough to suit me.',
    author: 'C.S. Lewis'
  }, {
    quote: 'If one cannot enjoy reading a book over and over again, there is no use in reading it at all.',
    author: 'Oscar Wilde'
  }, {
    quote: 'I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.',
    author: 'Groucho Marx'
  }, {
    quote: 'There is no friend as loyal as a book.',
    author: 'Ernest Hemingway'
  }, {
    quote: 'It is what you read when you don\'t have to that determines what you will be when you can\'t help it.',
    author: 'Oscar Wilde'
  }, {
    quote: 'What really knocks me out is a book that, when you\'re all done reading it, you wish the author that wrote it was a terrific friend of yours and you could call him up on the phone whenever you felt like it. That doesn\'t happen much, though.',
    author: 'J.D. Salinger'
  }, {
    quote: 'Books are the ultimate Dumpees: put them down and they’ll wait for you forever; pay attention to them and they always love you back.',
    author: 'John Green'
  }, {
    quote: '′Classic′ - a book which people praise and don\'t read.',
    author: 'Mark Twain'
  }, {
    quote: 'One must always be careful of books," said Tessa, "and what is inside them, for words have the power to change us.',
    author: 'Cassandra Clare'
  }, {
    quote: 'If there\'s a book that you want to read, but it hasn\'t been written yet, then you must write it.',
    author: 'Toni Morrison'
  }, {
    quote: 'You have to write the book that wants to be written. And if the book will be too difficult for grown-ups, then you write it for children.',
    author: 'Madeleine L\'Engle'
  }, {
    quote: 'I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.',
    author: 'Jane Austen'
  }, {
    quote: '... a mind needs books as a sword needs a whetstone, if it is to keep its edge.',
    author: 'George R.R. Martin'
  }, {
    quote: 'The books that the world calls immoral are books that show the world its own shame.',
    author: 'Oscar Wilde'
  }, {
    quote: 'Be careful about reading health books. Some fine day you\'ll die of a misprint.',
    author: 'Markus Herz'
  }, {
    quote: 'Books are a uniquely portable magic.',
    author: 'Stephen King'
  }, {
    quote: 'I can never read all the books I want; I can never be all the people I want and live all the lives I want. I can never train myself in all the skills I want. And why do I want? I want to live and feel all the shades, tones and variations of mental and physical experience possible in my life. And I am horribly limited.',
    author: 'Sylvia Plath'
  }, {
    quote: 'Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.',
    author: 'Charles William Eliot'
  }, {
    quote: 'A great book should leave you with many experiences, and slightly exhausted at the end. You live several lives while reading.',
    author: 'William Styron'
  }, {
    quote: 'Only the very weak-minded refuse to be influenced by literature and poetry.',
    author: 'Cassandra Cl'
  }],

  getRandomQuote: function() {
    const numberOfQuotes = this.quotes.length;
    const randomIndex = Math.round(Math.random() * (numberOfQuotes - 1));
    return this.quotes[randomIndex];
  }
};
