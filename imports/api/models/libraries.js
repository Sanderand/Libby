import { Match } from 'meteor/check';

export const libraryResponse = {
  _id: true,

  name: true,
  notes: true,
  organization: true,
  phone: true,
  email: true,
  address: true,

  hasPublicPage: true,
  publicId: true,
  nonAdminsCanAddUsers: true,

  rentDays: true,
  extendDays: true,
  maxExtends: true,
};

export const libraryUpsertRequest = {
  _id: Match.OneOf(String, null),
  name: String,
  notes: String,
  organization: String,
  phone: String,
  email: String,
  address: {
    street: String,
    postal_code: String,
    city: String,
  },
};

export const librarySetPublicPageRequest = Boolean;

export const librarySetRentDaysRequest = Number;

export const librarySetExtendDaysRequest = Number;

export const librarySetMaxExtendsRequest = Number;

export const librarySetMaxExtendsResponse = {
  maxExtends: true,
};

export const librarySetNonAdminAddUsersRequest = Boolean;

export const libraryUserAddRequest = {
  email: String,
  password: String,
  role: String,
};

export const libraryUserRemoveRequest = String;

export const libraryUserUpdateRequest = {
  _id: String,
  role: String,
};
