import { Keys } from '@lib';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import TagsEditor from './TagsEditor';

const tags = [{ id: 'html', name: 'HTML' }, { id: 'css', name: 'CSS' }];

it('renders', () => {
  const { container } = render(<TagsEditor tags={tags} />);
  expect(container.firstChild).toMatchSnapshot();
});

it('selects tags', () => {
  const { getAllByTestId, getByText } = render(<TagsEditor tags={tags} />);
  fireEvent.click(getByText('HTML'));
  fireEvent.click(getByText('CSS'));
  getAllByTestId('checkbox').forEach((checkbox: Partial<HTMLInputElement>) => {
    expect(checkbox).toHaveProperty('checked', true);
  });
});

it('removes last tag when no tags selected', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<TagsEditor tags={tags} onRemoveTags={spy} />);
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledWith([{ id: 'css', name: 'CSS' }]);
});

it('removes selected tag', () => {
  const spy = jest.fn();
  const { getByText, getByTestId } = render(
    <TagsEditor tags={tags} onRemoveTags={spy} />,
  );
  fireEvent.click(getByText('HTML'));
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledWith([{ id: 'html', name: 'HTML' }]);
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

it('does not remove tags when input is not empty', () => {
  const spy = jest.fn();
  const { getByTestId } = render(<TagsEditor tags={tags} onRemoveTags={spy} />);
  fireEvent.change(getByTestId('input'), { target: { value: 'new' } });
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).not.toHaveBeenCalled();
});

it('removes selection after removing selected tags', () => {
  const spy = jest.fn();
  const { getByText, getByTestId, getAllByTestId } = render(
    <TagsEditor tags={tags} onRemoveTags={spy} />,
  );
  fireEvent.click(getByText('HTML'));
  fireEvent.keyDown(getByTestId('input'), { keyCode: Keys.backspace });
  expect(spy).toHaveBeenCalledTimes(1);
  getAllByTestId('checkbox').forEach((checkbox: Partial<HTMLInputElement>) => {
    expect(checkbox).toHaveProperty('checked', false);
  });
});
