/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React, { PureComponent } from 'react';
import { CRMPage } from '../../pages';
import CrmHoc from './CrmHoc';
import { LoadingContainer } from '../index';
import type { CRMContainerState, CRMContainerProps } from './type';
import type { EmployeeType, ColumnType, DealType } from '../../types';
import '../App/style.scss';

class CRMContainer extends PureComponent<CRMContainerProps, CRMContainerState> {
  refsColumn: Array<?HTMLElement>;

  constructor() {
    super();

    this.state = {
      crmCardData: {
        title: null,
        client: null,
        idSm: null,
      },
      tabStatus: false,
      searchValue: '',
      redirect: false,
      managers: [],
      columnId: '',
      modalInfo: {
        show: false,
        message: '',
      },
    };

    this.refsColumn = [];
  }

  componentDidMount = (): void => {
    const {
      getColumnsDataAction,
    } = this.props;
    getColumnsDataAction((
      columnData: Array<ColumnType>, columnsState: { [string]: DealType },
    ) => {
      this.getData(columnData, columnsState);
    });
  }

  toggleModalShow = (status: boolean, message: string): void => {
    this.setState({
      modalInfo: {
        show: status,
        message,
      },
    });
  }

  setSefColumn = (column: HTMLElement): void => {
    const find = this.refsColumn.find((item) => item && item.id === column.id);
    if (find) {
      return;
    }
    this.refsColumn.push(column);
  }

  getData = (columnData: Array<ColumnType>, columnsState: { [string]: DealType }): void => {
    try {
      const { getDealsAction } = this.props;
      getDealsAction(null, null, columnsState);
      this.checkManager('');
      const column = columnData.find((item) => item.title.toLowerCase() === 'lead');
      if (column) {
        this.setState({ columnId: column.id });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  notReorderCards = (
    reorderCards, start, source, destination, draggableId, columns,
  ): void => {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    };

    const newState = {
      columns: {
        ...columns,
        [newColumn.id]: newColumn,
      },
    };

    reorderCards(newState.columns);
  }

  reorderCards = (
    newStart, newFinish, columns, reorderCards, draggableId, destination,
  ): void => {
    const { updateDealReorderAction } = this.props;
    const newState = {
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    reorderCards(newState.columns);
    updateDealReorderAction(
      {
        id: draggableId,
        stageId: destination.droppableId,
      },
      {
        toggleModalShow: this.toggleModalShow,
        columns,
        // $FlowFixMe
        element: this.refsColumn.find((item) => item.id === destination.droppableId),
      },
    );
  }

  onDragEnd = (result): void => {
    const { destination, source, draggableId } = result;
    const { columns, reorderCards } = this.props;

    if (!destination || (destination.droppableId === source.droppableId
      && destination.index === source.index)) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      this.notReorderCards(
        reorderCards,
        start,
        source,
        destination,
        draggableId,
        columns,
      );
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    this.reorderCards(
      newStart, newFinish, columns, reorderCards, draggableId, destination,
    );
  }

  checkManager = (search?: string): void => {
    const { getEmployeesAction } = this.props;
    getEmployeesAction({
      search: search || '',
      returnEmployees: this.setManagers,
    });
  }

  setManagers = (managers: Array<EmployeeType>) => {
    this.setState({ managers });
  }


  toggleShowTab = (status: boolean) => {
    this.setState({ tabStatus: status });
  }

  submitSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ redirect: true });
  }

  toggleSearchValue = (e: SyntheticEvent<HTMLInputElement>) => {
    // $FlowFixMe
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const {
      loadingColumns,
      loadingDeals,
    } = this.props;
    return (
      <div className="crm-pLinkage">
        {loadingDeals || loadingColumns ? (
          <LoadingContainer />
        ) : <CRMPage {...this} />}
      </div>
    );
  }
}

export default CrmHoc(CRMContainer);
