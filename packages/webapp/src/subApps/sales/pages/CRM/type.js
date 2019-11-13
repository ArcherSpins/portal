// @flow
import type {
  CRMContainerState,
  CRMContainerProps,
} from '../../containers/CRM/type';
import type {
  PropsFilterDeals,
} from '../../redux/actions/types';

export type CrmPageProps = {
  props: CRMContainerProps,
  state: CRMContainerState,
  submitSearch: (any) => void,
  toggleSearchValue: (string) => void,
  onDragEnd: ({
    destination: mixed,
    source: mixed,
    draggableId: mixed
  }),
  toggleShowTab: (boolean) => void,
  closeModal: () => void,
  setSefColumn: (mixed) => mixed,
  getDealsFilter: (props?: PropsFilterDeals) => void,
  toggleModalShow: () => void,
  loading: boolean
}
