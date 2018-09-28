import { connect } from 'react-redux'

import { userLogin } from '../../../actions/user';

import LogInLayout from './LoginLayout.styled';

const mapDispatchToProps = dispatch => ({
  userLogin: (name) => dispatch(userLogin(name))
});

export default connect(null, mapDispatchToProps)(LogInLayout);
