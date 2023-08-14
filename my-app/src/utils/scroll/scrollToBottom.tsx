import { RefObject } from 'react';

export const scrollToBottom = (ref: RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({behavior: 'smooth', block: 'end'});
};
