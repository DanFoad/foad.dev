import React from 'react';
import { shallow } from 'enzyme';

import { App } from './app';

jest.mock('../../containers/home/home-container', () => 'HomeContainer');

describe('app-container', () => {
  const makeProps = extendProps => {
    return {
      labelsLoading: false,
      initLabels: jest.fn(),
      ...extendProps
    };
  };

  let wrapper;
  let props;

  function renderContainer(extendProps) {
    props = makeProps(extendProps);
    wrapper = shallow(<App {...props} />);
  }

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should initialise labels on mount', () => {
    renderContainer();
    expect(props.initLabels.mock.calls.length).toBe(1);
  });

  it('should render an empty div if labels still loading', () => {
    renderContainer({ labelsLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the home container once labels are ready', () => {
    renderContainer();
    expect(wrapper.find('HomeContainer').length).toBe(1);
  });
});
