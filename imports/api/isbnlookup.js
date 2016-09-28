import { check } from 'meteor/check';

import * as constants from '../constants.js';
import { sanitizeISBN, isValidISBN } from '../shared.js';


export const ISBNLookup = {
  apiKey: constants.googleAPIKey,
  basePath: 'https://www.googleapis.com/books/v1/volumes',

  queryISBNInfo: function(isbn) {
    check(isbn, String);
    isbn = sanitizeISBN(isbn);

    var deferred = $.Deferred();

    if (isValidISBN(isbn)) {
      $.ajax({
        url: this.basePath + '?q=' + isbn + '+isbn',
      })
      .done((res) => {
        if (res && res.items) {
          const match = this.getISBNMatch(res.items, isbn)

          if (match) {
            const lookupResult = {
              title: match.volumeInfo.title || null,
              subtitle: match.volumeInfo.subtitle || null,
              publisher: match.volumeInfo.publisher || null,
              year: match.volumeInfo.publishedDate || null,
              description: match.volumeInfo.description || null,
            };

            if (match.volumeInfo.authors) {
              lookupResult.author = match.volumeInfo.authors.join(', ');
            } else {
              lookupResult.author = null;
            }

            deferred.resolve(lookupResult);
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
};
