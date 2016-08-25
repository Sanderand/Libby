export const Books = {
  apiKey: '', // TODO
  basePath: 'https://www.googleapis.com/books/v1/volumes',

  queryISBNInfo: function(isbn) {
    var deferred = $.Deferred();

    if (this.isValidISBN(isbn)) {
      $.ajax({
        url: this.basePath + '?q=' + isbn + '+isbn',
      })
      .done((res) => {
        if (res.items && res.items[0] && res.items[0].volumeInfo) {
          deferred.resolve({
            title: res.items[0].volumeInfo.title || null,
            subtitle: res.items[0].volumeInfo.subtitle || null,
            author: res.items[0].volumeInfo.authors.join(', ') || null,
            publisher: res.items[0].volumeInfo.publisher || null,
            year: res.items[0].volumeInfo.publishedDate || null,
            description: res.items[0].volumeInfo.description || null,
          });
        } else {
          deferred.resolve(null);
        }
      })
      .fail((err) => {
        console.error('BOOK LOOKUP ERROR', err);
        deferred.resolve(null);
      });
    } else {
      deferred.resolve(null);
    }

    return deferred.promise();
  },

  isValidISBN: function(isbn) {
    return (isbn.length === 10 || isbn.length === 13);
  }
};
