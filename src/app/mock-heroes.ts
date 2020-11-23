import { Hero } from './hero';
import { ITEMS } from './mock-items';

// give them all items for now

export const HEROES: Hero[] = [
    { id: 1, name: 'Dr Nice', items: [...ITEMS] },
    { id: 2, name: 'Narco', items: [...ITEMS] },
    { id: 3, name: 'Bombasto', items: [...ITEMS] },
    { id: 4, name: 'Celeritas', items: [...ITEMS] },
    { id: 5, name: 'Magneta', items: [...ITEMS] },
    { id: 6, name: 'RubberMan', items: [...ITEMS] },
    { id: 7, name: 'Dynama', items: [...ITEMS] },
    { id: 8, name: 'Dr IQ', items: [...ITEMS] },
    { id: 9, name: 'Magma', items: [...ITEMS] },
    { id: 10, name: 'Tornado', items: [...ITEMS] }
];
