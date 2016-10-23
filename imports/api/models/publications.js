import { Match } from 'meteor/check';

export const publicationResponse = {
  title: true,
  author: true,
  publisher: true,
  type: true,
  year: true,
  length: true,
  isbn: true,
  barcode: true,
  subtitle: true,
  description: true,
  rating: true,
  tags: true,
  rent: true,
};

export const publicationUpsertRequest = {
  _id: Match.OneOf(String, null),
  title: String,
  author: String,
  publisher: String,
  type: String,
  year: String,
  length: String,
  isbn: String,
  barcode: String,
  subtitle: String,
  description: String,
};

export const publicationRemoveRequest = String;

export const publicationExtendRequest = String;

export const publicationReturnRequest = String;

export const publicationRateRequest = {
  publicationId: String,
  rating: Number,
};

export const publicationTagAddRequest = {
  publicationId: String,
  tagName: String,
};


export const publicationTagRemoveRequest = {
  publicationId: String,
  tagName: String,
};

export const publicationRentRequest = {
  publicationId: String,
  borrowerId: String,
};
