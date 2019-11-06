/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
// TODO: FIX THIS
/* eslint-disable import/no-cycle */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  Button,
} from '@sfxdx/ui-kit';
import {
  LeftNavbar,
  HeaderEmployees,
} from '../../components';
import { LoadingContainer } from '../../containers';
import {
  PageContainer,
  ContainerContent,
  Main,
  FieldBlock,
} from '../styled';
import {
  getSpentTimeBounds,
} from '../../redux/actions';
import {
  updateSpentTimeBounds,
} from '../../redux/actions/spentTimeBounds';
import type { SpentTimeBoundsType } from '../../types';
import './style.scss';

type Props = {
  getSpentTimeBounds: () => void,
  spentTimeBounds: SpentTimeBoundsType,
  loading: boolean,
  updateSpentTimeBounds: (data: SpentTimeBoundsType) => void
}

type State = {
  edit: boolean,
  data: {
    hours: number | string,
    minutes: number | string,
    days: number | string,
    times: string,
  }
}

class SittingsProjectsModulePage extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      edit: false,
      data: {},
    };
  }

  componentDidMount() {
    const { getSpentTimeBounds } = this.props;
    getSpentTimeBounds();
  }

  toggleEdit = (status: boolean): void => {
    this.setState({ edit: status });
  }

  changeSelect = (selected: {
    label: string, value: string, selectedName?: string | number, id: string
  }): void => {
    const { data } = this.state;
    switch (selected.selectedName) {
      case 'days':
        this.setState({
          data: {
            ...data,
            days: selected.value.toString(),
          },
        });
        break;
      case 'times':
        this.setState({
          data: {
            ...data,
            hours: Number(selected.value.split(':')[0]).toString(),
            minutes: Number(selected.value.split(':')[1]).toString(),
            times: selected.value,
          },
        });
        break;
      default: break;
    }
    this.toggleEdit(true);
  }

  saveFunc = () => {
    const { updateSpentTimeBounds } = this.props;
    const { data } = this.state;
    updateSpentTimeBounds(data);
    this.toggleEdit(false);
  }

  getDays = () => {
    const { spentTimeBounds } = this.props;
    const { data } = this.state;
    const days: Array<{
      label: number,
      value: number,
      id: number,
      active?: boolean
    }> = [];
    for (let i = 0; i <= 6; i += 1) {
      days.push({
        label: i,
        value: i,
        id: i,
      });
    }

    const selected = days.find(
      (item) => item.label === (Number(data.days || spentTimeBounds.days)),
    );

    return {
      days,
      selected,
    };
  }

  getTimes = () => {
    const { spentTimeBounds } = this.props;
    const { data } = this.state;
    const arr = [];

    for (let i = 0; i < 24; i += 1) {
      arr.push({
        id: i,
        label: `${String(i).padStart(2, '0')}:00`,
        value: `${String(i).padStart(2, '0')}:00`,
        selected: data.times === `${String(i).padStart(2, '0')}:00`
          || (spentTimeBounds.hours === i
          && spentTimeBounds.minutes === 0),
      });
      arr.push({
        id: i,
        label: `${String(i).padStart(2, '0')}:30`,
        value: `${String(i).padStart(2, '0')}:30`,
        selected: data.times === `${String(i).padStart(2, '0')}:00`
          || (spentTimeBounds.hours === i
          && spentTimeBounds.minutes === 30),
      });
    }

    const selected = arr.find((item) => item.selected);

    return {
      selected,
      times: arr,
    };
  }

  render() {
    const { edit } = this.state;
    const { loading } = this.props;

    return (
      <PageContainer style={{ display: 'flex' }}>
        <LeftNavbar />
        <ContainerContent
          className="setting-container"
          style={{
            marginLeft: `${220}px`,
            paddingLeft: 30,
          }}
        >
          {
            loading ? <LoadingContainer /> : (
              <div>
                <HeaderEmployees
                  noBorder
                  noSearch
                  title="Settings projects module"
                />
                <Main>
                  <FieldBlock>
                    <Dropdown
                      className="dropdown-block"
                      options={this.getDays().days}
                      onChange={(value) => {
                        this.changeSelect({ ...value, selectedName: 'days' });
                      }}
                      value={this.getDays().selected}
                      label="Working days"
                    />
                  </FieldBlock>
                  <FieldBlock>
                    <Dropdown
                      className="dropdown-block"
                      options={this.getTimes().times}
                      onChange={(value) => {
                        this.changeSelect({ ...value, selectedName: 'times' });
                      }}
                      value={this.getTimes().selected}
                      label="Working hours and minutes"
                    />
                  </FieldBlock>
                  <div className="footer-settings_form">
                    {
                      edit && (
                        <Button
                          onClick={this.saveFunc}
                          style={{ minWidth: '110px', marginTop: '20px' }}
                        >
                          Save
                        </Button>
                      )
                    }
                  </div>
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
  spentTimeBounds: state.spentTimeBounds.spentTimeBounds,
  loading: state.spentTimeBounds.loading,
});

const mapDispatchToProps = {
  getSpentTimeBounds,
  updateSpentTimeBounds,
};

// $FlowFixMe
const SittingsProjectsModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SittingsProjectsModulePage);

// TODO: fix typo
export { SittingsProjectsModule };
