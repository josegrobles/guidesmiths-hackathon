import { connect } from 'react-redux'

import { userLogin } from '../../../actions/user';

import AppLayout from './AppLayout.styled';

const mapDispatchToProps = dispatch => ({
  userLogin: (name) => dispatch(userLogin(name))
});

export default connect(null, mapDispatchToProps)(AppLayout);
