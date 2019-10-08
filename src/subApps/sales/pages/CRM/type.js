// @flow
import type {
  CRMContainerState,
  CRMContainerProps,
} from '../../containers/CRM/type';

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
  toggleModalShow: () => void,
}
