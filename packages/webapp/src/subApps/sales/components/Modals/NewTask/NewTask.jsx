// @flow
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  H1,
  Dropdown,
  TextArea,
  Button,
  Datepicker,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import {
  CloseButton,
  DealNameBlock,
  DealNameLabel,
  DealNameContainer,
  EditButton,
} from './styled';
import type { CalendarType, TypeDeal, DealTask } from '../../../types';
import EditComment from './EditComment';
import InputsCouple from '../../InputsCouple';
import pencilIcon from './pencil.svg';
import {
  getModify,
} from '../../../helpers/helperHappeDays';
import './style.scss';

const createTestAttr = createTestContext('modal');

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onCreate: (
    typeID: string, description: string, startDate: Date | number, endDate: Date | number
  ) => void,
  dealTypes: Array<TypeDeal>,
  getCalendarData: (string, returnFunc?: (Array<CalendarType>) => void) => void,
  isNewTask: boolean,
  onUpdate: (string, string) => void,
  data: DealTask,
}

export default ({
  isOpen,
  onClose,
  onCreate,
  getCalendarData,
  dealTypes,
  isNewTask,
  data,
  onUpdate,
}: Props) => {
  const [calendar, onChangeCalendar] = useState(null);
  const [dateValue, onChangeDate] = useState(new Date());
  const [month, onMonthChange] = useState(new Date());
  const [description, onChangeDescription] = useState('');
  const [resolveDescription, onChangeResolveDescription] = useState('');
  const [activeType, onChangeTypes] = useState({ label: 'Not selected', id: '' });
  const [startTime, onChangeStartTime] = useState('1100');
  const [startEnd, onChangeEndTime] = useState('1200');

  useEffect(() => {
    getCalendarData(String(month.getFullYear()), (date) => onChangeCalendar(date[0]));
  }, [month]);

  const types = dealTypes.map(
    (item) => ({ ...item, label: item.title, value: item.id }),
  );

  const modifDays = getModify(calendar, month).days;
  const hoursStart = startTime.replace(':', '').match(/\d{2}/);
  const minutesStart = startTime.replace(':', '').replace(/\d{2}/, '');
  const hoursEnd = startEnd.replace(':', '').match(/\d{2}/);
  const minutesEnd = startEnd.replace(':', '').replace(/\d{2}/, '');
  const startD = new Date(dateValue).setMinutes(
    dateValue.getMinutes()
      + (hoursStart ? Number(hoursStart[0]) * 60 + Number(minutesStart) : 0),
  );
  const endD = new Date(dateValue).setMinutes(
    dateValue.getMinutes()
      + (hoursEnd ? Number(hoursEnd[0]) * 60 + Number(minutesEnd) : 0),
  );
  return (
    <Modal
      show={isOpen}
      onRequestClose={onClose}
      className="big-modal text-left header_d-block footer_d-flex footer_content-end"
    >
      <ModalHeader>
        <H1 className="fz-24 d-flex align-items-center">
          <span className="mr-10">{isNewTask ? 'New Task' : data.deal && data.deal.title}</span>
          {
            !isNewTask && (
              <EditButton
                data-test={createTestAttr('edit-button')}
              >
                <img src={pencilIcon} alt="pencil icon" />
              </EditButton>
            )
          }
        </H1>
        <CloseButton
          onClick={onClose}
          data-test={createTestAttr('close-button')}
        >
          <i className="icon-cancel" />
        </CloseButton>
      </ModalHeader>
      <ModalBody>
        <div>
          <div className="d-flex justify-content-between pt-20">
            <div className="color-gray col-6">
              <div className="mb-20">
                <DealNameContainer>
                  <DealNameLabel>Deal Name</DealNameLabel>
                  <DealNameBlock>Blockchain development</DealNameBlock>
                </DealNameContainer>
              </div>
              <div className="mb-20 fz-14 col-6 borderless">
                <Datepicker
                  dateFormat="DD.MM.YYYY"
                  overlayAlign="left"
                  label="Date"
                  month={month}
                  value={dateValue}
                  modifiers={modifDays}
                  onMonthChange={onMonthChange}
                  onDayChange={(date) => {
                    onChangeDate(date);
                  }}
                  disabledDays={{ daysOfWeek: [0, 6] }}
                  modifiersStyles={getModify(calendar, month).modifiersStyles}
                />
              </div>
              <InputsCouple
                dataTest={createTestAttr('inputs-couple')}
                startTime={startTime}
                startEnd={startEnd}
                onChangeStartTime={onChangeStartTime}
                onChangeEndTime={onChangeEndTime}
              />
            </div>
            <div className="col-6 fz-14">
              <div className="mb-2 color-gray dropdown_not-padding">
                {
                  isNewTask ? (
                    <Dropdown
                      label="Task type"
                      options={types}
                      use="borderless"
                      value={activeType}
                      onChange={onChangeTypes}
                      dataTest={createTestAttr('task-type')}
                    />
                  ) : (
                    <div>
                      <span className="cbx__label mt-2 mb-5 color-gray d-block">Task type</span>
                      <p
                        className="fz-16 color-black line-height-24"
                      >
                        {data.type ? data.type.title : activeType.label}
                      </p>
                    </div>
                  )
                }
              </div>
              <div className="color-gray">
                {
                  isNewTask ? (
                    <TextArea
                      className="fz-14 comment-parent"
                      label="Comment"
                      placeholder="Task comment"
                      value={description}
                      onChange={(e) => onChangeDescription(e.target.value)}
                      data-test={createTestAttr('comment-text')}
                    />
                  ) : (
                    <div>
                      <span className="cbx__label mt-2 mb-5 color-gray d-block">Comment</span>
                      <p
                        className="fz-16 color-black line-height-24 break-word"
                        style={{ maxHeight: '127px', overflowY: 'auto' }}
                      >
                        {data.description}
                      </p>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          {
            isNewTask && (
              <div className="d-flex justify-content-end mt-3">
                <Button
                  data-test={createTestAttr('close-button')}
                  onClick={() => {
                    onCreate(
                      activeType.id,
                      description,
                      new Date(startD),
                      new Date(endD),
                    );
                    onClose();
                  }}
                >
                  Create
                </Button>
              </div>
            )
          }
        </div>
        {
          !isNewTask && (
            <EditComment
              onResolved={() => {
                onUpdate(data.id, resolveDescription);
                onClose();
              }}
              value={resolveDescription}
              onChange={onChangeResolveDescription}
            />
          )
        }
      </ModalBody>
    </Modal>
  );
};
