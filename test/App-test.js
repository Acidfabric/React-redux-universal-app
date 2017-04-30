import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../src/client/components/App';

describe('<App />', () => {
  it('should render <App /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(App)).to.have.length(1);
  });

  it('should have isLoggedIn prop', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('isLoggedIn')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <App>
        <div className="unique" />
      </App>
    );
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(
  //     <App onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });
});
