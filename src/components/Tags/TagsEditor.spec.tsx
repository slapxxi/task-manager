import { Keys } from '@lib';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import TagsEditor from './TagsEditor';

const tags = [{ id: 'html', name: 'HTML' }, { id: 'css', name: 'CSS' }];

it('renders', () => {
  const { container } = render(<TagsEditor tags={tags} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('invokes callback when tag removed', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<TagsEditor tags={tags} onRemoveTag={spy} />);
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledTimes(1);
});

it('removes last tag when no tags selected', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<TagsEditor tags={tags} onRemoveTag={spy} />);
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledWith({ id: 'css', name: 'CSS' });
});

it('removes selected tag', () => {
  const spy = jest.fn();
  const { getByText, getByTestId } = render(
    <TagsEditor tags={tags} onRemoveTag={spy} />,
  );
  fireEvent.click(getByText('HTML'));
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledWith({ id: 'html', name: 'HTML' });
});

it('removes multiple selected tags', () => {
  const spy = jest.fn();
  const { getByText, getByTestId } = render(
    <TagsEditor tags={tags} onRemoveTags={spy} />,
  );
  fireEvent.click(getByText('HTML'));
  fireEvent.click(getByText('CSS'));
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith([
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
  ]);
});

it('does not invoke both callbacks', () => {
  const singleRemoveSpy = jest.fn();
  const multipleRemoveSpy = jest.fn();
  const { getByText, getByTestId } = render(
    <TagsEditor
      tags={tags}
      onRemoveTag={singleRemoveSpy}
      onRemoveTags={multipleRemoveSpy}
    />,
  );
  fireEvent.click(getByText('HTML'));
  fireEvent.click(getByText('CSS'));
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(singleRemoveSpy).not.toHaveBeenCalled();
  expect(multipleRemoveSpy).toHaveBeenCalledTimes(1);
});
