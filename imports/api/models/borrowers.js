import { Match } from 'meteor/check';

export const borrowerResponse = {
  first_name: true,
  last_name: true,
  email: true,
  phone: true,
  notes: true,
  address: true,
};

export const borrowersRemoveRequest = String;

export const borrowersUpsertRequest = {
  _id: Match.OneOf(String, null),
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  notes: String,
  address: {
    street: String,
    postal_code: String,
    city: String,
  },
};
