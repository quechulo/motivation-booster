import styles from "./EmailItem.module.css";


const EmailItem = (props) => {
  const { subject, body } = props;

  return (
    <>
      <div className={styles.emailitem}>
        <h2>
          <span className={styles.emailsubject}>{subject}</span>
        </h2>
        <text>
          <span className={styles.emailmessage}>{body}</span>
        </text>
      </div>
    </>
  );
};

export default EmailItem;
