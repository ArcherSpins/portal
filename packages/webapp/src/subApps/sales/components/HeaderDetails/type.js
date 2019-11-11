// @flow
import type { DealType } from '../../types';

export type HeaderDetailsProps = {
  title: string,
  goBack: () => void,
  activeUser: DealType,
  editTitle: boolean,
  toggleActiveTitle: (boolean) => void,
  titleText: string,
  changeTitleText: (string) => void,
  deleteDeal: ({
    id: string
  }) => {},
  errorsFormCreate: {
    title: {
      error: boolean,
      message: string
    }
  },
  setTitleComponent: (mixed) => void,
}
