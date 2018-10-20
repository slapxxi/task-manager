import { Keys } from '@lib';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

type EventHandler<T> = (e: React.KeyboardEvent<T>) => void;

function handleEmptyBackspace(fn: EventHandler<InputElement>) {
  return (e: React.KeyboardEvent<InputElement>) => {
    const keyCode = e.keyCode || e.charCode;
    if (keyCode === Keys.backspace) {
      if (e.currentTarget.value !== undefined && e.currentTarget.value === '') {
        fn(e);
      }
    }
    return e;
  };
}

export default handleEmptyBackspace;
