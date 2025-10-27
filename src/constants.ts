
import type { User, Contact, Message } from './types';

export const MY_USER: User = {
  id: 0,
  name: 'شما',
  avatar: 'https://picsum.photos/seed/user/100/100',
};

export const CONTACTS: Contact[] = [
  { id: 1, name: 'سارا', avatar: 'https://picsum.photos/seed/sara/100/100' },
  { id: 2, name: 'علی', avatar: 'https://picsum.photos/seed/ali/100/100' },
  { id: 3, name: 'مریم', avatar: 'https://picsum.photos/seed/maryam/100/100' },
  { id: 4, name: 'رضا', avatar: 'https://picsum.photos/seed/reza/100/100' },
];

export const INITIAL_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, text: 'سلام! چه خبر؟', timestamp: new Date(Date.now() - 1000 * 60 * 5), senderId: 1 },
    { id: 2, text: 'سلام سارا! همه چی خوبه. تو چطوری؟', timestamp: new Date(Date.now() - 1000 * 60 * 4), senderId: 0 },
  ],
  2: [
    { id: 3, text: 'سلام علی، پروژه رو دیدی؟', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), senderId: 0 },
    { id: 4, text: 'آره دیدم. به نظرم عالی شده!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), senderId: 2 },
  ],
  3: [
    { id: 5, text: 'فردا وقت داری بریم بیرون؟', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), senderId: 3 },
  ],
  4: [],
};