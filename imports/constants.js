const rent_duration = 1000 * 60 * 60 * 24 * 30;
const rent_extent_duration = rent_duration / 2;

const str_method_create = 'Add';
const str_method_update = 'Edit';

const googleAPIKey = '';

const roles = {
  admin: 'ADMIN',
};

const filters = {
  all: 'ALL',
  rented: 'RENTED',
  available: 'AVAILABLE',
};

const minQueryLength = 1;

export {
  rent_duration,
  rent_extent_duration,
  str_method_create,
  str_method_update,
  googleAPIKey,
  roles,
  filters,
  minQueryLength,
};
