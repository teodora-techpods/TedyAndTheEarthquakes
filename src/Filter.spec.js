import React from "react";
import renderer from "react-test-renderer";
import { Filter } from "./List";

describe('Filter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Filter filter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});