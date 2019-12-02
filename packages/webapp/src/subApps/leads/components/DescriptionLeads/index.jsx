// @flow
import React from 'react';
import createTestContext from 'utils/createTestContext';
import {
  Accent,
  Participants,
  TextArea,
  Button,
} from '@sfxdx/ui-kit';
import BadgeBlock from '../BadgeBlock';
import BlockTitle from '../BlockTItle';
import './style.scss';


const createTestAttr = createTestContext('description-leads');

export default () => (
  <div className="h-100">
    <div className="before-content custom-scrollbar">
      <div className="d-flex justify-content-between">
        <BlockTitle title="Job title">
          <p className="color-black">Mobile App Development</p>
        </BlockTitle>
        <BlockTitle title="Posted">
          <p className="color-black">31.11.19 13:05</p>
        </BlockTitle>
      </div>
      <Accent className="mt-20">
        <div className="d-flex justify-content-between">
          <BadgeBlock title="Budget">
            <p>$500</p>
          </BadgeBlock>
          <BadgeBlock title="Type">
            <p>Horly</p>
          </BadgeBlock>
          <BadgeBlock title="Project Length">
            <p>1 to 3 month</p>
          </BadgeBlock>
        </div>
      </Accent>
      <div className="mt-20">
        <BlockTitle title="About the client">
          <p>Country Canada, Feedback 4, Avg hourly rate paid $12.35/hr</p>
        </BlockTitle>
      </div>
      <div className="mt-20">
        <BlockTitle title="Preferred qualifications">
          <Participants
            name="participiant chips"
            chips={[
              {
                label: 'Web development',
                id: 1,
              },
              {
                label: 'Mobile development',
                id: 2,
              },
            ]}
          />
        </BlockTitle>
      </div>
      <div className="mt-10">
        <BlockTitle title="Description">
          <div className="line-height-30">
            <p>Simple Cryptowallet (eventually based on electrum wallet).</p>
            <p>Create send/receive address;</p>
            <p>Display confirmed/unconfirmed transaction;</p>
            {/* eslint-disable max-len */}
            <p>-------------------------------------21 Oct 2019 / Ivan Sokolov / Pending---------------------------------</p>
            <p>Create OTRS ticket</p>
            <p>21 Sep 2019/ 17:01</p>
            <p>http://otrs.sfxdx.ru/otrs/index.pl?Action=AgentTicketZoom;TicketID=258</p>
            <p>Regards, Vadim</p>
          </div>
        </BlockTitle>
      </div>
    </div>
    <Accent className="mt-20">
      <BadgeBlock title="URL">
        <a className="link" href="/main">https://www.upwork.com/ab/a/3324907/contracts/22966422/proposals/11839325856...</a>
      </BadgeBlock>
    </Accent>
    <div className="mt-20 footer-description_leads">
      <BlockTitle title="Input text">
        <TextArea placeholder="Input text" className="input-description_leads" onChange={() => {}} />
      </BlockTitle>
    </div>
    <div className="d-flex mb-20 justify-content-end mt-20">
      <Button
        data-test={createTestAttr('decline-button')}
        className="danger-button_transparent"
        use="transparent"
      >
        Decline
      </Button>
      <Button data-test={createTestAttr('bid-button')} className="primary-button_transparent mx-10" use="transparent">Bid</Button>
      <Button data-test={createTestAttr('pending-button')} className="success-button_transparent" use="transparent">Pending</Button>
    </div>
  </div>
);
