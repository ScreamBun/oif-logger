import React, { FunctionComponent } from 'react';
import Moment from 'react-moment';

const MomentFormat = 'MMMM DD, YYYY hh:MM:SS a';

// Interface
interface LogItemProps {
  hits: Array<{
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: {
      severity: string;
      msg: string;
      appname: string;
      timestamp: string;
    };
    sort: Array<number>;
  }>
}

const LogItem: FunctionComponent<LogItemProps> = props => {
  const { hits } = props;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">App</th>
          <th scope="col">Level</th>
          <th scope="col">Timestamp</th>
          <th scope="col">Message</th>
        </tr>
      </thead>
      <tbody>
        {hits.map(hit => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { _id, _source } = hit;
          return (
            // eslint-disable-next-line no-underscore-dangle
            <tr className={ hit._source.appname } key={ _id }>
              <td>{ _source.appname }</td>
              <td>{ _source.severity }</td>
              <td><Moment date={ _source.timestamp } format={ MomentFormat } /></td>
              <td>{ _source.msg }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LogItem;