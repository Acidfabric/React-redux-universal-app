import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/loginActions';
import LoginComponent from '../components/LoginComponent';

const mapStateToProps = state => state.login;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

const loginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default loginContainer;
