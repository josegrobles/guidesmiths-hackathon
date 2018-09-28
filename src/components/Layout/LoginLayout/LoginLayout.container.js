import { connect } from 'react-redux'

import { userLogin } from '../../../actions/user';

import LogInLayout from './LogInLayout.styled';

const mapDispatchToProps = dispatch => ({
  userLogin: (name) => dispatch(userLogin(name))
});


const mapStateToProps = state => ({
  invoices: state.invoices.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInLayout);
