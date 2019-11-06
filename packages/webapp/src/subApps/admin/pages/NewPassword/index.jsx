// TODO: FIX THIS
/* eslint-disable no-shadow */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';
import { NewPasswordForm, AlertMessage } from '../../components';
import { PageContainer, CenterContainer } from '../styled';
import type { NewPasswordPageState } from './type';
import { resetPassword } from '../../redux/actions/auth';

type Props = {
  resetPassword: (string, string) => void,
  match: Match
}

class NewPasswordComponent extends React.Component<Props, NewPasswordPageState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: {
        status: false,
        message: '',
      },
    };
  }


  toggleModalMessage = (status: boolean, message: string): void => {
    this.setState({
      error: {
        status,
        message,
      },
    });
  }

  getErrorForm = (
    { status, message }: { status: boolean, message: string },
  ): { status: boolean, message: string } => {
    this.toggleModalMessage(status, message);
    return { status, message };
  }

  submitResetPassword = (obj: { password: string }): void => {
    const { resetPassword, match } = this.props;
    resetPassword(obj.password, match.params.token || '');
  }

  render() {
    const { error } = this.state;

    return (
      <PageContainer>
        {
          error.status && (
            <AlertMessage
              error
              message={error.message}
              closeModal={() => this.toggleModalMessage(false, '')}
            />
          )
        }
        <CenterContainer>
          <NewPasswordForm
            validate
            onSubmit={this.submitResetPassword}
            getError={this.getErrorForm}
          />
        </CenterContainer>
      </PageContainer>
    );
  }
}

const mapDispatchToProps = {
  resetPassword,
};

// $FlowFixMe
const NewPasswordPage = connect(
  () => {},
  mapDispatchToProps,
)(NewPasswordComponent);

// TODO: FIX THIS
// eslint-disable-next-line import/prefer-default-export
export { NewPasswordPage };
