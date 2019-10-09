/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
// TODO: FIX
// @flow
import React from 'react';
// $FlowFixMe
import { connect } from 'react-redux';
import {
  Calendar,
  LeftNavbar,
  HeaderEmployees,
  AlertMessage,
} from '../../components';
import { closeErrorMessage } from '../../redux/actions';
import { getCalendarData } from '../../redux/actions/calendar';
import { LoadingContainer } from '../../containers';
import {
  PageContainer,
  ContainerContent,
  Main,
} from '../styled';
import { Div } from './styled';
import type { CalendarType } from '../../types';

type Props = {
  loadingCalendar: boolean,
  calendar: Array<CalendarType>,
  getCalendarData: (string) => void,
  errorMessage: string,
  errorStatus: boolean,
  closeErrorMessage: () => void
}

class CalendarPage extends React.PureComponent<Props> {
  componentDidMount() {
    const { getCalendarData } = this.props;
    getCalendarData('2019');
  }

  changeYear = (year: string): void => {
    const { getCalendarData } = this.props;
    getCalendarData(String(year));
  }

  render() {
    const {
      loadingCalendar,
      calendar,
      errorStatus,
      errorMessage,
      closeErrorMessage,
    } = this.props;

    const { year: _tmp, ...dataCalendar } = calendar[0] ? calendar[0] : {};

    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          style={{
            marginLeft: `${220}px`,
            paddingLeft: 30,
          }}
        >
          {
            errorStatus && (
              <AlertMessage
                error
                message={errorMessage}
                closeModal={closeErrorMessage}
              />
            )
          }
          {
            loadingCalendar ? (
              <LoadingContainer />
            ) : (
              <div>
                <HeaderEmployees
                  style={{ width: '65%' }}
                  noBorder
                  noSearch
                  title="Calendar"
                />
                <Main>
                  <Div>
                    <Calendar
                      changeYear={this.changeYear}
                      currentYear={calendar[0] ? calendar[0].year : '2019'}
                      data={dataCalendar}
                    />
                  </Div>
                </Main>
              </div>
            )
          }
        </ContainerContent>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  calendar: state.calendar.calendar,
  loadingCalendar: state.calendar.loading,
  errorStatus: state.app.errorStatus,
  errorMessage: state.app.errorMessage,
});

const mapDispatchToProps = {
  getCalendarData,
  closeErrorMessage,
};

// $FlowFixMe
export default connect(
  mapStateToProps, mapDispatchToProps,
)(CalendarPage);
