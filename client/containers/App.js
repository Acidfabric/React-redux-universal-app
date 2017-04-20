import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../App';

import { togglePass } from '../actions/index';

const mapStateToProps = (state) => ({
  counter: state.counter,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(togglePass, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
