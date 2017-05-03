import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => ({
  authorization: state.login,
});

export default connect(mapStateToProps)(App);
