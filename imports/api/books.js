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
        if (res && res.items) {
          const match = this.getISBNMatch(res.items, isbn)

          if (match) {
            deferred.resolve({
              title: match.volumeInfo.title || null,
              subtitle: match.volumeInfo.subtitle || null,
              author: match.volumeInfo.authors.join(', ') || null,
              publisher: match.volumeInfo.publisher || null,
              year: match.volumeInfo.publishedDate || null,
              description: match.volumeInfo.description || null,
            });
          }
        }

        deferred.resolve(null);
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


  getISBNMatch: function(items, isbn) {
    return items.filter((item) => {
      if (item.volumeInfo && item.volumeInfo.industryIdentifiers) {
        for (var i = 0; i < item.volumeInfo.industryIdentifiers.length; i++) {
          if (item.volumeInfo.industryIdentifiers[i].identifier === isbn) {
            return true;
          }
        }
      }
    })[0];
  },

  isValidISBN: function(isbn) {
    return (isbn.length === 10 || isbn.length === 13);
  }
};
