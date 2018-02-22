// schemas.js
import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const itemSchema = new schema.Entity('items');
export const labelSchema = new schema.Entity('labels');
export const listSchema = new schema.Entity('lists', {
  items : [itemSchema],
  labels: [labelSchema]
});
