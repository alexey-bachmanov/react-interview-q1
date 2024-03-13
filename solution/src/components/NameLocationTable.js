/**
 * Ah, table formatting. The bane of any developers' existence. At
 * least this component is mercifully brief.
 */
import classes from './NameLocationTable.module.css';

function NameLocationTable(props) {
  const tableRowJSX = props.entries.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.location}</td>
    </tr>
  ));

  return (
    <table className={classes['table']}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>{tableRowJSX}</tbody>
    </table>
  );
}

export default NameLocationTable;
