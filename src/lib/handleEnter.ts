import { Keys } from '@lib';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

type EventHandler<T> = (e: React.KeyboardEvent<T>) => void;

function handleEnter(fn: EventHandler<InputElement>) {
  return (e: React.KeyboardEvent<InputElement>) => {
    const keyCode = e.keyCode || e.charCode;
    if (keyCode === Keys.enter) {
      fn(e);
    }
    return e;
  };
}

export default handleEnter;
