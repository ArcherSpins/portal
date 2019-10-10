/*eslint-disable */
// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import type { RouterHistory, Match } from "react-router-dom";
import moment from "moment";
import { ROOT } from '../../routes';

import "./log-history-item.styles.scss";

import type { Log } from "../../redux/log/log.flow-types";

type Props = {
  log: Log,
  match: Match,
  history: RouterHistory, 
  openDescriptionToggler: boolean,
  number: number
};

type State = {
  openDescription: boolean
}

class LogHistoryItem extends React.Component<Props, State> {

  state = {
    openDescription: false
  }

  showTime = () => {
    const { spentTime } = this.props.log;
    if (spentTime < 60 && spentTime > 10) {
      return `00:${spentTime}`
    } else {
      const hours = spentTime / 60;
      let minutes = spentTime % 60;
      if(minutes < 10) {
        minutes = `0${minutes}`
      }
      return `${Math.floor(hours)}:${minutes}`
    }
  };

  cutComment = () => {
    return this.props.log.comment.length > 50 ? this.props.log.comment.substring(0, 30) + "..." : this.props.log.comment
  }

  render(){
    const { openDescription } = this.state;
    return (
      <div className="log-history-item" onClick={() => this.setState({ openDescription: !openDescription})}>
        <div className="item-wrapper">
          <span className="item">{this.props.number ? this.props.number : "null"}</span>
          <span className="item">{this.props.log.assignedUser.name}</span>
          <span className="item">{moment(this.props.log.createdAt).format("hh:mm DD/MM/YY")}</span>
          <span className="item">
            {/* {this.props.log.spentTime}:{this.props.log.spentTime.toString().length >= 2 ? this.props.log.minutes : "0" + this.props.log.minutes} */}
            {this.showTime()}
          </span>
          <span className="item">
            {this.cutComment()}
          </span>
          <div className="edit-button-wrapper">
            <button
              className="log-edit-button"
              onClick={() => this.props.history.push(`${ROOT}/${this.props.match.url || " "}/${this.props.log.id}`)}
            >
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.333374 10.0001H5.00004V11.3334H0.333374V10.0001ZM0.333374 5.33341H6.33337V6.66675H0.333374V5.33341ZM0.333374 0.666748H13.6667V2.00008H0.333374V0.666748ZM12.7827 6.68341L13.5534 6.42275L14.22 7.57741L13.6094 8.11408C13.6862 8.47852 13.6862 8.85498 13.6094 9.21941L14.22 9.75608L13.5534 10.9107L12.7827 10.6501C12.5094 10.8967 12.184 11.0867 11.826 11.2034L11.6667 12.0001H10.3334L10.1734 11.2027C9.81955 11.0871 9.49388 10.8986 9.21737 10.6494L8.44671 10.9107L7.78004 9.75608L8.39071 9.21941C8.31384 8.85498 8.31384 8.47852 8.39071 8.11408L7.78004 7.57741L8.44671 6.42275L9.21737 6.68341C9.49071 6.43675 9.81604 6.24675 10.174 6.13008L10.3334 5.33341H11.6667L11.8267 6.13075C12.184 6.24675 12.5094 6.43741 12.7827 6.68408V6.68341ZM11 10.0001C11.3537 10.0001 11.6928 9.8596 11.9429 9.60956C12.1929 9.35951 12.3334 9.02037 12.3334 8.66675C12.3334 8.31313 12.1929 7.97399 11.9429 7.72394C11.6928 7.47389 11.3537 7.33341 11 7.33341C10.6464 7.33341 10.3073 7.47389 10.0572 7.72394C9.80718 7.97399 9.66671 8.31313 9.66671 8.66675C9.66671 9.02037 9.80718 9.35951 10.0572 9.60956C10.3073 9.8596 10.6464 10.0001 11 10.0001Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
        {
          this.props.openDescriptionToggler && <div className='log-item-comment'>
            <div className='full-comment'>
              {this.props.log.comment}
            </div>
          </div>
        }
      </div>
    );
  };
}

export default withRouter(LogHistoryItem);
