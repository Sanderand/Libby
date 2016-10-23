export const publicRequest = String;

export const publicResponse = {
  _id: false,
  publicId: true,

  name: true,
  notes: true,
  organization: true,
  phone: true,
  email: true,
  address: true,
};

export const publicPublicationsRequest = String;

export const publicPublicationsResponse = {
  title: true,
  author: true,
  publisher: true,
  type: true,
  year: true,
  length: true,
  subtitle: true,
  description: true,
  rating: true,
  'rent._id': true,
};
